import React, { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import keys from "../../config/keys";
import { TableLoader } from "../Loader/Loader";
import moment from "moment";

const columns = [
  { field: "id", headerName: "ID", width: 30 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "login", headerName: "Login", width: 70 },
  { field: "role", headerName: "Role", width: 70 },
  { field: "last_login", headerName: "Last Login", width: 240 },
  { field: "update_at", headerName: "Updated At", width: 240 },
  { field: "created_at", headerName: "Created At", width: 240 },
];

export default function Oreders() {
  const base_url = keys.BASE_URL;
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState([
    {
      id: "",
      email: "",
      login: "",
      role: "",
      last_login: "",
      update_at: "",
      created_at: "",
    },
  ]);

  const getEmailFromLocalStorage = () => {
    const email = localStorage.getItem("email");
    return email;
  };

  const getPasswordFromLocalStorage = () => {
    const password = localStorage.getItem("password");
    return password;
  };

  const email = getEmailFromLocalStorage();
  const password = getPasswordFromLocalStorage();

  const getUserList = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`${base_url}/api/list`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const result = await response.json();
      setResult(result?.data);
      // console.log("result from list---",result)
      setIsLoading(false);
    } catch (error) {
      
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getUserList();
  }, []);

  console.log("result from list---", result);

  const rows = result?.map((item, index) => {
    return {
      id: item?.id,
      email: item?.email,
      login: item?.loggedIn === "0" ? "False" : "True",
      role: item?.role,
      last_login: moment(item?.last_login_at).format(
        "MMMM DD, YYYY, hh:mm:ss A"
      ),
      update_at: moment(item?.updated_at).format("MMMM DD, YYYY, hh:mm:ss A"),
      created_at: moment(item?.created_at).format("MMMM DD, YYYY, hh:mm:ss A"),
    };
  });

  // console.log("rows--", rows);
  return (
    <div style={{ height: 400, width: "100%", marginBottom: "3rem" }}>
      {isLoading ? (
        <TableLoader />
      ) : (
        <>
          <Typography
            variant="h6"
            align="center"
            component="div"
            sx={{ flexGrow: 1, marginBottom: "2rem" }}
          >
            Registered Users
          </Typography>
          <DataGrid
            rows={rows || []}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: { page: 0, pageSize: 5 },
              },
            }}
            pageSizeOptions={[5, 10]}
            checkboxSelection
          />
        </>
      )}
    </div>
  );
}
