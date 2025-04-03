import React, { useState } from "react";
import axios from "axios";
import "../styles.css";

const wasteTypes = [
  { type: "Plastic", icon: "🛍️" },
  { type: "Metal", icon: "🔩" },
  { type: "E-Waste", icon: "💻" },
  { type: "Paper", icon: "📄" },
  { type: "Glass", icon: "🍶" },
];

const Tradeoff = () => {
  const [selectedWaste, setSelectedWaste] = useState(null);
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleWasteClick = async (wasteType) => {
    setSelectedWaste(wasteType);
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:5000/api/companies?waste=${wasteType}`);
      setCompanies(response.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="tradeoff-container">
      <h2>Select Waste Type to Trade</h2>
      <div className="waste-icons">
        {wasteTypes.map((waste) => (
          <button key={waste.type} className="waste-btn" onClick={() => handleWasteClick(waste.type)}>
            <span className="icon">{waste.icon}</span> {waste.type}
          </button>
        ))}
      </div>

      {loading && <p>Loading companies...</p>}

      {selectedWaste && companies.length > 0 && (
        <div className="companies-list">
          <h3>Companies Trading {selectedWaste}</h3>
          {companies.map((company) => (
            <div key={company.id} className="company-card">
              <h4>{company.name}</h4>
              <p>📍 {company.location}</p>
              <p>☎ {company.contact}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tradeoff;
