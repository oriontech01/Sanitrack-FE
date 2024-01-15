import {useState} from 'react';
import '../styles/Login.scss';
import { IoIosArrowDown } from "react-icons/io";
const Login = () => {
    return (
        <div className="bg-color">
          <div className="language-selector">
            <span className="text">Select language</span>
            <IoIosArrowDown/>
          </div>
          <div className="lang-list-container">
            <div className="lang-list-box">
              <p>English</p>
              <p>Spanish</p>
              <p>Chinese</p>
            </div>
          </div>
    
          <span className="centerbox">
            <div className="loginbox-bg">
              <form action="./work_order_selection.html" method="post">
                <label className="form-label" htmlFor="username">Username:</label>
                <input type="text" id="username" name="username" required />
    
                <label className="form-label" htmlFor="password">Password:</label>
                <input type="password" id="password" name="password" required />
    
                <button className="loginbtn" type="submit">Login</button>
                <div className="forgotandcreate">
                  <span className="forgot-pas"><a href="#">Forgot password?</a></span>
                  <span className="create-acc"><a href="#">Create an account</a></span>
                </div>
              </form>
            </div>
          </span>
        </div>
      );
};

export default Login;