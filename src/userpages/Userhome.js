import React, { useState } from "react";
import "../styles.css";

const Userhome = () => {
  // Mock data for the user profile, number of complaints raised, and trades made
  const [user, setUser] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
    businessName: "EcoWaste Solutions",
    complaintsRaised: 3,
    tradesMade: 12,
  });

  const [isEditing, setIsEditing] = useState(false); // Toggle edit mode
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    businessName: user.businessName,
  });

  // Handle form changes when editing profile
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission to update profile
  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(formData); // Update user state with the new profile info
    setIsEditing(false); // Exit edit mode
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>

      {/* Profile Section */}
      {isEditing ? (
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="businessName">Business Name</label>
            <input
              type="text"
              id="businessName"
              name="businessName"
              value={formData.businessName}
              onChange={handleChange}
              placeholder="Enter your business name"
            />
          </div>

          <button type="submit" className="submit-btn">
            Save Changes
          </button>
        </form>
      ) : (
        <div className="profile-details">
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <p>Business Name: {user.businessName}</p>
          <p>Complaints Raised: {user.complaintsRaised}</p>
          <p>Trades Made: {user.tradesMade}</p>

          <button
            onClick={() => setIsEditing(true)}
            className="edit-profile-btn"
          >
            Edit Profile
          </button>
        </div>
      )}
    </div>
  );
};

export default Userhome;