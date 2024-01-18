import { IoMdNotificationsOutline } from 'react-icons/io';
import { CgLogOut, CgProfile } from 'react-icons/cg';
import { FaAngleDown } from 'react-icons/fa';


// eslint-disable-next-line react/prop-types
const Nav = ({ logo, username, handleLogout }) => {
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
        {/* <CgLogOut className='logout' onClick={() => {
          logout()
          alert("You have been logged out")
          navigate('/')
        }}/> */}
        <CgLogOut className='logout' onClick={handleLogout}/>
      </div>
    </div>
  );
};

export default Nav;