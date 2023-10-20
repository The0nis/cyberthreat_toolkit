import React, { useEffect, useState } from "react";
import keys from "./config/keys";
import { useHistory } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import Loader from "./components/Loader/Loader";

const AuthScreen = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);

  const base_url = keys.BASE_URL;
  const history = useHistory();

  const getEmailFromLocalStorage = () => {
    const email = localStorage.getItem("email");
    return email;
  };

  const getIsAuthFromLocalStorage = () => {
    const isAuth = localStorage.getItem("isAuth");
    return isAuth;
  };

  const handleAuth = async () => {
    const email = getEmailFromLocalStorage();

    try {
      setIsLoading(true);
      const response = await fetch(`${base_url}/api/check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
        }),
      });

      const result = await response.json();

      localStorage.setItem("isAuth", "true");
    } catch (error) {
      localStorage.setItem("isAuth", "false");
      history.push("/signin");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleAuth();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const isAuth = getIsAuthFromLocalStorage();
  console.log("auth--", isAuth);

  if (isAuth !== "true") {
    localStorage.removeItem("email");
    localStorage.removeItem("password");
    history.push("/signin");
    return null;
  }

  return children;
};

export default AuthScreen;
