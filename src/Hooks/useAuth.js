import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useAuth = () => { 
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const [loginStatus, setLoginStatus] = useState()
    const navigate = useNavigate()

    const login = async (username, password) => { 
        await axios
        .post(`${BASE_URL}login`, {
          username: username,
          password: password,
        })
        .then((response) => {
            // save the token if credentials are correct
            if(response.status){ 
                console.log(response.data) 
                localStorage.setItem("auth-token", response.data.data.token);
                localStorage.setItem("name", response.data.data.username);
                localStorage.setItem("role", response.data.data.role); 
                localStorage.setItem('id', response.data.data.id)
                navigate("/admin-home")
            }
        })
        .catch((error) => {
            if (error.response) {
                const { status, data } = error.response;
                if (status === 400 && data && data.message) {
                    setLoginStatus(data.message)
                } else {
                  console.log('Axios error:', error);
                }
            } else {
                console.log('Network error:', error.message);
              }
        });
        
    }

    return{ 
        login, 
        loginStatus
    }
}

export default useAuth