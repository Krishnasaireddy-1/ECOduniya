import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles.css";

const API_URL = "http://localhost:5000"; // Change this to your backend URL

const Profile = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [pastDeals, setPastDeals] = useState([]);
  const [currentWaste, setCurrentWaste] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    // Get logged-in user from localStorage
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (!storedUser) {
      navigate("/login"); // Redirect to login if no user is found
      return;
    }

    fetchProfileData(storedUser.userId);
  }, []);

  // Fetch user profile data from the backend
  const fetchProfileData = async (userId) => {
    try {
      const response = await axios.get(`${API_URL}/api/profile/${userId}`);
      const userData = response.data;

      setUser(userData);
      setPastDeals(userData.pastDeals || []);
      setCurrentWaste(userData.currentWaste || []);
      setFormData(userData); // Pre-fill edit form with user data
    } catch (error) {
      console.error("Error fetching profile data:", error);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle profile update
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`${API_URL}/api/profile/update/${user._id}`, formData);
      setUser(formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="profile-container">
      <h2>Business User Profile</h2>

      {/* Logout Button */}
      <button onClick={handleLogout} className="logout-btn">
        Logout
      </button>

      {/* Profile Section */}
      {isEditing ? (
        <form className="profile-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <label>Business Name</label>
            <input
              type="text"
              name="businessName"
              value={formData.businessName || ""}
              onChange={handleChange}
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

          <button onClick={() => setIsEditing(true)} className="edit-profile-btn">
            Edit Profile
          </button>
        </div>
      )}

      {/* Past Deals Section */}
      <div className="past-deals">
        <h3>Past Deals</h3>
        {pastDeals.length > 0 ? (
          <div className="deals-list">
            {pastDeals.map((deal, index) => (
              <div key={index} className="deal-item">
                <p><strong>Waste Type:</strong> {deal.wasteType}</p>
                <p><strong>Quantity:</strong> {deal.quantity}</p>
                <p><strong>Date:</strong> {deal.date}</p>
                <p><strong>Status:</strong> {deal.status}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No past deals available.</p>
        )}
      </div>

      {/* Current Waste Section */}
      <div className="current-waste">
        <h3>Current Waste</h3>
        {currentWaste.length > 0 ? (
          <div className="waste-list">
            {currentWaste.map((waste, index) => (
              <div key={index} className="waste-item">
                <p><strong>Waste Type:</strong> {waste.wasteType}</p>
                <p><strong>Quantity:</strong> {waste.quantity}</p>
                <p><strong>Location:</strong> {waste.location}</p>
              </div>
            ))}
          </div>
        ) : (
          <p>No current waste being held.</p>
        )}
      </div>
    </div>
  );
};

export default Profile;
