import { useState, useEffect } from 'react';
import '../styles/Login.scss';
import useAuth from '../Hooks/useAuth';
import logo from '../assets/imgs/msslogo.png'
import { useNavigate } from 'react-router-dom';
import LanguageDropDown from '../components/LanguageDropDown/languageDropDown';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line react/prop-types
const Login = ({ onLogin }) => {
  const {t} = useTranslation()

  const [username, setUserName] = useState()
  const [password, setPassword] = useState()
  const { login, loginStatus, loginState } = useAuth()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    await login(username, password)
  }
  useEffect(() => {
    console.log("After setting loginState:", loginState);
    if (loginState) {
      onLogin()
      localStorage.setItem('isLoggedIn', 'true');
      navigate("/admin-home");
    }
  }, [loginState, navigate, onLogin]);
  return (
    <>
    <LanguageDropDown></LanguageDropDown>
      <div className="bg-color">
        <span className="centerbox">
          <div className="loginbox-bg">
          <img src={logo} alt='Logo'/>
            <form>
              <h1>{t('Sign In Page')}</h1>
              {/* <h3>Enter your credentials to sign in</h3> */}

              <div className='inputContainer'>
              <label className="form-label" htmlFor="username">{t('Username')}</label>
              <input type="text" placeholder='John Doe' id="username" name="username" onChange={(e) => { setUserName(e.target.value) }} required />

              <label className="form-label" htmlFor="password">{t('Password')}</label>
              <input type="password" placeholder='*********' id="password" name="password" onChange={(e) => { setPassword(e.target.value) }} required />
              </div>
              <button className="loginbtn" type="submit" onClick={(e) => { handleLogin(e) }}>{t('Login')}</button>
              {" "}
              {loginStatus}
              <div className="forgotandcreate">
                {/* <span className="forgot-pas"><a href="#">Forgot password?</a></span> */}
              </div>
            </form>
          </div>
        </span>
      </div>
    </>

  );
};
export default Login;