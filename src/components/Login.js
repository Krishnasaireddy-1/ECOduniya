
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import '../styles.css';

// const API_URL = "http://localhost:5000/api/auth"; // Fixed localhost URL

// const Login = () => {
//   const [isRegistering, setIsRegistering] = useState(false);
//   const [formData, setFormData] = useState({
//     name: "",
//     phoneNo: "",
//     email: "",
//     password: "",
//     role: ""
//   });
//   const navigate = useNavigate();

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user) redirectToDashboard(user.role);
//   }, [navigate]);

//   const redirectToDashboard = (role) => {
//     console.log(role);
//     if (role === "business") navigate("/business/home");
//     else if (role === "user") navigate("/user/home");
//     else navigate("/login");
//   };

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleRegister = async () => {
//     const { name, phoneNo, email, password, role } = formData;
//     if (!name || !phoneNo || !email || !password || !role) {
//       alert("Please fill all fields.");
//       return;
//     }
//     try {
//       const response = await axios.post(`${API_URL}/register`, formData);
//       if (response.status === 201) {
//         alert("Registration successful! Please login.");
//         setIsRegistering(false);
//       }
//     } catch (error) {
//       alert(error.response?.data?.message || "Registration failed. Try again.");
//     }
//   };

//   const handleLogin = async () => {
//     const { email, password, role } = formData;
//     if (!email || !password || !role) {
//       alert("Please enter email, password, and select a role.");
//       return;
//     }
//     try {
//       const response = await axios.post(`${API_URL}/login`, { email, password, role });
//       if (response.status === 200) {
//         localStorage.setItem("user", JSON.stringify(response.data.user));
//         alert("Login successful!");
//         console.log(response.data.user);
//         redirectToDashboard(response.data.user.role);
//       }
//     } catch (error) {
//       alert("Invalid credentials.");
//     }
//   };

//   return (
//     <div className="login-container">
//       <div className="login-box">
//         <h2>{isRegistering ? "Create an Account" : "Login"}</h2>
        
//         {isRegistering ? (
//           <>
//             <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
//             <input type="tel" name="phoneNo" placeholder="Phone Number" value={formData.phoneNo} onChange={handleChange} />
//           </>
//         ) : null}

//         <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
//         <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />

//         <select name="role" value={formData.role} onChange={handleChange}>
//           <option value="">-- Select Role --</option>
//           <option value="business">Business</option>
//           <option value="user">User</option>
//         </select>

//         {isRegistering ? (
//           <button onClick={handleRegister}>Register</button>
//         ) : (
//           <button onClick={handleLogin}>Login</button>
//         )}

//         <p>
//           {isRegistering ? (
//             <>
//               Already have an account? <span onClick={() => setIsRegistering(false)} className="toggle-link">Login here</span>
//             </>
//           ) : (
//             <>
//               Don't have an account? <span onClick={() => setIsRegistering(true)} className="toggle-link">Register here</span>
//             </>
//           )}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles.css";

const API_URL = "http://localhost:5000/api/auth";

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [showPaymentPopup, setShowPaymentPopup] = useState(false); // Toggle for payment step
  const [formData, setFormData] = useState({
    name: "",
    phoneNo: "",
    email: "",
    password: "",
    role: "",
  });

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) redirectToDashboard(user.role);
  }, [navigate]);

  const redirectToDashboard = (role) => {
    if (role === "business") navigate("/business/home");
    else if (role === "user") navigate("/user/home");
    else navigate("/login");
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    const { name, phoneNo, email, password, role } = formData;
    if (!name || !phoneNo || !email || !password || !role) {
      alert("Please fill all fields.");
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/register`, formData);
      if (response.status === 201) {
        alert("Registration successful!");

        if (role === "business") {
          setShowPaymentPopup(true); // Show payment confirmation popup
        } else {
          setIsRegistering(false);
        }
      }
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed. Try again.");
    }
  };

  const handlePaymentConfirm = () => {
    setShowPaymentPopup(false);
    navigate("/payment"); // Redirect to payment page
  };

  const handleLogin = async () => {
    const { email, password, role } = formData;
    if (!email || !password || !role) {
      alert("Please enter email, password, and select a role.");
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/login`, { email, password, role });
      if (response.status === 200) {
        localStorage.setItem("user", JSON.stringify(response.data.user));
        alert("Login successful!");
        redirectToDashboard(response.data.user.role);
      }
    } catch (error) {
      alert("Invalid credentials.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>{isRegistering ? "Create an Account" : "Login"}</h2>

        {isRegistering && (
          <>
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
            <input type="tel" name="phoneNo" placeholder="Phone Number" value={formData.phoneNo} onChange={handleChange} />
          </>
        )}

        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} />

        <select name="role" value={formData.role} onChange={handleChange}>
          <option value="">-- Select Role --</option>
          <option value="business">Business</option>
          <option value="user">User</option>
        </select>

        {isRegistering ? (
          <button onClick={handleRegister}>Register</button>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}

        <p>
          {isRegistering ? (
            <>
              Already have an account?{" "}
              <span onClick={() => setIsRegistering(false)} className="toggle-link">
                Login here
              </span>
            </>
          ) : (
            <>
              Don't have an account?{" "}
              <span onClick={() => setIsRegistering(true)} className="toggle-link">
                Register here
              </span>
            </>
          )}
        </p>
      </div>

      {/* Payment Confirmation Popup */}
      {showPaymentPopup && (
        <div className="payment-popup">
          <div className="popup-content">
            <h3>Payment Required</h3>
            <p>You need to complete a payment to activate your business account.</p>
            <button onClick={handlePaymentConfirm}>Proceed to Payment</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
