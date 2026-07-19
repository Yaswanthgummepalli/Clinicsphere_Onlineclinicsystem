import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header'; 
import './Header.css'; 

function HeaderLayout() {
  return (
    
    <div className="main-page-wrapper">
      <Header /> 
      <main> 
        <Outlet />
      </main>
    </div>
  );
}

export default HeaderLayout;