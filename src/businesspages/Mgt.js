// import React, { useState } from "react";
// import axios from "axios"; // For making API requests
// import "../styles.css";

// const Mgt = () => {
//   const [selectedImage, setSelectedImage] = useState(null);
//   const [prediction, setPrediction] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // Handle file input change
//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setSelectedImage(file);
//     }
//   };

//   // Handle form submission and image prediction
//   const handleImageUpload = async () => {
//     if (!selectedImage) return;

//     setLoading(true); // Show loading indicator

//     const formData = new FormData();
//     formData.append("image", selectedImage);

//     try {
//       // Replace with your model prediction API endpoint
//       const response = await axios.post("/api/predict", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       setPrediction(response.data.prediction); // Assume response contains prediction
//     } catch (error) {
//       console.error("Error uploading image:", error);
//       setPrediction("Error predicting waste type.");
//     }

//     setLoading(false); // Hide loading indicator
//   };

//   return (
//     <div className="mgt-container">
//       <h2>Waste Type Prediction</h2>

//       <div className="upload-section">
//         <input
//           type="file"
//           accept="image/*"
//           onChange={handleImageChange}
//           className="image-upload"
//         />
//         <button onClick={handleImageUpload} className="upload-btn">
//           {loading ? "Predicting..." : "Upload & Predict"}
//         </button>
//       </div>

//       {prediction && (
//         <div className="prediction-result">
//           <h3>Prediction Result:</h3>
//           <p>{prediction}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Mgt;
import React, { useEffect, useState } from "react";
import axios from "axios";
import "../styles.css";

const Mgt = () => {
  const [status, setStatus] = useState("Starting camera...");
  
  useEffect(() => {
    // Call backend to start the Python script on page load
    axios.get("http://localhost:5000/start-camera")
      .then((response) => setStatus(response.data.message))
      .catch((error) => setStatus("Error starting camera"));
  }, []);

  return (
    <div className="mgt-container">
      <h2>Waste Classification</h2>
      <p>{status}</p>
      <p>Check the camera window for classification results.</p>
    </div>
  );
};

export default Mgt;
