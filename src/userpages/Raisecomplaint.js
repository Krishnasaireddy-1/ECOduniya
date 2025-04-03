// import React, { useState } from "react";
// import axios from "axios";
// import "../styles.css";

// const Raisecomplaint = () => {
//   const [formData, setFormData] = useState({
//     title: "",
//     description: "",
//     location: "",
//     image: null,
//   });

//   const [message, setMessage] = useState("");
//   const [loading, setLoading] = useState(false);

//   // Handle input changes
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });
//   };

//   // Handle file selection
//   const handleFileChange = (e) => {
//     setFormData({ ...formData, image: e.target.files[0] });
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
  
//     const data = new FormData();
//     data.append("title", formData.title);
//     data.append("description", formData.description);
//     data.append("location", formData.location);
//     if (formData.image) data.append("image", formData.image);
  
//     try {
//       const response = await axios.post("http://localhost:5000/api/complaints", data, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
  
//       setMessage("Complaint submitted successfully!");
//       setFormData({ title: "", description: "", location: "", image: null });
//     } catch (error) {
//       console.error("Error:", error.response ? error.response.data : error);
//       setMessage("Error submitting complaint. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };
  

//   return (
//     <div className="complaint-container">
//       <h2>Raise a Complaint</h2>
//       {message && <p className="message">{message}</p>}
//       <form onSubmit={handleSubmit}>
//         <label>Title</label>
//         <input type="text" name="title" value={formData.title} onChange={handleChange} required />

//         <label>Description</label>
//         <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>

//         <label>Location</label>
//         <input type="text" name="location" value={formData.location} onChange={handleChange} required />

//         <label>Upload Image</label>
//         <input type="file" accept="image/*" onChange={handleFileChange} />

//         <button type="submit" disabled={loading}>
//           {loading ? "Submitting..." : "Submit Complaint"}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Raisecomplaint;
import React, { useState } from "react";
import axios from "axios";
import "../styles.css";

const Raisecomplaint = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    image: null,
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Handle file selection
  const handleFileChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Get username from local storage
    const username = JSON.parse(localStorage.getItem("user")); // Convert string → object
    console.log(username.name); // ✅ Access name correctly
    
    if (!username) {
      setMessage("User not logged in. Please login first.");
      setLoading(false);
      return;
    }

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("location", formData.location);
    data.append("username", username.name); // ✅ Send username from localStorage
    if (formData.image) data.append("image", formData.image);

    try {
      // console.log(JSON.stringify(username).name);
      const response = await axios.post("http://localhost:5000/api/complaints", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Complaint submitted successfully!");
      setFormData({ title: "", description: "", location: "", image: null });
    } catch (error) {
      console.error("Error:", error.response ? error.response.data : error);
      setMessage("Error submitting complaint. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="complaint-container">
      <h2>Raise a Complaint</h2>
      {message && <p className="message">{message}</p>}
      <form onSubmit={handleSubmit}>
        <label>Title</label>
        <input type="text" name="title" value={formData.title} onChange={handleChange} required />

        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} required></textarea>

        <label>Location</label>
        <input type="text" name="location" value={formData.location} onChange={handleChange} required />

        <label>Upload Image</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Complaint"}
        </button>
      </form>
    </div>
  );
};

export default Raisecomplaint;

