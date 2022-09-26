import { useStore } from "../store/store";

import Login from "../components/Login";
import Inquiry from "../components/Inquiry";

function UserInquiry() {
  const setLoggedIn = useStore((state) => state.setLoggedIn);
  const jwt = useStore((state) => state.jwt);
  if (jwt.access_token) {
    return <Inquiry />;
  }
  return <Login setLoggedIn={setLoggedIn} />;
}

export default UserInquiry;
