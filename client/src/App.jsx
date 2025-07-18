import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgotPassword";
import React from "react";
import Header from "./components/common/Header";
import './App.css'
import { Routes, Route, Navigate } from "react-router-dom";

function App() {
  return (
    <div className="App">
        <Header />
        <Routes>
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
    </div>
  );
}

export default App;
