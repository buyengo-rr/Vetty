import { useState } from "react";

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
      setMessage(" Passwords do not match!");
      return;
    }

    setTimeout(() => {
      setMessage(
        ` Registered successfully as ${formData.role.toUpperCase()}!`
      );
    }, 500);
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#eef2f7",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          background: "#fff",
          padding: "2rem",
          borderRadius: "10px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
          width: "100%",
          maxWidth: "400px",
        }}
      >
        <h2 style={{ textAlign: "center", marginBottom: "1rem", color: "#333" }}>
          👤 Register
        </h2>

        <input
          name="username"
          placeholder="Username"
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
          style={inputStyle}
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="Confirm Password"
          onChange={handleChange}
          style={inputStyle}
        />

        
        <label style={{ marginBottom: "0.5rem", display: "block", color: "#555" }}>
          Register as:
        </label>
        <select
          name="role"
          value={formData.role}
          onChange={handleChange}
          style={{
            ...inputStyle,
            padding: "0.5rem",
            cursor: "pointer",
          }}
        >
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>

        <button
          type="submit"
          style={{
            background: "#4f46e5",
            color: "#fff",
            border: "none",
            padding: "0.75rem",
            borderRadius: "6px",
            width: "100%",
            cursor: "pointer",
            fontWeight: "bold",
            marginTop: "1rem",
            transition: "background 0.3s",
          }}
          onMouseOver={(e) => (e.target.style.background = "#4338ca")}
          onMouseOut={(e) => (e.target.style.background = "#4f46e5")}
        >
          Register
        </button>

        {message && (
          <p
            style={{
              marginTop: "1rem",
              color: message.startsWith("") ? "green" : "red",
              textAlign: "center",
            }}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

const inputStyle = {
  width: "100%",
  padding: "0.75rem",
  marginBottom: "1rem",
  border: "1px solid #ccc",
  borderRadius: "6px",
  outline: "none",
  fontSize: "1rem",
};
