import { useState } from "react";
import "./SideNav.scss";
import { NavLink } from "react-router-dom";
import sideBarItems from "../../constants/SideBar";
import Nav from "../Nav/Nav";
import { useTranslation } from "react-i18next";

// eslint-disable-next-line react/prop-types
const SideNav = ({ children, handleLogout }) => {
  const [selectedItem, setSelectedItem] = useState("");
  const {t} = useTranslation()

  const handleItemClick = (name) => {
    setSelectedItem(name);
  };

  return (
    <div className='admin-container'>

      <Nav handleLogout={handleLogout}  logo={logo} username={`${userName.charAt(0).toUpperCase()}${userName.slice(1)}`}></Nav>

      <nav className='nav'>
      
      <div className="tab-menu">
        {sideBarItems.map((items, index)=>(
            <NavLink to = {items.link} key = {index} className={`tab-icons ${selectedItem === items.name ? 'selected' : ''}`} onClick={() => {handleItemClick(items.name)}}>
              <items.icon></items.icon>
              <p>{t(`${items.name}`)}</p>
            </NavLink>
          ))}
        </div>
        <main>{children}</main>
      </nav>
    </div>
  );
};

export default SideNav;