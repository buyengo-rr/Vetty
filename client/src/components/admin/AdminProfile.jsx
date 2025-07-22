import React, { useState, useEffect } from 'react';

const AdminProfile = () => {
  const [admin, setAdmin] = useState({
    name: '',
    email: '',
    photo: '',
  });

  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [message, setMessage] = useState('');

  // Mock fetch on mount (replace with real API)
  useEffect(() => {
    // Simulate fetching profile
    const fetchProfile = async () => {
      const mockData = {
        name: 'Admin User',
        email: 'admin@example.com',
        photo: '', // add a default photo URL here
      };
      setAdmin(mockData);
    };

    fetchProfile();
  }, []);

  const handleInputChange = (e) => {
    setAdmin({ ...admin, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAdmin({ ...admin, photo: file });
      setPreviewPhoto(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    setMessage('');

    try {
      const formData = new FormData();
      formData.append('name', admin.name);
      formData.append('email', admin.email);
      if (admin.photo instanceof File) {
        formData.append('photo', admin.photo);
      }

      // Replace with real API call
      console.log('Submitting profile:', Object.fromEntries(formData));

      // Simulate delay
      await new Promise((res) => setTimeout(res, 1000));

      setMessage('Profile updated successfully!');
    } catch (error) {
      setMessage('Failed to update profile.');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="admin-profile">
      <h2 className="text-2xl font-bold mb-4">Admin Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block font-semibold mb-1">Name:</label>
          <input
            type="text"
            name="name"
            value={admin.name}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Email:</label>
          <input
            type="email"
            name="email"
            value={admin.email}
            onChange={handleInputChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Profile Photo:</label>
          <input type="file" accept="image/*" onChange={handlePhotoChange} />
          {previewPhoto && (
            <img
              src={previewPhoto}
              alt="Preview"
              className="mt-2 w-32 h-32 object-cover rounded-full"
            />
          )}
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={isSaving}
        >
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>

        {message && <p className="text-green-600 mt-2">{message}</p>}
      </form>
    </div>
  );
};

export default AdminProfile;
