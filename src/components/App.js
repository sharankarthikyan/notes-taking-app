import React from "react";
import LoginComponent from "./LoginComponent/LoginComponent";
import SignupComponent from "./SignupComponent/SignupComponent";
import HomeComponent from "./HomeComponent/HomeComponent";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginComponent />} />
        <Route path="/signup" element={<SignupComponent />} />
        <Route path="/home" element={<HomeComponent />} />
      </Routes>
    </Router>
  );
}

export default App;
