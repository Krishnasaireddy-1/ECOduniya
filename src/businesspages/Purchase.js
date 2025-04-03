
// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Chat from "./Chat";

// const Purchase = () => {
//   const [deals, setDeals] = useState([]);
//   const [chatUser, setChatUser] = useState(null);
//   const [loggedInUser, setLoggedInUser] = useState("");

//   useEffect(() => {
//     // Get logged-in user from local storage
//     const storedUser = localStorage.getItem("user");
//     // console.log("Raw storedUser:", storedUser); // Debugging

//     if (storedUser) {
//       try {
//         const parsedUser = JSON.parse(storedUser);
//         // console.log("Parsed user object:", parsedUser); // Debugging

//         if (parsedUser && parsedUser.name) {
//           setLoggedInUser(parsedUser.name);
//         }
//       } catch (error) {
//         console.error("Error parsing user from localStorage:", error);
//       }
//     }

//     // Fetch deals
//     const fetchDeals = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/deals");
//         console.log("Fetched deals:", response.data); // Debugging

//         // Filter out deals posted by the logged-in user
//         const filteredDeals = response.data.filter(
//           (deal) => deal.userName !== loggedInUser
//         );
//         setDeals(filteredDeals);
//       } catch (error) {
//         console.error("Error fetching deals:", error);
//       }
//     };

//     fetchDeals();
//   }, []);

//   const handleContact = (userName) => {
//     // console.log("Contacting user:", userName);
//     // console.log("Logged-in user:", loggedInUser);
//     setChatUser(userName);
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
//                 <button
//                   className="contact-btn"
//                   onClick={() => handleContact(deal.userName)}
//                 >
//                   Contact
//                 </button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {/* Debugging: Check values before passing to Chat */}
//       <p>chatUser: {chatUser || "Not Set"}</p>
//       <p>loggedInUser: {loggedInUser || "Not Set"}</p>

//       {chatUser && loggedInUser ? (
//         <Chat selectedUser={chatUser} currentUser={loggedInUser} />
//       ) : (
//         <p>Select a user to start a chat</p>
//       )}
//     </div>
//   );
// };

// export default Purchase;

import React, { useState, useEffect } from "react";
import axios from "axios";
import Chat from "./Chat";
import { FaEnvelope } from "react-icons/fa";

const Purchase = () => {
  const [deals, setDeals] = useState([]);
  const [chatUser, setChatUser] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState("");
  const [messageUsers, setMessageUsers] = useState([]);
  const [showMessageList, setShowMessageList] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        if (parsedUser && parsedUser.name) {
          setLoggedInUser(parsedUser.name);
        }
      } catch (error) {
        console.error("Error parsing user from localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/deals");
        const filteredDeals = response.data.filter(
          (deal) => deal.userName !== loggedInUser
        );
        setDeals(filteredDeals);
      } catch (error) {
        console.error("Error fetching deals:", error);
      }
    };

    if (loggedInUser) fetchDeals();
  }, [loggedInUser]);

  useEffect(() => {
    const fetchMessageUsers = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/messages/users/${loggedInUser}`);
        setMessageUsers(response.data); // Expecting an array of users with whom messages exist
      } catch (error) {
        console.error("Error fetching message users:", error);
      }
    };

    if (loggedInUser) fetchMessageUsers();
  }, [loggedInUser]);

  return (
    <div className="deals-container">
      <h2>Available Waste Deals</h2>

      {/* Messages Icon */}
      <div className="messages-icon" onClick={() => setShowMessageList(!showMessageList)}>
        <FaEnvelope size={24} />
        {messageUsers.length > 0 && <span className="message-count">{messageUsers.length}</span>}
      </div>

      {/* Message Users List */}
      {showMessageList && (
  <div className="message-list">
    <h3>Messages</h3>
    <ul>
      {messageUsers.map((user, index) => (
        <li key={user._id || index} onClick={() => setChatUser(user)}>
          {user}
        </li>
      ))}
    </ul>
  </div>
)}

      {/* Deals Table */}
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
                <button className="contact-btn" onClick={() => setChatUser(deal.userName)}>
                  Contact
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Chat Component */}
      {chatUser && loggedInUser ? (
        <Chat selectedUser={chatUser} currentUser={loggedInUser} />
      ) : (
        <p>Select a user to start a chat</p>
      )}
    </div>
  );
};

export default Purchase;
