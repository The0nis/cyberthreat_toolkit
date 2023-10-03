import React, { useMemo, useState, useRef } from "react";
import api from "../../api";
import { useDropzone } from "react-dropzone";

import Button from "@mui/material/Button";
import useTheme from "@mui/material/styles/useTheme";

import Introduction from "../Introduction";
import Result from "./Result";

import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import keys from "../../config/keys";

export default function FileUpload(props) {
  const theme = useTheme();
  const baseStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    borderWidth: 2,
    borderRadius: 2,
    borderColor: "lightgrey",
    borderStyle: "dashed",
    backgroundColor: theme.palette.background.uploadarea,
    color: "#bdbdbd",
    outline: "none",
    transition: "border .24s ease-in-out",
  };

  const focusedStyle = {
    borderColor: "#2196f3",
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };

  const {
    getRootProps,
    getInputProps,
    acceptedFiles,
    isFocused,
    isDragAccept,
    isDragReject,
  } = useDropzone({
    accept: {
      "message/rfc822": [".eml"],
    },
  });

  const acceptedFileItems = acceptedFiles.map((file) => (
    <h4 key={file.path}>
      File: {file.path} - {file.size} bytes
    </h4>
  ));

  const acceptStyleRef = useRef(acceptStyle);
  const baseStyleRef = useRef(baseStyle);
  const focusedStyleRef = useRef(focusedStyle);
  const rejectStyleRef = useRef(rejectStyle);

  const style = useMemo(
    () => ({
      ...baseStyleRef.current,
      ...(isFocused ? focusedStyleRef.current : {}),
      ...(isDragAccept ? acceptStyleRef.current : {}),
      ...(isDragReject ? rejectStyleRef.current : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  const [file, setFile] = useState(" ");

  const [showResult, setShowResult] = useState(false);
  const handleShowResult = (event) => {
    setShowResult(true);
  };

  // function uploadFiles(file) {
  //   const apiUrl = "https://eml-analyzer.herokuapp.com/api/analyze/file";

  //   const formData = new FormData();
  //   formData.append("file", file, file.name);

  //   const config = {
  //     headers: {
  //       accept: "application/json",
  //       "Content-Type": "multipart/form-data",
  //     },
  //   };

  //   api
  //     .post(apiUrl, formData, config)
  //     .then((response) => {
  //       const result = response.data;
  //       setFile(result);
  //       handleShowResult();
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //     });
  // }

  async function uploadFiles(file) {
    if (file) {
      try {
        // Calculate the SHA hash of the file
        const shaHash = await calculateSHA(file);
  
        // Check if SHA hash was calculated successfully
        if (!shaHash) {
          console.error('Error calculating SHA hash');
          return;
        }
  
        // Send the SHA hash to the VirusTotal endpoint
        const apiUrl = 'https://www.virustotal.com/api/v3/files/sha256/' + shaHash;
  
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'x-apikey': keys.REACT_APP_API_KEY_VIRUS_TOTAL, // Replace with your VirusTotal API key
          },
        });
  
        if (response.ok) {
          const result = await response.json();
          // Handle the result or pass it to a callback function
          setFile(result);
          handleShowResult();
        } else {
          console.error('Error fetching data from VirusTotal:', response.statusText);
          // Handle the error as needed
        }
      } catch (error) {
        console.error('An error occurred:', error);
        // Handle the error as needed
      }
    } else {
      alert('Please select a file to upload.');
    }
  }
  
  async function calculateSHA(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
  
      reader.onload = function (event) {
        const arrayBuffer = event.target.result;
        const crypto = window.crypto || window.msCrypto; // Browser compatibility
  
        if (!crypto) {
          reject('Crypto API not available');
          return;
        }
  
        crypto.subtle.digest('SHA-256', arrayBuffer).then((hashBuffer) => {
          const hashArray = Array.from(new Uint8Array(hashBuffer));
          const shaHash = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
          resolve(shaHash);
        }).catch((error) => {
          reject(error);
        });
      };
  
      reader.readAsArrayBuffer(file);
    });
  }
  
  return (
    <div className="drop">
      <br />
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop an .eml file here, or click to select a file.</p>
        <p>(Only .eml files will be accepted)</p>
        <SystemUpdateAltIcon sx={{ fontSize: "40px" }} />
      </div>
      <div align="center">
        <br />
        {acceptedFileItems}
        <Button
          variant="contained"
          disableElevation
          size="large"
          onClick={() => uploadFiles(acceptedFiles[0])}
        >
          Analyze
        </Button>
        <br />
        <br />
      </div>
      {showResult ? (
        <Result result={file} />
      ) : (
        <Introduction moduleName="Email Analyzer" />
      )}
    </div>
  );
}
