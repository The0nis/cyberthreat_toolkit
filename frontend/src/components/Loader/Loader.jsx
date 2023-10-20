import React from "react";
import Box from "@mui/material/Box";
import { CircularProgress } from "@mui/material";

export const TableLoader = () => {
  return (
    <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
        }}
      >
        <CircularProgress />
      </Box>
  );
}

const Loader = () => {
  return (
    <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
  );
};

export default Loader;
