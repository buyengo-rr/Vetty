import React, { useEffect, useState } from "react";
import "../../styles/pages.css"

const AdminProfile = () => {
  const [admin, setAdmin] = useState({
    email: "",
    full_name: "",
    phone: "",
    avatar: "",
  });
  const [photoFile, setPhotoFile] = useState(null);
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch("http://localhost:5000/api/profile/", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch profile");
        return res.json();
      })
      .then((data) => setAdmin(data))
      .catch((err) => console.error("Error:", err));
  }, [token]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAdmin((prev) => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    setPhotoFile(e.target.files[0]);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append("email", admin.email);
    formData.append("full_name", admin.full_name);
    formData.append("phone", admin.phone);
    if (photoFile) {
      formData.append("profilePhoto", photoFile);
    }

    try {
      const res = await fetch("http://localhost:5000/api/profile/", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.ok) {
        const updated = await res.json();
        alert("Profile updated successfully");
        setAdmin((prev) => ({ ...prev, ...updated }));
      } else {
        alert("Failed to update profile");
      }
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="admin-profile">
      <h2>Admin Profile</h2>

      {admin.avatar && (
        <img
          src={`http://localhost:5000${admin.avatar}`}
          alt="avatar"
          style={{ width: "100px", borderRadius: "50%" }}
        />
      )}

      <input type="file" onChange={handlePhotoChange} />
      <input
        type="text"
        name="full_name"
        value={admin.full_name}
        placeholder="Full Name"
        onChange={handleChange}
      />
      <input
        type="email"
        name="email"
        value={admin.email}
        placeholder="Email"
        onChange={handleChange}
      />
      <input
        type="tel"
        name="phone"
        value={admin.phone}
        placeholder="Phone"
        onChange={handleChange}
      />
      <button onClick={handleSave}>Save</button>
    </div>
  );
};

export default AdminProfile;
