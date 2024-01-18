// File contains CRUD operations for staffs 
import axios from "axios"
import { useState } from "react";

const useStaff = () => { 
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const LOCAL_URL = import.meta.env.VITE_LOCAL_URL;
    const [responseMessage, setResponseMessage] = useState()
    const [allStaffs, setAllStaffs] = useState([])

    const access_token = localStorage.getItem('auth-token')
    const addStaff = async (username, password, role) => {
        await axios.post(`${BASE_URL}create-user`, { 
            username: username, 
            role: role,
            password: password, 
        }).then((response) => { 
            console.log(response)
            console.log(response.data.message)
        }).catch((error) => { 
            if (error.response) {
                const { status, data } = error.response;
                if (status === 400 && data && data.message) {
                    setResponseMessage(data.message)
                    console.log("An error occured",data.message)
                } else {
                  console.log('Axios error:', error);
                }
            } else {
                console.log('Network error:', error.message);
              }
        })
    }

    const getStaffById = async (userId) => {
        try {
            const response = await axios.get(`${LOCAL_URL}get-user?userId=${userId}`, {headers: {Authorization: `Bearer ${access_token}`}});
            const userDetails = response.data; // Adjust based on your user data structure
            // console.log(`User Details for ID ${userId}:`, userDetails);
            return userDetails;
        } catch (error) {
            console.error(`Error fetching user details for ID ${userId}:`, error);
            return null;
        }
    }

    const getAllStaffs = async () => { 
        await axios.get(`${LOCAL_URL}get-all-users?page=1&documentCount=10`, {
            headers: { Authorization: `Bearer ${access_token}` }
        })
        .then((response) => { 
            setAllStaffs(response.data.data.allUsers)
        })
        .catch((error) => { 
            if (error.response) {
                const { status, data } = error.response;
                if (status === 400 && data && data.message) {
                    setResponseMessage(data.message);
                    console.log("An error occurred", data.message);
                } else {
                    console.log('Axios error:', error);
                }
            } else {
                console.log('Network error:', error.message);
            }
        });
    };
    
    return{ 
        addStaff, 
        responseMessage, 
        getStaffById, 
        getAllStaffs, 
        allStaffs
    }
}

export default useStaff