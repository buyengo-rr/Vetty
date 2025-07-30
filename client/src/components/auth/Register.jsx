import { useState } from "react";
import "./auth.css";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    username: "",          
    email: "",
    password: "",
    confirmPassword: "",
    role: "user",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match!");
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("Registered successfully!");
        // Optionally reset form
        setFormData({
          username: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "user",
        });
      } else {
        setMessage(data.error || "Registration failed");
      }
    } catch (err) {
      setMessage("Network error");
    }
  };

  return (
    <div className="register-container">
      <form onSubmit={handleSubmit} className="register-form">
        <h2 className="register-title">👤 Register</h2>

        <input
          name="username"                          
          placeholder="Full Name"
          value={formData.username}
          onChange={handleChange}
          className="register-input"
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="register-input"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="register-input"
          required
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          className="register-input"
          required
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
              message.includes("success") ? "success" : "error"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
