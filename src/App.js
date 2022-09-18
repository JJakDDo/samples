import "./App.css";
import Menu from "./components/Menu";
import Editor from "./pages/Editor";
import Home from "./pages/Home";
import { Route, Routes } from "react-router-dom";

function App() {
  return (
    <div style={{ display: "flex" }}>
      <Menu />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/editor' element={<Editor />} />
      </Routes>
    </div>
  );
}

export default App;
