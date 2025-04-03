// import React from 'react';
// import { Outlet } from 'react-router-dom';
// import Sidebar from './Sidebar';
// // 
// const UserLayout = () => {
//   return (
//     <div>
//       <Sidebar userType="user" />
//       <div className="content">
//         <Outlet />
//       </div>
//     </div>
//   );
// };

// export default UserLayout;
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
// import './UserLayout.css'; // Import CSS
import '../styles.css'; // Import CSS

const UserLayout = () => {
  return (
    <div className="layout">
      <Sidebar userType="user" />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default UserLayout;

