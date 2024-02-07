import  { useState } from "react";
import axios from "axios";

const useAuth = () => {
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    // const [loginStatus, setLoginStatus] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // No longer manage loginState here; it will be managed by AuthProvider via context

    const login = async (username, password, setIsLoggedIn) => { // Add setIsLoggedIn as parameter
        setIsLoading(true);
        try {
            const response = await axios.post(`${BASE_URL}login`, {
                username,
                password,
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            console.log(response.data)

            if (response.data.status === true) {
                // Set auth details in localStorage
                localStorage.setItem('isLoggedIn', 'true'); // Use to maintain session state
                localStorage.setItem("auth-token", response.data.data.token);
                localStorage.setItem("name", response.data.data.username);
                localStorage.setItem('id', response.data.data.userId)
                setIsLoggedIn(true); // Update global state via context
            }
        } catch (error) {
            alert(error.message)
        } finally {
            setIsLoading(false);
        }
    };

    // Simplify logout function for clarity
    const logout = (setIsLoggedIn) => { // Add setIsLoggedIn as parameter
        localStorage.clear(); // Clears all localStorage, adjust as needed
        setIsLoggedIn(false); // Update global state via context
    };

    return { login, logout,  isLoading };
};

export default useAuth