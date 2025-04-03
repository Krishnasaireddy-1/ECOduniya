import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import UserLayout from "./layouts/UserLayout";
import BusinessLayout from "./layouts/BusinessLayout";
import Tradeoff from "./userpages/Tradeoff";
import Home from "./businesspages/Home";
import Complaints from "./businesspages/Complaints";
import Deals from "./businesspages/Deals";
import Payment from "./businesspages/Payment";
// import Deals from "./businesspages/deals";
import Mgt from "./businesspages/Mgt";
import Purchase from "./businesspages/Purchase";
import Profile from "./businesspages/Profile";
import Raisecomplaint from "./userpages/Raisecomplaint";
import Userprofile from "./userpages/Userprofile";
import Userhome from "./userpages/Userhome";
import Chat from "./businesspages/Chat";
// import Purchase from "./businesspages/Purchase";
// import ReportWaste from "./userpages/ReportWaste";

// import TradeWaste from "./pages/TradeWaste";
// import Profile from "./pages/Profile";
// import Complaints from "./pages/Complaints";
import PrivateRoute from "./components/PrivateRoute";

// Function to get the user's role from local storage
const getUserRole = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user ? user.role : null;
};

function App() {
  const role = getUserRole();

  return (
    // <BrowserRouter>
      <Routes>
        {/* Redirect to login if no user is found */}
        {!role && <Route path="*" element={<Navigate to="/login" replace />} />}

        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Role-Based Redirection */}
        {role === "user" && <Route path="*" element={<Navigate to="/user/home" replace />} />}
        {role === "business" && <Route path="*" element={<Navigate to="/business/home" replace />} />}

        {/* User Routes */}
        <Route
          path="/user/*"
          element={<PrivateRoute element={<UserLayout />} allowedRoles={["user"]} />}
        >
          <Route path="home" element={<Userhome />} />
          <Route path="raise-complaint" element={<Raisecomplaint />} />
          <Route path="trade-waste" element={<Tradeoff />} />
          <Route path="profile" element={<Userprofile />} />
        </Route>

        {/* Business Routes */}
        <Route
          path="/business/*"
          element={<PrivateRoute element={<BusinessLayout />} allowedRoles={["business"]} />}
        >
          <Route path="home" element={<Home />} />
          <Route path="payment" element={<Payment />} />

          <Route path="wastemgt" element={<Mgt />} />
          <Route path="deals" element={<Deals />} />
          <Route path="complaints" element={<Complaints />} />
          {/* <Route path="chat" element={<Chat />} /> */}

          <Route path="purchase" element={<Purchase />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    // </BrowserRouter>
  );
}

export default App;
