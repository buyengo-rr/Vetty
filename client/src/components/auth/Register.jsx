import { useState } from "react";
import "./auth.css";

export default function Register() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    setTimeout(() => {
      setMessage(`Registered successfully as ${formData.role.toUpperCase()}!`);
    }, 500);
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="register-title">👤 Register</h2>

        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="register-input"
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          className="register-input"
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          className="register-input"
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          onChange={handleChange}
          className="register-input"
        />

        <label className="register-label">Register as:</label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          className="register-select"
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button type="submit" className="register-button">
          Register
        </button>

        {message && (
          <p
            className={`register-message ${
              message.includes("successfully") ? "success" : "error"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
