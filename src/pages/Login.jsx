import { useState } from 'react';
import '../styles/Login.scss';
import useAuth from '../Hooks/useAuth';
const Login = () => {
  const [username, setUserName] = useState()
  const [password, setPassword] = useState()
  const { login, loginStatus } = useAuth()

  const handleLogin = async (e) => {
    e.preventDefault()
    login(username, password)
  }
  return (
    <>
      <div className="language-selector">
        <label htmlFor="languageSelect" className="text">Select language:</label>
        <select id="languageSelect">
          <option value="english">English</option>
          <option value="spanish">Spanish</option>
          <option value="chinese">Chinese</option>
        </select>
      </div>
      <div className="bg-color">
        <span className="centerbox">
          <div className="loginbox-bg">
            <form>
              <label className="form-label" htmlFor="username">Username:</label>
              <input type="text" id="username" name="username" onChange={(e) => { setUserName(e.target.value) }} required />

              <label className="form-label" htmlFor="password">Password:</label>
              <input type="password" id="password" name="password" onChange={(e) => { setPassword(e.target.value) }} required />

              <button className="loginbtn" type="submit" onClick={(e) => { handleLogin(e) }}>Login</button>
              {" "}
              {loginStatus}
              <div className="forgotandcreate">
                <span className="forgot-pas"><a href="#">Forgot password?</a></span>
              </div>
            </form>
          </div>
        </span>
      </div>
    </>

  );
};

export default Login;