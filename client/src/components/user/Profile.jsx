import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../../styles/pages.css";

export default function UserProfile() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    avatar: null,
  });
  const [preview, setPreview] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Unauthorized! Please log in.");
      navigate("/login");
    }
  }, [navigate]);

  const validateInputs = () => {
    const emailRegex = /^\S+@\S+\.\S+$/;
    const phoneRegex = /^[0-9]{10,15}$/;

    if (!emailRegex.test(user.email)) {
      toast.error("Invalid email format.");
      return false;
    }
    if (!phoneRegex.test(user.phone)) {
      toast.error("Phone must be 10–15 digits.");
      return false;
    }
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUser((prev) => ({ ...prev, avatar: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateInputs()) return;
    // Send to backend
    toast.success("Profile updated successfully!");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    toast.info("Logged out");
    navigate("/login");
  };

  return (
    <div className="user-profile-page">
      <div className="profile-card">
        <h2>My Profile</h2>

        <form onSubmit={handleSubmit} className="profile-form">
          <div className="avatar-upload">
            {preview ? (
              <img src={preview} alt="Avatar Preview" className="avatar-img" />
            ) : (
              <div className="avatar-placeholder">Upload</div>
            )}
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={user.name}
            onChange={handleInputChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={user.email}
            onChange={handleInputChange}
            required
          />
          <input
            type="tel"
            name="phone"
            placeholder="Phone Number"
            value={user.phone}
            onChange={handleInputChange}
            required
          />

          <button type="submit" className="btn-primary">Update Profile</button>
        </form>

        <button onClick={handleLogout} className="btn-logout">Logout</button>
      </div>
    </div>
  );
}
