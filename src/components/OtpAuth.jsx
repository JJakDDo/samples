import React, { useRef } from "react";
import axios from "axios";

import { Typography, TextField, Button } from "@mui/material";

const ENDPOINT = "https://notion-page-api.herokuapp.com/api/v1/auth";

function OtpAuth({ qrcodeUrl, email }) {
  const codeRef = useRef(null);
  const handleVerify = async () => {
    try {
      const data = await axios.post(`${ENDPOINT}/verify`, {
        email,
        code: codeRef.current.value,
      });
      if (data.status === 200) {
        alert(data.data.msg);
      }
    } catch (error) {
      alert(error.response.data.msg);
    }
  };
  return (
    <div>
      <Typography variant="h3">Google OTP 인증</Typography>
      <img src={qrcodeUrl} alt="qrcode"></img>
      <Typography variant="body1">
        처음이시면 Google Authenticator 모바일 앱에서 위 QRCode를 스캔해서
        등록하세요
      </Typography>

      <TextField label="코드" variant="standard" inputRef={codeRef} />
      <Button variant="contained" onClick={handleVerify}>
        인증
      </Button>
      <Typography variant="body1">6자리 코드를 입력하세요</Typography>
    </div>
  );
}

export default OtpAuth;
