import React, { useState, useRef } from "react";
import OtpAuth from "../components/OtpAuth";
import { Box, Button, TextField } from "@mui/material";
import axios from "axios";

const ENDPOINT = "https://notion-page-api.herokuapp.com/api/v1/auth";

function Otp() {
  const emailRef = useRef(null);
  const [email, setEmail] = useState("");
  const [firstLogin, setFirstLogin] = useState(false);
  const [qrcodeUrl, setqrcodeUrl] = useState("");

  const handleSignUp = async () => {
    try {
      const data = await axios.post(`${ENDPOINT}/signup`, {
        email: emailRef.current.value,
      });
      if (data.status === 200) {
        setqrcodeUrl(data.data.url);
        setFirstLogin(true);
        setEmail(emailRef.current.value);
      }
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  const handleLogin = async () => {
    try {
      const data = await axios.post(`${ENDPOINT}/login`, {
        email: emailRef.current.value,
      });
      if (data.status === 200) {
        setqrcodeUrl(data.data.url);
        setFirstLogin(true);
        setEmail(emailRef.current.value);
      }
    } catch (error) {
      alert(error.response.data.msg);
    }
  };

  if (!firstLogin) {
    return (
      <Box sx={{ mt: 10 }}>
        <TextField label="email" variant="standard" inputRef={emailRef} />
        <Button variant="contained" onClick={handleSignUp}>
          Sign Up
        </Button>
        <Button variant="contained" onClick={handleLogin}>
          Login
        </Button>
      </Box>
    );
  } else {
    return <OtpAuth qrcodeUrl={qrcodeUrl} email={email} />;
  }
}

export default Otp;
