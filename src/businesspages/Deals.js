
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../styles.css";

// const Deals = () => {
//   const [userName, setUserName] = useState(""); // New field for userName
//   const [wasteType, setWasteType] = useState("");
//   const [amount, setAmount] = useState("");
//   const [location, setLocation] = useState("");
//   const [deals, setDeals] = useState([]);
//   const [isPostFormVisible, setIsPostFormVisible] = useState(false);
//   const [message, setMessage] = useState("");

//   // Fetch deals from backend on component mount
//   useEffect(() => {
//     const fetchDeals = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/deals");
//         setDeals(response.data);
//       } catch (error) {
//         console.error("Error fetching deals:", error);
//       }
//     };

//     fetchDeals();
//   }, []);

//   // Handle posting a new deal
//   const handlePostWaste = async (e) => {
//     e.preventDefault();

//     if (!userName || !wasteType || !amount || !location) {
//       setMessage("All fields are required.");
//       return;
//     }

//     const dealData = { userName, wasteType, amount, location };

//     try {
//       const response = await axios.post("http://localhost:5000/api/deals/add", dealData);
//       setDeals([...deals, response.data.deal]);

//       setMessage("Deal added successfully!");
//       setIsPostFormVisible(false);

//       setUserName("");
//       setWasteType("");
//       setAmount("");
//       setLocation("");
//     } catch (error) {
//       console.error("Error posting deal:", error);
//       setMessage("There was an error posting the deal.");
//     }
//   };

//   return (
//     <div className="deals-container">
//       <h2>Manage Your Waste Deals</h2>

//       <button className="post-deal-btn" onClick={() => setIsPostFormVisible(!isPostFormVisible)}>
//         {isPostFormVisible ? "Cancel" : "Post New Deal"}
//       </button>

//       {isPostFormVisible && (
//         <form onSubmit={handlePostWaste} className="deals-form">
//           <div className="form-group">
//             <label>User Name</label>
//             <input
//               type="text"
//               value={userName}
//               onChange={(e) => setUserName(e.target.value)}
//               placeholder="Enter your name"
//             />
//           </div>

//           <div className="form-group">
//             <label>Waste Type</label>
//             <input
//               type="text"
//               value={wasteType}
//               onChange={(e) => setWasteType(e.target.value)}
//               placeholder="Enter waste type (e.g., Plastic)"
//             />
//           </div>

//           <div className="form-group">
//             <label>Amount (kg)</label>
//             <input
//               type="number"
//               value={amount}
//               onChange={(e) => setAmount(e.target.value)}
//               placeholder="Enter amount in kg"
//             />
//           </div>

//           <div className="form-group">
//             <label>Location</label>
//             <input
//               type="text"
//               value={location}
//               onChange={(e) => setLocation(e.target.value)}
//               placeholder="Enter your location"
//             />
//           </div>

//           <button type="submit" className="submit-btn">Post Deal</button>
//         </form>
//       )}

//       {message && <div className="message">{message}</div>}

//       <div className="previous-deals">
//         <h3>Available Deals</h3>
//         <table className="deals-table">
//           <thead>
//             <tr>
//               <th>User Name</th>
//               <th>Waste Type</th>
//               <th>Amount (kg)</th>
//               <th>Location</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {deals.map((deal) => (
//               <tr key={deal._id}>
//                 <td>{deal.userName}</td>
//                 <td>{deal.wasteType}</td>
//                 <td>{deal.amount}</td>
//                 <td>{deal.location}</td>
//                 <td>{deal.status}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//     </div>
//   );
// };

// export default Deals;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";

const Deals = () => {
  const [wasteType, setWasteType] = useState("");
  const [amount, setAmount] = useState("");
  const [location, setLocation] = useState("");
  const [deals, setDeals] = useState([]);
  const [isPostFormVisible, setIsPostFormVisible] = useState(false);
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState(""); // Store logged-in user's name

  // Fetch logged-in user's name from local storage
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.name) {
      setUserName(user.name);
    }
  }, []);

  // Fetch deals from backend and filter by user
  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/deals");
        const userDeals = response.data.filter((deal) => deal.userName === userName);
        setDeals(userDeals);
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
    };

    if (userName) {
      fetchDeals();
    }
  }, [userName]);

  // Handle posting a new deal
  const handlePostWaste = async (e) => {
    e.preventDefault();

    if (!wasteType || !amount || !location) {
      setMessage("All fields are required.");
      return;
    }

    const dealData = { userName, wasteType, amount, location };

    try {
      const response = await axios.post("http://localhost:5000/api/deals/add", dealData);
      setDeals([...deals, response.data.deal]);

      setMessage("Deal added successfully!");
      setIsPostFormVisible(false);

      setWasteType("");
      setAmount("");
      setLocation("");
    } catch (error) {
      console.error("Error posting deal:", error);
      setMessage("There was an error posting the deal.");
    }
  };

  // Handle removing a deal
  const handleRemoveDeal = async (dealId) => {
    try {
      await axios.delete(`http://localhost:5000/api/deals/delete/${dealId}`);

      // Remove the deal from the UI
      setDeals(deals.filter((deal) => deal._id !== dealId));
      setMessage("Deal removed successfully!");
    } catch (error) {
      console.error("Error removing deal:", error);
      setMessage("There was an error removing the deal.");
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

      {deals.length > 0 ? (
        <div className="previous-deals">
          <h3>Your Deals</h3>
          <table className="deals-table">
            <thead>
              <tr>
                <th>Waste Type</th>
                <th>Amount (kg)</th>
                <th>Location</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {deals.map((deal) => (
                <tr key={deal._id}>
                  <td>{deal.wasteType}</td>
                  <td>{deal.amount}</td>
                  <td>{deal.location}</td>
                  <td>{deal.status}</td>
                  <td>
                    <button className="remove-btn" onClick={() => handleRemoveDeal(deal._id)}>
                      Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No deals found for your account.</p>
      )}
    </div>
  );
};

export default Deals;
