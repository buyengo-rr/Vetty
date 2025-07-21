// import { useState } from "react";


// export default function Login() {
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [message, setMessage] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   const res = await fetch("/api/login", {
//   //     method: "POST",
//   //     headers: { "Content-Type": "application/json" },
//   //     body: JSON.stringify(formData),
//   //   });

//   //   const data = await res.json();
//   //   if (data.token) {
//   //     localStorage.setItem("token", data.token);
//   //     setMessage("Logged in successfully!");
//   //   } else {
//   //     setMessage(data.message);
//   //   }
//   // };
 
//     const handleSubmit = (e) => {
//     e.preventDefault();
//     // Simulate successful login
//     setTimeout(() => {
//       setMessage("✅ Logged in successfully!");
//     }, 500);
//   };
//   return (
//     <form onSubmit={handleSubmit} style={{ background: "#f5f5f5", padding: "2rem", maxWidth: "400px", margin: "auto", marginTop: "100px", borderRadius: "8px" }}>
//       <h2>Login</h2>
//       <input name="email" type="email" placeholder="Email" onChange={handleChange} />
//       <input name="password" type="password" placeholder="Password" onChange={handleChange} />
//       <button type="submit">Login</button>
//       <p>{message}</p>
//     </form>
//   );
// }


import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Fake auth logic
    localStorage.setItem("token", "dummy-token");
    localStorage.setItem("role", "user"); // Or "admin"

    setMessage("✅ Logged in successfully!");

    // Redirect after a short delay
    setTimeout(() => {
      navigate("/user/dashboard"); // or "/admin/dashboard"
    }, 1000);
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        background: "#f5f5f5",
        padding: "2rem",
        maxWidth: "400px",
        margin: "auto",
        marginTop: "100px",
        borderRadius: "8px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
      }}
    >
      <h2 style={{ textAlign: "center" }}>Login</h2>
      <input
        name="email"
        type="email"
        placeholder="Email"
        onChange={handleChange}
        required
        style={{ padding: "0.75rem", borderRadius: "4px", border: "1px solid #ccc" }}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        required
        autoComplete="current-password"
        style={{ padding: "0.75rem", borderRadius: "4px", border: "1px solid #ccc" }}
      />
      <button
        type="submit"
        style={{
          padding: "0.75rem",
          borderRadius: "4px",
          backgroundColor: "#203a43",
          color: "white",
          border: "none",
          fontWeight: "bold",
          cursor: "pointer",
        }}
      >
        Login
      </button>
      <p style={{ color: "green", textAlign: "center" }}>{message}</p>
    </form>
  );
}

