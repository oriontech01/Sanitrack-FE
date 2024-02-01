import { IoMdNotificationsOutline } from "react-icons/io";
import { CgLogOut, CgProfile } from "react-icons/cg";
import logo from "../../assets/imgs/msslogo.png";
import "./Nav.scss";
import LanguageDropDown from "../LanguageDropDown/languageDropDown";
import { Link } from "react-router-dom";
// eslint-disable-next-line react/prop-types
const Nav = ({ username, handleLogout }) => {
  const capitalizeText = (text) => text.charAt(0).toUpperCase() + text.slice(1);
  return (
    <div className="header-section">
      <div className="second_section">
        <img src={logo} alt="Logo" />
        <div className="nav_elements">
          <p className="username">{capitalizeText(username)}</p>
          <IoMdNotificationsOutline className="not-icon" />
          <div className="user_lang_dropdown">
            <Link to="/admin-home/profile">
              <CgProfile className="profile-icon" />
            </Link>
            <LanguageDropDown></LanguageDropDown>
          </div>
          <CgLogOut className="logout" onClick={handleLogout} />
        </div>
      </div>
    </div>
  );
};

export default Nav;