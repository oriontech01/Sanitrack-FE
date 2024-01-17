import axios from "axios";
import { useState } from "react";


const useAuth = () => { 
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const LOCAL_URL = import.meta.env.VITE_LOCAL_URL;
    const [loginStatus, setLoginStatus] = useState('')
    const [loginState, setLoginState] = useState(false)
    

    const login = async (username, password) => { 
        await axios
        .post(`${LOCAL_URL}login`, {
          username: username,
          password: password,
        })
        .then((response) => {
            // save the token if credentials are correct
            if(response.data.status === true){ 
                console.log(response.data) 
                localStorage.setItem("auth-token", response.data.data.token);
                localStorage.setItem("name", response.data.data.username);
                localStorage.setItem("role", response.data.data.role); 
                localStorage.setItem('id', response.data.data.id)
                setLoginState(true)
                // navigate("/admin-home")
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
        loginStatus,
        loginState
    }
}

export default useAuth