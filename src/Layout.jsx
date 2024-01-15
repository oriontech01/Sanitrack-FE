// Layout.jsx
import React from 'react';
import SideNav from './components/SideNav/SideNav';
import logo from "../assets/imgs/mss sweep logo 1.png";

const Layout = ({ children }) => {
  return (
    <div>
      <div>
        <header>
           <Nav logo={logo}/>
        </header>
      </div>
      <div style={{ display: 'flex' }}>
         <SideNav/>
        <main>{children}</main>
      </div>
    </div>
  );
};

export default Layout;
