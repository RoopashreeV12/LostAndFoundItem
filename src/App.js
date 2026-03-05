import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import Login from "./components/pages/Loginpage";
import Register from "./components/pages/Register";
import ReportItem from "./components/pages/ReportItem";
import ViewItem from "./components/pages/ViewItem";
import LostItems from "./components/pages/LostItems";
import FoundItems from "./components/pages/FoundItems";

import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/report" element={<ReportItem />} />
        <Route path="/items" element={<ViewItem />} />
        <Route path="/lost-items" element={<LostItems />} />
        <Route path="/found-items" element={<FoundItems />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;