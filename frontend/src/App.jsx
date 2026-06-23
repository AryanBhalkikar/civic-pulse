import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Landing from "./pages/landing/Landing.jsx";
import Login from "./pages/auth/Login.jsx";
import Signup from "./pages/auth/Signup.jsx";
import MapPage from "./pages/map/MapPage.jsx";
import AdminDashboard from "./pages/admin/AdminDashboard.jsx";

function App() {
  return(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />}/>
        <Route path="/mapPage" element={<MapPage />}/>
        <Route path="/admin/dashboard" element={<AdminDashboard />}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
