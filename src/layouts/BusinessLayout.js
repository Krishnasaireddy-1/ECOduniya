import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

const BusinessLayout = () => {
  return (
    <div className="layout">
      <Sidebar userType="business" />
      <div className="content">
        <Outlet />
      </div>
    </div>
  );
};

export default BusinessLayout;
