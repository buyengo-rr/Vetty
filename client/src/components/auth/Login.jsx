import { useState } from "react";


export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   const res = await fetch("/api/login", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(formData),
  //   });

  //   const data = await res.json();
  //   if (data.token) {
  //     localStorage.setItem("token", data.token);
  //     setMessage("Logged in successfully!");
  //   } else {
  //     setMessage(data.message);
  //   }
  // };
 
    const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate successful login
    setTimeout(() => {
      setMessage("✅ Logged in successfully!");
    }, 500);
  };
  return (
    <form onSubmit={handleSubmit} style={{ background: "#f5f5f5", padding: "2rem", maxWidth: "400px", margin: "auto", marginTop: "100px", borderRadius: "8px" }}>
      <h2>Login</h2>
      <input name="email" type="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <button type="submit">Login</button>
      <p>{message}</p>
    </form>
  );
}
