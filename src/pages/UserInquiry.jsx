import { useStore } from "../store/store";

import Login from "../components/Login";
import Inquiry from "../components/Inquiry";

function UserInquiry() {
  const loggedIn = useStore((state) => state.loggedIn);
  const setLoggedIn = useStore((state) => state.setLoggedIn);

  if (loggedIn) {
    return <Inquiry />;
  }
  return <Login setLoggedIn={setLoggedIn} />;
}

export default UserInquiry;
