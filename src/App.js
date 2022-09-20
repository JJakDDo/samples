import "./App.css";
import Menu from "./components/Menu";
import Editor from "./pages/Editor";
import Home from "./pages/Home";
import Otp from "./pages/Otp";
import UserInquiry from "./pages/UserInquiry";
import AdminInquiry from "./pages/AdminInquiry";
import { Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <Menu />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/editor" element={<Editor />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/userInquiry" element={<UserInquiry />} />
        <Route path="/adminInquiry" element={<AdminInquiry />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </div>
  );
}

export default App;
