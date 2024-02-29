import { useState } from 'react';
import axios from 'axios';
import JWT from 'jsonwebtoken';
import { useNavigate } from 'react-router';
import { useCurrentRole } from 'context/UserRoleContext';
import { useAuthRolesState } from 'context/AuthRolesContext';
import { toast, Flip } from "react-toastify";

const useAuth = () => {
  const { setModal, setToken, setId, setRoles } = useAuthRolesState();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  console.log(BASE_URL);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { currentRole, setCurrentRole } = useCurrentRole();
  // No longer manage loginState here; it will be managed by AuthProvider via context

  const login = async (username, password, setIsLoggedIn) => {
    console.log('first');
    // Add setIsLoggedIn as parameter
    setIsLoading(true);
    try {
      const response = await axios.post(
        `${BASE_URL}login`,
        {
          username,
          password
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Accept-Language': localStorage.getItem('i18nextLng')
          }
        }
      );

      if (response?.data?.data?.requiredRoleSelection === true) {
        console.log('first one');
        toast.success("Complete your login", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Flip,
        });
        localStorage.setItem('assignedRoles', response?.data?.data?.assignedRoles);
        setRoles(response?.data?.data?.assignedRoles);
        localStorage.setItem('modal', 'modal');
        console.log('its working');
        setModal(true);
        setToken(response?.data?.data?.token);
        setId(response?.data?.data?.userId);
      }
      // console.log('Resty', response?.data);
      // if (response?.data?.data?.requiredRoleSelection === false) {
      //   console.log('first hiiii');
      //   console.log('hety', response?.data?.data?.requiredRoleSelection);
      // }

      // console.log('Decoded----', decodedResponse);
      // console.log('User Role', loggedInUserRole);
      // console.log('Response data', response.data);
      // console.log('My role buddy', currentRole);
      else if (response?.data?.data?.requiredRoleSelection === false) {
        toast.success("Login Successful !!!", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: true,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
          transition: Flip,
        });

        const JWT_KEY = process.env.REACT_APP_JWT_KEY;
        const decodedResponse = JWT.decode(response?.data?.data?.token, JWT_KEY);
        const loggedInUserRole = decodedResponse.role_id.role_name;
       
        // setCurrentRole(loggedInUserRole);
        console.log("rl",loggedInUserRole)
        // Set auth details in localStorage
        localStorage.setItem('isLoggedIn', 'true'); // Use to maintain session state
        localStorage.setItem('auth-token', response?.data?.data?.token);
        localStorage.setItem('name', response?.data?.data?.username);
        localStorage.setItem('id', response?.data?.data?.userId);
        localStorage.setItem('role', loggedInUserRole);
        setIsLoggedIn(true); // Update global state via context
      } // I'll add a check here when a user has multiple roles

      // else {
      //   console.log('User not logged in');
      //   navigate('/unauthorized');
      //   return false;
      // }
    } catch (error) {
      // alert(error.message);
      toast.error(error?.response?.data?.message, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
        transition: Flip,
      });
      console.log('Error', error);
    } finally {
      setIsLoading(false);
    }
  };

  // Simplify logout function for clarity
  const logout = setIsLoggedIn => {
    // Add setIsLoggedIn as parameter
    localStorage.clear(); // Clears all localStorage, adjust as needed
    setIsLoggedIn(false); // Update global state via context
  };

  return { login, logout, isLoading };
};

export default useAuth;
