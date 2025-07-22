import React, { useState, useEffect } from 'react';

const defaultProfileImage = '/default-profile.png'; // Path to default image

function AdminProfile() {
  const [admin, setAdmin] = useState({
    name: '',
    email: '',
    profilePhoto: '',
  });
  const [previewPhoto, setPreviewPhoto] = useState(null);
  const [photoFile, setPhotoFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch admin profile data from API on mount
    async function fetchAdminProfile() {
      try {
        const response = await fetch('/api/admin/profile');
        if (!response.ok) {
          throw new Error('Failed to fetch admin profile');
        }
        const data = await response.json();
        setAdmin({
          name: data.name || '',
          email: data.email || '',
          profilePhoto: data.profilePhoto || '',
        });
      } catch (err) {
        setError('Error loading profile data');
      }
    }
    fetchAdminProfile();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setAdmin(prev => ({ ...prev, [name]: value }));
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhotoFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPhoto(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = async () => {
    setLoading(true);
    setMessage(null);
    setError(null);
    try {
      const formData = new FormData();
      formData.append('name', admin.name);
      formData.append('email', admin.email);
      if (photoFile) {
        formData.append('profilePhoto', photoFile);
      }

      const response = await fetch('/api/admin/profile', {
        method: 'PATCH',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      const data = await response.json();
      setAdmin({
        name: data.name || '',
        email: data.email || '',
        profilePhoto: data.profilePhoto || '',
      });
      setPreviewPhoto(null);
      setPhotoFile(null);
      setMessage('Profile updated successfully');
    } catch (err) {
      setError(err.message || 'Error updating profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '400px', margin: '1rem auto', padding: '1rem', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Admin Profile</h2>
      {error && <div style={{ color: 'red', marginBottom: '1rem' }}>{error}</div>}
      {message && <div style={{ color: 'green', marginBottom: '1rem' }}>{message}</div>}

      <div style={{ marginBottom: '1rem', textAlign: 'center' }}>
        <img
          src={previewPhoto || admin.profilePhoto || defaultProfileImage}
          alt="Profile"
          style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="profilePhoto" style={{ display: 'block', marginBottom: '0.5rem' }}>Profile Photo</label>
        <input type="file" id="profilePhoto" accept="image/*" onChange={handlePhotoChange} disabled={loading} />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="name" style={{ display: 'block', marginBottom: '0.5rem' }}>Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={admin.name}
          onChange={handleInputChange}
          disabled={loading}
          style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
        />
      </div>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem' }}>Email</label>
        <input
          type="email"
          id="email"
          name="email"
          value={admin.email}
          onChange={handleInputChange}
          disabled={loading}
          style={{ width: '100%', padding: '0.5rem', fontSize: '1rem' }}
        />
      </div>

      <button
        onClick={handleSave}
        disabled={loading}
        style={{
          padding: '0.75rem 1.5rem',
          fontSize: '1rem',
          backgroundColor: loading ? '#ccc' : '#007bff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: loading ? 'not-allowed' : 'pointer',
        }}
      >
        {loading ? 'Saving...' : 'Save'}
      </button>
    </div>
  );
}

export default AdminProfile;
