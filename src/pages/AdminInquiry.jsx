import { useStore } from "../store/store";

import Login from "../components/Login";
import Inquiry from "../components/Inquiry";

function AdminInquiry() {
  const adminLoggedIn = useStore((state) => state.adminLoggedIn);
  const setAdminLoggedIn = useStore((state) => state.setAdminLoggedIn);
  const jwt = useStore((state) => state.jwt);

  if (adminLoggedIn && jwt.access_token) {
    return <Inquiry admin={true} />;
  }
  return <Login setLoggedIn={setAdminLoggedIn} admin={true} />;
}

export default AdminInquiry;
