
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Chat from "./Chat"; // Import chat component

// const Purchase = () => {
//   const [deals, setDeals] = useState([]);
//   const [chatUser, setChatUser] = useState(null);
//   const [loggedInUser, setLoggedInUser] = useState("");

//   useEffect(() => {
//     // Get logged-in user from local storage
//     const storedUser = JSON.parse(localStorage.getItem("user"));
//     if (storedUser && storedUser.name) {
//       setLoggedInUser(storedUser.name);
//     }

//     // Fetch deals
//     const fetchDeals = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/deals");
//         // Filter out deals posted by the logged-in user
//         const filteredDeals = response.data.filter(deal => deal.userName !== storedUser?.userName);
//         setDeals(filteredDeals);
//       } catch (error) {
//         console.error("Error fetching deals:", error);
//       }
//     };

//     fetchDeals();
//   }, []);

//   const handleContact = (userName) => {
//     console.log("Contacting user:", userName);
//     setChatUser(userName); // Open chat with the selected user
//   };

//   return (
//     <div className="deals-container">
//       <h2>Available Waste Deals</h2>
//       <table className="deals-table">
//         <thead>
//           <tr>
//             <th>User</th>
//             <th>Waste Type</th>
//             <th>Amount (kg)</th>
//             <th>Location</th>
//             <th>Price</th>
//             <th>Contact</th>
//           </tr>
//         </thead>
//         <tbody>
//           {deals.map((deal) => (
//             <tr key={deal._id}>
//               <td>{deal.userName}</td>
//               <td>{deal.wasteType}</td>
//               <td>{deal.amount}</td>
//               <td>{deal.location}</td>
//               <td>${deal.price}</td>
//               <td>
//                 <button className="contact-btn" onClick={() => handleContact(deal.userName)}>
//                   Contact
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {chatUser && <Chat chatUser={chatUser} loggedInUser={loggedInUser} />} {/* Open chat on click */}
//     </div>
//   );
// };

// export default Purchase;
import React, { useState, useEffect } from "react";
import axios from "axios";
import Chat from "./Chat";

const Purchase = () => {
  const [deals, setDeals] = useState([]);
  const [chatUser, setChatUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState("");

  useEffect(() => {
    // Get logged-in user from local storage
    const storedUser = localStorage.getItem("user");
    // console.log("Raw storedUser:", storedUser); // Debugging

    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        // console.log("Parsed user object:", parsedUser); // Debugging

        if (parsedUser && parsedUser.name) {
          setLoggedInUser(parsedUser.name);
        }
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }

    // Fetch deals
    const fetchDeals = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/deals");
        console.log("Fetched deals:", response.data); // Debugging

        // Filter out deals posted by the logged-in user
        const filteredDeals = response.data.filter(
          (deal) => deal.userName !== loggedInUser
        );
        setDeals(filteredDeals);
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
    };

    fetchDeals();
  }, []);

  const handleContact = (userName) => {
    // console.log("Contacting user:", userName);
    // console.log("Logged-in user:", loggedInUser);
    setChatUser(userName);
  };

  return (
    <div className="deals-container">
      <h2>Available Waste Deals</h2>
      <table className="deals-table">
        <thead>
          <tr>
            <th>User</th>
            <th>Waste Type</th>
            <th>Amount (kg)</th>
            <th>Location</th>
            <th>Price</th>
            <th>Contact</th>
          </tr>
        </thead>
        <tbody>
          {deals.map((deal) => (
            <tr key={deal._id}>
              <td>{deal.userName}</td>
              <td>{deal.wasteType}</td>
              <td>{deal.amount}</td>
              <td>{deal.location}</td>
              <td>${deal.price}</td>
              <td>
                <button
                  className="contact-btn"
                  onClick={() => handleContact(deal.userName)}
                >
                  Contact
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Debugging: Check values before passing to Chat */}
      <p>chatUser: {chatUser || "Not Set"}</p>
      <p>loggedInUser: {loggedInUser || "Not Set"}</p>

      {chatUser && loggedInUser ? (
        <Chat selectedUser={chatUser} currentUser={loggedInUser} />
      ) : (
        <p>Select a user to start a chat</p>
      )}
    </div>
  );
};

export default Purchase;

