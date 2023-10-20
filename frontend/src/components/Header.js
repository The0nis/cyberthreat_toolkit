import React from "react";
import ot_logo_light from "../images/ot_logo_light.png";
import ot_logo_dark from "../images/ot_logo_dark.png";
import useTheme from "@mui/material/styles/useTheme";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import keys from "../config/keys";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";

function Header() {
  const theme = useTheme();

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const history = useHistory();

  const base_url = keys.BASE_URL;

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const getEmailFromLocalStorage = () => {
    const email = localStorage.getItem("email");
    return email;
  };

  const getPasswordFromLocalStorage = () => {
    const password = localStorage.getItem("password");
    return password;
  };

  const handleLogout = async () => {
    const email = getEmailFromLocalStorage();
    const password = getPasswordFromLocalStorage();
    try {
      const response = await fetch(`${base_url}/api/logout`, {
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
      // console.log(result?.data?.status);

      if (response.ok) {
        setTimeout(() => {
          history.push("/signin");
        }, 2000);
      }
    } catch (error) {
      toast.error("Unknown Error occurred");
      localStorage.removeItem("email");
      localStorage.removeItem("password");
      localStorage.removeItem("isAuth");
      setTimeout(() => {
        history.push("/signin");
      }, 2000);
      console.error("Error:", error);
    }
    handleClose();
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    localStorage.removeItem("isAuth");

    setTimeout(() => {
      history.push("/signin");
    }, 2000);
  };

  return (
    <Box sx={{ flexGrow: 1, boxShadow: "none", marginBottom: ".1rem" }}>
      <AppBar position="static" color="transparent" sx={{ boxShadow: "none" }}>
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <img
              src={theme.palette.mode === "dark" ? ot_logo_dark : ot_logo_light}
              height={80}
              alt="Cyber Toolkit logo"
            />
          </Typography>

          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {/* <MenuItem onClick={handleClose}>Profile</MenuItem> */}
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </div>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default Header;
