
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";

const Deals = () => {
  const [userName, setUserName] = useState(""); // New field for userName
  const [wasteType, setWasteType] = useState("");
  const [amount, setAmount] = useState("");
  const [location, setLocation] = useState("");
  const [deals, setDeals] = useState([]);
  const [isPostFormVisible, setIsPostFormVisible] = useState(false);
  const [message, setMessage] = useState("");

  // Fetch deals from backend on component mount
  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/deals");
        setDeals(response.data);
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
    };

    fetchDeals();
  }, []);

  // Handle posting a new deal
  const handlePostWaste = async (e) => {
    e.preventDefault();

    if (!userName || !wasteType || !amount || !location) {
      setMessage("All fields are required.");
      return;
    }

    const dealData = { userName, wasteType, amount, location };

    try {
      const response = await axios.post("http://localhost:5000/api/deals/add", dealData);
      setDeals([...deals, response.data.deal]);

      setMessage("Deal added successfully!");
      setIsPostFormVisible(false);

      setUserName("");
      setWasteType("");
      setAmount("");
      setLocation("");
    } catch (error) {
      console.error("Error posting deal:", error);
      setMessage("There was an error posting the deal.");
    }
  };

  return (
    <div className="deals-container">
      <h2>Manage Your Waste Deals</h2>

      <button className="post-deal-btn" onClick={() => setIsPostFormVisible(!isPostFormVisible)}>
        {isPostFormVisible ? "Cancel" : "Post New Deal"}
      </button>

      {isPostFormVisible && (
        <form onSubmit={handlePostWaste} className="deals-form">
          <div className="form-group">
            <label>User Name</label>
            <input
              type="text"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
              placeholder="Enter your name"
            />
          </div>

          <div className="form-group">
            <label>Waste Type</label>
            <input
              type="text"
              value={wasteType}
              onChange={(e) => setWasteType(e.target.value)}
              placeholder="Enter waste type (e.g., Plastic)"
            />
          </div>

          <div className="form-group">
            <label>Amount (kg)</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="Enter amount in kg"
            />
          </div>

          <div className="form-group">
            <label>Location</label>
            <input
              type="text"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Enter your location"
            />
          </div>

          <button type="submit" className="submit-btn">Post Deal</button>
        </form>
      )}

      {message && <div className="message">{message}</div>}

      <div className="previous-deals">
        <h3>Available Deals</h3>
        <table className="deals-table">
          <thead>
            <tr>
              <th>User Name</th>
              <th>Waste Type</th>
              <th>Amount (kg)</th>
              <th>Location</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {deals.map((deal) => (
              <tr key={deal._id}>
                <td>{deal.userName}</td>
                <td>{deal.wasteType}</td>
                <td>{deal.amount}</td>
                <td>{deal.location}</td>
                <td>{deal.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Deals;
