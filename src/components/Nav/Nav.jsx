import { IoMdNotificationsOutline } from "react-icons/io";
import { CgLogOut, CgProfile } from "react-icons/cg";
import { FaAngleDown } from "react-icons/fa";
import logo from "../../assets/imgs/msslogo.png";
import "./Nav.scss"
// eslint-disable-next-line react/prop-types
const Nav = ({ username, handleLogout }) => {
  return (
    <div className="header-section">
      <div className="second_section">
        <img src={logo} alt="Logo" />
        <div className="nav_elements">
          <p className="username">{username}</p>
          <IoMdNotificationsOutline className="not-icon" />
          <div>
            <CgProfile className="profile-icon" />
            <FaAngleDown className="arrow-img" />
          </div>
          <CgLogOut className="logout" onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
};

export default Nav;