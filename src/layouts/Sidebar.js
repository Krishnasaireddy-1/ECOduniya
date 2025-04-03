import { NavLink } from "react-router-dom";
import "../styles.css";

const Sidebar = ({ userType }) => {
  return (
    <div className="side-div">
      {userType === "user" ? (
        <>
          <div className="items">
            <NavLink
              to="/user/home"
              className={({ isActive }) =>
                `anchor ${isActive ? "text-yellow-300 font-bold underline" : "text-white hover:text-yellow-300"}`
              }
            >
              Home
            </NavLink>
          </div>
          <div className="items">
            <NavLink
              to="/user/raise-complaint"
              className={({ isActive }) =>
                `anchor ${isActive ? "text-yellow-300 font-bold underline" : "text-white hover:text-yellow-300"}`
              }
            >
              Raise Complaint
            </NavLink>
          </div>
          <div className="items">
            <NavLink
              to="/user/trade-waste"
              className={({ isActive }) =>
                `anchor ${isActive ? "text-yellow-300 font-bold underline" : "text-white hover:text-yellow-300"}`
              }
            >
              Trade waste
            </NavLink>
          </div>
          <div className="items">
            <NavLink
              to="/user/profile"
              className={({ isActive }) =>
                `anchor ${isActive ? "text-yellow-300 font-bold underline" : "text-white hover:text-yellow-300"}`
              }
            >
              Profile
            </NavLink>
          </div>
        </>
      ) : (
        <>
          <div className="items">
            <NavLink
              to="/business/home"
              className={({ isActive }) =>
                `anchor ${isActive ? "text-yellow-300 font-bold underline" : "text-white hover:text-yellow-300"}`
              }
            >
              Home
            </NavLink>
          </div>
          <div className="items">
            <NavLink
              to="/business/wastemgt"
              className={({ isActive }) =>
                `anchor ${isActive ? "text-yellow-300 font-bold underline" : "text-white hover:text-yellow-300"}`
              }
            >
              Waste Management
            </NavLink>
          </div>
          <div className="items">
            <NavLink
              to="/business/deals"
              className={({ isActive }) =>
                `anchor ${isActive ? "text-yellow-300 font-bold underline" : "text-white hover:text-yellow-300"}`
              }
            >
              Deals
            </NavLink>
          </div>
          <div className="items">
            <NavLink
              to="/business/complaints"
              className={({ isActive }) =>
                `anchor ${isActive ? "text-yellow-300 font-bold underline" : "text-white hover:text-yellow-300"}`
              }
            >
              Complaints
            </NavLink>
          </div>
          <div className="items">
            <NavLink
              to="/business/purchase"
              className={({ isActive }) =>
                `anchor ${isActive ? "text-yellow-300 font-bold underline" : "text-white hover:text-yellow-300"}`
              }
            >
              Purchase
            </NavLink>
          </div>
          <div className="items">
            <NavLink
              to="/business/profile"
              className={({ isActive }) =>
                `anchor ${isActive ? "text-yellow-300 font-bold underline" : "text-white hover:text-yellow-300"}`
              }
            >
              Profile
            </NavLink>
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
