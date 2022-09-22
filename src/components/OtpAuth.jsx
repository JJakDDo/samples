import React, { useState, useRef } from "react";
import axios from "axios";

import { Typography, TextField, Button } from "@mui/material";
import { errorHandler } from "../utils/error";

const ENDPOINT = "https://notion-page-api.herokuapp.com/api/v1/auth";

function OtpAuth({ qrcodeUrl, email }) {
  const codeRef = useRef(null);
  const [error, setError] = useState(false);
  const handleVerify = async () => {
    setError(false);
    if (codeRef.current.value === "") {
      setError(true);
      return;
    }
    try {
      const data = await axios.post(`${ENDPOINT}/verify`, {
        email,
        code: codeRef.current.value,
      });
      if (data.status === 200) {
        alert(data.data.msg);
      }
    } catch (error) {
      console.log(error);
      errorHandler(error);
    }
  };
  return (
    <div>
      <Typography variant="h3">Google OTP 인증</Typography>
      <img src={qrcodeUrl} alt="qrcode"></img>
      <Typography variant="body1">
        Please scan QRCode from Google Authenticator mobile app
      </Typography>

      <TextField
        error={error}
        label="코드"
        variant="standard"
        inputRef={codeRef}
      />
      <Button variant="contained" onClick={handleVerify}>
        Verify
      </Button>
      <Typography variant="body1">Please enter 6 digit codes</Typography>
    </div>
  );
}

export default OtpAuth;
