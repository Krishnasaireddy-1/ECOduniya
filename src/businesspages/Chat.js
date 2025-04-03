
import React, { useEffect, useState } from "react";
import axios from "axios";
import { io } from "socket.io-client";
import "./chat.css"; // External CSS
const API_URL = "http://localhost:5000";
const socket = io(API_URL);

const Chat = ({ selectedUser, currentUser }) => {
  console.log("Chat User:", selectedUser);
  console.log("Logged In User:", currentUser);

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (selectedUser) {
      fetchMessages();
    }
  }, [selectedUser]);

  useEffect(() => {
    socket.emit("joinRoom", { sender: currentUser, receiver: selectedUser });

    socket.on("newMessage", (newMessage) => {
      console.log("Received new message:", newMessage);
      setMessages((prevMessages) => [...prevMessages, newMessage]);
      fetchMessages(); // Fetch messages again when a new message arrives
    });

    return () => {
      socket.off("newMessage");
    };
  }, [currentUser, selectedUser]);

  const fetchMessages = async () => {
    try {
      const response = await axios.get(`${API_URL}/api/messages/${currentUser}/${selectedUser}`);
      console.log("Fetched messages:", response.data);
      setMessages(response.data);
    } catch (error) {
      console.error("Error fetching messages:", error);
    }
  };

  const handleSendMessage = async () => {
    console.log("Sending:", currentUser, selectedUser, message);
    if (!message.trim()) return;

    try {
      const newMessage = {
        senderUsername: currentUser,
        receiverUsername: selectedUser,
        text: message,
      };

      await axios.post(`${API_URL}/api/messages/send`, newMessage);
      socket.emit("sendMessage", newMessage);

      setMessage("");
      fetchMessages(); // Fetch messages after sending a message
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">Chat with {selectedUser}</div>
      <div className="chat-box">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`message ${msg.senderUsername === currentUser ? "sent" : "received"}`}
          >
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { io } from "socket.io-client";

// const API_URL = "http://localhost:5000";
// const socket = io(API_URL);

// const Chat = ({ selectedUser, currentUser }) => {
//   console.log("Chat User:", selectedUser);
//   console.log("Logged In User:", currentUser);

//   const [messages, setMessages] = useState([]);
//   const [message, setMessage] = useState("");

//   useEffect(() => {
//     if (selectedUser) {
//       fetchMessages();
//     }
//   }, [selectedUser]);

//   useEffect(() => {
//     socket.emit("joinRoom", { sender: currentUser, receiver: selectedUser });

//     socket.on("newMessage", (newMessage) => {
//       console.log("Received new message:", newMessage);
//       setMessages((prevMessages) => [...prevMessages, newMessage]);
//       fetchMessages(); // Fetch messages again when a new message arrives
//     });

//     return () => {
//       socket.off("newMessage");
//     };
//   }, [currentUser, selectedUser]);

//   const fetchMessages = async () => {
//     try {
//       const response = await axios.get(`${API_URL}/api/messages/${currentUser}/${selectedUser}`);
//       console.log("Fetched messages:", response.data);
//       setMessages(response.data);
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//     }
//   };

//   const handleSendMessage = async () => {
//     console.log("Sending:", currentUser, selectedUser, message);
//     if (!message.trim()) return;

//     try {
//       const newMessage = {
//         senderUsername: currentUser,
//         receiverUsername: selectedUser,
//         text: message,
//       };

//       await axios.post(`${API_URL}/api/messages/send`, newMessage);
//       socket.emit("sendMessage", newMessage);

//       setMessage("");
//       fetchMessages(); // Fetch messages after sending a message
//     } catch (error) {
//       console.error("Error sending message:", error);
//     }
//   };

//   return (
//     <div style={{
//       width: "100%",
//       maxWidth: "500px",
//       margin: "auto",
//       border: "1px solid #ddd",
//       borderRadius: "10px",
//       overflow: "hidden",
//       display: "flex",
//       flexDirection: "column",
//       backgroundColor: "#fff"
//     }}>
//       <div style={{
//         backgroundColor: "#007bff",
//         color: "white",
//         padding: "10px",
//         textAlign: "center",
//         fontWeight: "bold"
//       }}>
//         Chat with {selectedUser}
//       </div>
      
//       <div style={{
//         flexGrow: 1,
//         padding: "10px",
//         overflowY: "auto",
//         maxHeight: "300px",
//         display: "flex",
//         flexDirection: "column"
//       }}>
//         {messages.map((msg, index) => (
//           <div
//             key={index}
//             style={{
//               maxWidth: "70%",
//               padding: "10px",
//               margin: "5px",
//               borderRadius: "10px",
//               wordWrap: "break-word",
//               display: "inline-block",
//               alignSelf: msg.senderUsername === currentUser ? "flex-end" : "flex-start",
//               backgroundColor: msg.senderUsername === currentUser ? "#007bff" : "#f1f1f1",
//               color: msg.senderUsername === currentUser ? "white" : "black",
//               textAlign: msg.senderUsername === currentUser ? "right" : "left",
//               borderRadius: msg.senderUsername === currentUser ? "10px 10px 0 10px" : "10px 10px 10px 0"
//             }}
//           >
//             {msg.text}
//           </div>
//         ))}
//       </div>

//       <div style={{
//         display: "flex",
//         padding: "10px",
//         borderTop: "1px solid #ddd",
//         background: "#fff"
//       }}>
//         <input
//           type="text"
//           value={message}
//           onChange={(e) => setMessage(e.target.value)}
//           placeholder="Type a message..."
//           style={{
//             flex: 1,
//             padding: "8px",
//             border: "1px solid #ccc",
//             borderRadius: "5px",
//             outline: "none"
//           }}
//         />
//         <button 
//           onClick={handleSendMessage}
//           style={{
//             marginLeft: "10px",
//             padding: "8px 12px",
//             border: "none",
//             backgroundColor: "#007bff",
//             color: "white",
//             borderRadius: "5px",
//             cursor: "pointer"
//           }}
//         >
//           Send
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Chat;
