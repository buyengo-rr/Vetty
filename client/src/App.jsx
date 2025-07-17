import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import ForgotPassword from "./components/auth/ForgotPassword";
export default function App() {
  return (
    <div>
      <Register />
      <Login />
      <ForgotPassword />
    </div>
  );
}
