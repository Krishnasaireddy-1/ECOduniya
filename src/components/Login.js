// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import '../styles.css';

// const API_URL = "http://www.localhost:5000/auth";

// const Login = () => {
//   const [isRegistering, setIsRegistering] = useState(false);
//   const [username, setUsername] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState("");
//   const [name, setName] = useState("");
//   const [phoneNo, setPhoneNo] = useState("");
//   const navigate = useNavigate();

//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user) {
//       redirectToDashboard(user.role);
//     }
//   }, [navigate]);

//   const redirectToDashboard = (role) => {
//     switch (role) {
//       case "business":
//         navigate("/business/home");
//         break;
//       case "user":
//         navigate("/user/home");
//         break;
//       default:
//         navigate("/login");
//     }
//   };

//   const handleRegister = async () => {
//     if (!name.trim() || !phoneNo.trim() || !username.trim() || !email.trim() || !password.trim() || !role.trim()) {
//       alert("Please fill all fields.");
//       return;
//     }
//     try {
//       const response = await axios.post(`${API_URL}/register`, { name, phoneNo, username, email, password, role });
//       if (response.status === 201) {
//         alert("Registration successful! Please login.");
//         setIsRegistering(false);
//       }
//     } catch (error) {
//       alert(error.response?.data?.message || "Registration failed. Try again.");
//     }
//   };

//   const handleLogin = async () => {
//     if (!username || !password || !role) {
//       alert("Please enter username, password, and select a role.");
//       return;
//     }
//     try {
//       const response = await axios.post(`${API_URL}/login`, { username, password, role });
//       if (response.status === 200) {
//         localStorage.setItem("user", JSON.stringify(response.data.user));
//         alert("Login successful!");
//         redirectToDashboard(response.data.user.role);
//       }
//     } catch (error) {
//       alert("Invalid username, password, or role.");
//     }
//   };

//   return (
//     <div className="flex h-screen items-center justify-center bg-gray-100 bg-cover bg-center" style={{ backgroundImage: "url('/loginback.jpg')" }}>
//       <div className="bg-white shadow-lg rounded-lg flex w-3/4 max-w-4xl">
        
//         {/* Left Section */}
//         <div className="w-1/2 bg-[#9BA4B5] text-white p-8 flex flex-col justify-center">
//           <h2 className="text-3xl font-bold mb-4">Welcome to Our Education Portal</h2>
//           <p className="text-lg">
//             Empower your learning experience with interactive tools and resources. 
//             Teachers can manage classes efficiently, and students can track their progress seamlessly.
//           </p>
//         </div>

//         {/* Right Section */}
//         <div className="w-1/2 p-8">
//           <h2 className="text-2xl font-bold text-gray-700 mb-6">{isRegistering ? "Create an Account" : "Login"}</h2>
          
//           {isRegistering ? (
//             <>
//               <input type="text" placeholder="Full Name" value={name} onChange={(e) => setName(e.target.value)} className="w-full border p-2 rounded mb-2" />
//               <input type="tel" placeholder="Phone Number" value={phoneNo} onChange={(e) => setPhoneNo(e.target.value)} className="w-full border p-2 rounded mb-2" />
//               <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full border p-2 rounded mb-2" />
//               <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full border p-2 rounded mb-2" />
//               <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-2 rounded mb-2" />
//               <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full border p-2 rounded mb-4">
//                 <option value="">-- Select Role --</option>
//                 <option value="business">Business</option>
//                 <option value="user">User</option>
//               </select>
//               <button onClick={handleRegister} className="w-full bg-[#9BA4B5] text-white py-2 rounded font-bold hover:bg-gray-700">Register</button>
//               <p className="text-gray-600 text-sm mt-4 text-center">Already have an account? <span onClick={() => setIsRegistering(false)} className="text-blue-500 cursor-pointer hover:underline">Login here</span></p>
//             </>
//           ) : (
//             <>
//               <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full border p-2 rounded mb-2">
//                 <option value="">-- Select Role --</option>
//                 <option value="business">Business</option>
//                 <option value="user">User</option>
//               </select>
//               <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} className="w-full border p-2 rounded mb-2" />
//               <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full border p-2 rounded mb-4" />
//               <div className="flex items-center justify-between">
//                 <label className="flex items-center text-gray-600">
//                   <input type="checkbox" className="mr-2" /> Remember me
//                 </label>
//                 <a href="#" className="text-blue-500">Forgot Password?</a>
//               </div>
//               <button onClick={handleLogin} className="w-full bg-[#9BA4B5] text-white py-2 rounded font-bold hover:bg-gray-700">Login</button>
//               <p className="text-gray-600 text-sm mt-4 text-center">Don't have an account? <span onClick={() => setIsRegistering(true)} className="text-blue-500 cursor-pointer hover:underline">Register here</span></p>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Login;
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import '../styles.css';

const API_URL = "http://localhost:5000/api/auth"; // Fixed localhost URL

const Login = () => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phoneNo: "",
    email: "",
    password: "",
    role: ""
  });
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) redirectToDashboard(user.role);
  }, [navigate]);

  const redirectToDashboard = (role) => {
    console.log(role);
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
        alert("Registration successful! Please login.");
        setIsRegistering(false);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed. Try again.");
    }
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
        console.log(response.data.user);
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
        
        {isRegistering ? (
          <>
            <input type="text" name="name" placeholder="Full Name" value={formData.name} onChange={handleChange} />
            <input type="tel" name="phoneNo" placeholder="Phone Number" value={formData.phoneNo} onChange={handleChange} />
          </>
        ) : null}

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
              Already have an account? <span onClick={() => setIsRegistering(false)} className="toggle-link">Login here</span>
            </>
          ) : (
            <>
              Don't have an account? <span onClick={() => setIsRegistering(true)} className="toggle-link">Register here</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default Login;
