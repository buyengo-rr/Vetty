import { useState } from "react";

export default function Register() {
  const [formData, setFormData] = useState({ username: "", email: "", password: "", confirmPassword: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   if (formData.password !== formData.confirmPassword) {
  //     setMessage("Passwords do not match!");
  //     return;
  //   }

  //   const res = await fetch("/api/register", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(formData),
  //   });

  //   const data = await res.json();
  //   setMessage(data.message);
  // };


  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setMessage("❌ Passwords do not match!");
      return;
    }

    // Simulate success
    setTimeout(() => {
      setMessage("✅ Registered successfully!");
    }, 500);
  };

  return (
    <form onSubmit={handleSubmit}  style={{ background: "#f5f5f5", padding: "2rem", maxWidth: "400px", margin: "auto", marginTop: "100px", borderRadius: "8px" }}>
      <h2>Register</h2>
      <input name="username" placeholder="Username" onChange={handleChange} />
      <input name="email" type="email" placeholder="Email" onChange={handleChange} />
      <input name="password" type="password" placeholder="Password" onChange={handleChange} />
      <input name="confirmPassword" type="password" placeholder="Confirm Password" onChange={handleChange} />
      <button type="submit">Register</button>
      <p>{message}</p>
    </form>
  );
}
