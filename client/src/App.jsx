import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Footer from './components/common/Footer';
import Home from './pages/Home'; // Add this import
import { Routes, Route } from "react-router-dom";
import Header from "./components/common/Header";
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} /> {/* Set Home as the root route */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        {/* <Route path="/forgot-password" element={<ForgotPassword />} */}
      </Routes>
      <Footer />
    </div>
  );
}

export default App;