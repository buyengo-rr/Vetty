import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
// import ForgotPassword from "./components/auth/ForgotPassword";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/common/Header";
import './App.css'

function App() {
  return (
    <div className="App">
        <Header />
      <Routes>
             <Route path="/" element={<Navigate to="/" />} />
            <Route path="/register"  element={<Register/>}/>
             <Route path="/login" element={<Login/>}/>
            {/* <Route path="/forgot-password" element={<ForgotPassword/>}/> */}
</Routes>
    </div>
  );
}

export default App;
