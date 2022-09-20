import { useState } from "react";

import Login from "../components/Login";
import Inquiry from "../components/Inquiry";

function UserInquiry() {
  const [loggedIn, setLoggedIn] = useState(false);

  console.log(loggedIn);

  if (loggedIn) {
    return <Inquiry />;
  }
  return <Login setLoggedIn={setLoggedIn} />;
}

export default UserInquiry;
