// Layout.jsx
import React from 'react';
import SideNav from './SideNav/SideNav';
import Nav from './Nav/Nav';
import './Layout.scss'
const Layout = ({children}) => {
  return (
    <div className='layout-main'>
      
      <div className='layout-details'> 
        <div className='side-details'><SideNav></SideNav></div>
        
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
