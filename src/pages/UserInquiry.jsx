import { useState } from "react";
import axios from "axios";

import Login from "../components/Login";

import { Typography } from "@mui/material";

function UserInquiry() {
  const [loggedIn, setLoggedIn] = useState(false);
  if (loggedIn) {
    return (
      <Typography component="h1" variant="h4">
        로그인 성공!
      </Typography>
    );
  }
  return <Login setLoggedIn={setLoggedIn} />;
}

export default UserInquiry;
