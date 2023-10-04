import React, { useMemo, useState, useRef } from "react";
import api from "../../api";
import { useDropzone } from "react-dropzone";

import Button from "@mui/material/Button";
import useTheme from "@mui/material/styles/useTheme";

import Introduction from "../Introduction";
import Result from "./Result";

import SystemUpdateAltIcon from "@mui/icons-material/SystemUpdateAlt";
import keys from "../../config/keys";
import axios from "axios";

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
  //   const apiUrl = "/api/mailanalyzer";

  //   const formData = new FormData();
  //   formData.append("file", file, file.name);

  //   const config = {
  //     headers: {
  //       "accept": "application/json",
  //       "Content-Type": "multipart/form-data",
  //     },
  //     mode: "no-cors"
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
  function uploadFiles(file) {
    const apiUrl = "https://www.virustotal.com/api/v3/files";
    const apiKey = keys.REACT_APP_API_KEY_VIRUS_TOTAL; // Replace with your actual API key

    const formData = new FormData();
    formData.append("file", file, file.name);

    const uploadConfig = {
      headers: {
        "x-apikey": apiKey,
      },
    };

    // Step 1: Upload the file
    axios
      .post(apiUrl, formData, uploadConfig)
      .then((response) => {
        const analysisId = response.data.data.id;
        // Step 2: Use the extracted analysisId to fetch analysis data
        const analysisUrl = `https://www.virustotal.com/api/v3/analyses/${analysisId}`;
        const analysisConfig = {
          headers: {
            "x-apikey": apiKey,
          },
        };

        return axios.get(analysisUrl, analysisConfig);
      })
      .then((analysisResponse) => {
        const result = analysisResponse.data;
        // Process the analysis result as needed
        setFile(result);
        handleShowResult();
      })
      .catch((error) => {
        console.error(error);
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
