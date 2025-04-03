// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import "../styles.css";
// import "./complaints.css"
// const Complaints = () => {
//   const [complaints, setComplaints] = useState([]);
//   const [message, setMessage] = useState("");

//   // Fetch complaints from backend
//   useEffect(() => {
//     const fetchComplaints = async () => {
//       try {
//         const response = await axios.get("http://localhost:5000/api/complaints");
//         setComplaints(response.data);
//       } catch (error) {
//         console.error("Error fetching complaints:", error);
//         setMessage("Failed to load complaints.");
//       }
//     };
//     fetchComplaints();
//   }, []);

//   // Handle accept or reject action for a complaint
//   const handleAction = async (id, action) => {
//     try {
//       if (action === "Accepted") {
//         await axios.delete(`http://localhost:5000/api/complaints/${id}`);
//         setComplaints(complaints.filter((complaint) => complaint._id !== id));
//       } else {
//         await axios.put(`http://localhost:5000/api/complaints/${id}`, { status: action });
//         setComplaints((prevComplaints) =>
//           prevComplaints.map((complaint) =>
//             complaint._id === id ? { ...complaint, status: action } : complaint
//           )
//         );
//       }
//       setMessage(`Complaint ${id} marked as ${action}`);
//     } catch (error) {
//       console.error("Error updating complaint status:", error);
//       setMessage("Failed to update complaint status.");
//     }
//   };

//   return (
//     <div className="complaints-container">
//       <h2>Complaints and Requests</h2>

//       {message && <p className="message">{message}</p>}

//       <div className="complaints-list">
//         <h3>Pending Complaints</h3>
//         <div className="complaints-cards">
//           {complaints.length > 0 ? (
//             complaints.map((complaint) => (
//               <div className="complaint-card" key={complaint._id}>
//                 <h4>{complaint.title}</h4>
//                 <p><strong>Description:</strong> {complaint.description}</p>
//                 <p><strong>Location:</strong> {complaint.location}</p>
//                 <p><strong>Status:</strong> {complaint.status}</p>
//                 {complaint.image && <img src={`http://localhost:5000/${complaint.image}`} alt="Complaint" className="complaint-image" />}
//                 <div className="complaint-actions">
//                   {complaint.status === "Pending" ? (
//                     <>
//                       <button className="accept-btn" onClick={() => handleAction(complaint._id, "Accepted")}>
//                         Accept
//                       </button>
//                       <button className="reject-btn" onClick={() => handleAction(complaint._id, "Rejected")}>
//                         Reject
//                       </button>
//                     </>
//                   ) : (
//                     <span>{complaint.status === "Accepted" ? "Deal Accepted" : "Deal Rejected"}</span>
//                   )}
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p>No complaints found.</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Complaints;
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles.css";
import "./complaints.css";

const Complaints = () => {
  const [complaints, setComplaints] = useState([]);
  const [message, setMessage] = useState("");

  // Fetch complaints from backend
  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/complaints");
        setComplaints(response.data);
      } catch (error) {
        console.error("Error fetching complaints:", error);
        setMessage("Failed to load complaints.");
      }
    };
    fetchComplaints();
  }, []);

  // Handle accept action for a complaint (removes complaint & rewards user)
  const handleAccept = async (id, userId) => {
    try {
      await axios.delete(`http://localhost:5000/api/complaints/${id}`);
      setComplaints(complaints.filter((complaint) => complaint._id !== id));
      setMessage(`Complaint ${id} accepted! User rewarded with +50 points.`);
    } catch (error) {
      console.error("Error accepting complaint:", error);
      setMessage("Failed to accept complaint.");
    }
  };

  return (
    <div className="complaints-container">
      <h2>Complaints and Requests</h2>

      {message && <p className="message">{message}</p>}

      <div className="complaints-list">
        <h3>Pending Complaints</h3>
        <div className="complaints-cards">
          {complaints.length > 0 ? (
            complaints.map((complaint) => (
              <div className="complaint-card" key={complaint._id}>
                <h4>{complaint.title}</h4>
                <p><strong>By:</strong> {complaint.user?.name || "Unknown"}</p>
                <p><strong>Description:</strong> {complaint.description}</p>
                <p><strong>Location:</strong> {complaint.location}</p>
                <p><strong>Status:</strong> {complaint.status}</p>
                {complaint.image && <img src={`http://localhost:5000/${complaint.image}`} alt="Complaint" className="complaint-image" />}
                <div className="complaint-actions">
                  {complaint.status === "Pending" ? (
                    <button className="accept-btn" onClick={() => handleAccept(complaint._id, complaint.user?._id)}>
                      Accept & Reward
                    </button>
                  ) : (
                    <span>✅ Accepted & User Rewarded</span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p>No complaints found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Complaints;
