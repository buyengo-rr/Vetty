import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "../../styles/pages.css";

export default function UserProfile() {
  const [user, setUser] = useState({
    full_name: "",
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
    } else {
      fetchProfile(token);
    }
  }, [navigate]);

  const fetchProfile = async (token) => {
    try {
      const res = await fetch("http://127.0.0.1:5000/profile/", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch profile");

      const data = await res.json();
      setUser({
        full_name: data.name || "",
        email: data.email || "",
        phone: data.phone || "",
        avatar: null,
      });
      if (data.avatar) {
        setPreview(data.avatar);
      }
    } catch (err) {
      toast.error("Error fetching profile");
    }
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateInputs()) return;

    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("full_name", user.full_name);
    formData.append("email", user.email);
    formData.append("phone", user.phone);
    if (user.avatar) {
      formData.append("profilePhoto", user.avatar);
    }

    try {
      const res = await fetch("http://127.0.0.1:5000/profile/", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Update failed");

      const data = await res.json();
      toast.success(data.message || "Profile updated successfully!");
    } catch (err) {
      toast.error("Failed to update profile");
    }
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
            name="full_name"
            placeholder="Full Name"
            value={user.full_name}
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
