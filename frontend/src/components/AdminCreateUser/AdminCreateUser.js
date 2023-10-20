import React from "react";
import Stack from "@mui/material/Stack";
import { Alert, Button } from "@mui/material";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import keys from "../../config/keys";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";

const AdminCreateUser = () => {
  const [isLoading, setIsLoading] = React.useState(false);

  const base_url = keys.BASE_URL;
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({
      number: data.get("number"),
    });

    const number = data.get("number");
    if (isNaN(number) || number.toString().length !== 2) {
      toast.error("Please enter a two-digit number.");
      return;
    }
    try {
      setIsLoading(true);
      const response = await fetch(`${base_url}/api/install?code=${number}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      setIsLoading(false);
      // console.log(result);
      // Check for successful signup here
      if (response.ok) {
        toast.success("Admin User Created Successfully");
        setIsLoading(false);
      }
    } catch (error) {
      toast.error("Admin User Creation Failed");
      // console.error("Error:", error);
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Stack spacing={2} sx={{ width: "100%" }}>
        <Alert severity="info">Enter any two digit number, "48"</Alert>
        <Alert severity="success">
          This will create a new Admin User with the following details!
        </Alert>
        <Alert severity="success">Email: 4alex2@alexdb.com</Alert>
        <Alert severity="warning">Password: 48345672</Alert>
        <Alert severity="error">
          Remember: The password and email are generated base on the two digits
          input, only "alex2@alexdb.com" and "345672" are appended
        </Alert>
      </Stack>

      <Box
        component="form"
        onSubmit={handleSubmit}
        noValidate
        sx={{
          mt: 1,
          display: "flex",
          flexDirection: "column",
          width: "50%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TextField
          margin="normal"
          required
          fullWidth
          name="number"
          label="number"
          type="number"
          id="number"
          autoComplete="current-number"
        />
        {isLoading ? (
          <Box
            variant="contained"
            sx={{
              height: 40,
              width: "100%",
              backgroundColor: "primary.dark",
              color: "primary.contrastText",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              paddingBottom: "10px",
              paddingTop: "10px",
              transition: "all 0.3s",
              mt: 3,
              mb: 2,
              "&:hover": {
                backgroundColor: "primary.main",
                opacity: 0.9,
              },
            }}
          >
            <CircularProgress color="inherit" size={20} />
          </Box>
        ) : (
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Create User{" "}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default AdminCreateUser;
