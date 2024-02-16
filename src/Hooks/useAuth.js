import { useState } from 'react';
import axios from 'axios';
import JWT from 'jsonwebtoken';
import { useNavigate } from 'react-router';

const useAuth = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  console.log(BASE_URL)
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // No longer manage loginState here; it will be managed by AuthProvider via context

  const login = async (username, password, setIsLoggedIn) => {
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
      const JWT_KEY = process.env.REACT_APP_JWT_KEY;
      const decodedResponse = JWT.decode(response.data.data.token, JWT_KEY);
      const loggedInUserRole = decodedResponse.role_id.role_name;
      console.log('Decoded----', decodedResponse);
      console.log('User Role', loggedInUserRole);
      console.log('Response data', response.data);
      if (response.data.status === true && loggedInUserRole === 'Admin') {
        // Set auth details in localStorage
        localStorage.setItem('isLoggedIn', 'true'); // Use to maintain session state
        localStorage.setItem('auth-token', response.data.data.token);
        localStorage.setItem('name', response.data.data.username);
        localStorage.setItem('id', response.data.data.userId);
        setIsLoggedIn(true); // Update global state via context
        return true;
      } // I'll add a check here when a user has multiple roles
      else {
        console.log('User not logged in');
        navigate('/unauthorized');
        return false;
      }
    } catch (error) {
      alert(error.message);
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
