import React from 'react';
import { IoMdNotificationsOutline } from 'react-icons/io';
import { CgProfile } from 'react-icons/cg';
import { FaAngleDown } from 'react-icons/fa';


const Nav = ({ logo, username }) => {
  return (
    <div className="header-section">
      <img src={logo} alt="logo" />
      <div className="second_section">
        <p className="username">{username}</p>
        <IoMdNotificationsOutline className="not-icon" />
        <div>
          <CgProfile className="profile-icon" />
          <FaAngleDown className="arrow-img" />
        </div>
      </div>
    </div>
  );
};

export default Nav;
