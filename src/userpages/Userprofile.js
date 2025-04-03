import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles.css";

const Userprofile = () => {
  const navigate = useNavigate();

  // Load user from local storage or use mock data
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser
      ? JSON.parse(storedUser)
      : {
          name: "John Doe",
          email: "johndoe@example.com",
          businessName: "EcoWaste Solutions",
          complaintsRaised: 3,
          tradesMade: 12,
        };
  });

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    businessName: user.businessName,
  });

  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
  }, [user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser(formData);
    setIsEditing(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <h2>User Profile</h2>
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
          <button type="submit" className="submit-btn">Save Changes</button>
        </form>
      ) : (
        <div className="profile-details">
          <h3>{user.name}</h3>
          <p>Email: {user.email}</p>
          <p>Business Name: {user.businessName}</p>
          <p>Complaints Raised: {user.complaintsRaised}</p>
          <p>Trades Made: {user.tradesMade}</p>
          <button onClick={() => setIsEditing(true)} className="edit-profile-btn">Edit Profile</button>
        </div>
      )}
      <button onClick={handleLogout} className="logout-btn">Logout</button>
    </div>
  );
};

export default Userprofile;
