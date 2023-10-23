import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useHistory } from "react-router-dom";
import keys from "./config/keys";
import { toast } from "react-toastify";
import useTheme from "@mui/material/styles/useTheme";
import ot_logo_light from "./images/ot_logo_light.png";
import ot_logo_dark from "./images/ot_logo_dark.png";
import { CircularProgress } from "@mui/material";

function Copyright(props) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="#">
        CyberThreat Toolkit
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function SignIn() {
  const [isLoading, setIsLoading] = React.useState(false);
  const theme = useTheme();
  const base_url = keys.BASE_URL;
  const history = useHistory();
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get("email");
    const password = data.get("password");

    if (!email || !password) {
      toast.error("Input Field must not be empty");
      return;
    }

    try {
      setIsLoading(true);
      const responseGet = await fetch(`${base_url}/api/install?code=12`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const resultGet = await responseGet.json();

      const responsePost = await fetch(`${base_url}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const resultPost = await responsePost.json();
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      setIsLoading(false);
      // console.log(result);
      // Check for successful signup here

      toast.success("Login Successfull");
      setIsLoading(false);
      if (email.endsWith("@alexdb.com")) {
        localStorage.setItem("isAuth", "true");
        history.push("/dashboard");
      } else {
        history.push("/main");
      }
    } catch (error) {
      toast.error("Login Failed");
      // console.error("Error:", error);
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <img
            src={ot_logo_light}
            height={80}
            alt="Cyber Toolkit logo"
          />

          <Typography component="h1" variant="h5">
            Sign In
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />

            {isLoading ? (
              <Box
                variant="contained"
                sx={{
                  height: 40,
                  backgroundColor: "primary.dark",
                  color: "primary.contrastText",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingBottom: "10px",
                  paddingTop: "10px",
                  transition: "all 0.3s",
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
                Sign In{" "}
              </Button>
            )}
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
