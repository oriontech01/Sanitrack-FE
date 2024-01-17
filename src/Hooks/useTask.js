import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useStaff from "./useStaff";

const useTask = () => { 
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const LOCAL_URL = import.meta.env.VITE_LOCAL_URL;
    const[responseMessage, setResponseMessage] = useState()
    const [unAssignedRooms, setUnAssignedRooms] = useState([])
    const [allCleaners, setAllCleaners] = useState([])
    const [allInspectors, setAllInspectors] = useState([])
    const [allTasks, setAllTasks] = useState([])
    const navigate = useNavigate()

    const access_token = localStorage.getItem('auth-token')
    const {getStaffById} = useStaff()

   
    const getUnAssignedRooms = async () => { 
        await axios.get(`${LOCAL_URL}get-unassigned-rooms`, {
            headers: {Authorization: `Bearer ${access_token}`}
        }).then((response) => { 
            setUnAssignedRooms(response.data.data.roomsNotInTasks)
        }).catch((error) => { 
            if(error.response){ 
                const { status, data } = error.response;
                if (status === 400 && data && data.message) {
                    setResponseMessage(data.message)
                    console.log("An error occured",data.message)
                } else if(status === 403 && data && data.message){
                    console.log("An error with status 403 occured",data.message)
                    setResponseMessage(data.message)
                    // send user back to the login page!
                } else {
                  console.log('Axios error:', error);
                }
            }else {
                console.log('Network error:', error.message);
              }
        })
    }

    const getAllCleaners = async () => { 
        await axios.get(`${LOCAL_URL}get-all-cleaner`, {
            headers: {Authorization: `Bearer ${access_token}`}
        }).then((response) => { 
            setAllCleaners(response.data.data.allCleaners)
        }).catch((error) => { 
            if(error.response){ 
                const { status, data } = error.response;
                if (status === 400 && data && data.message) {
                    setResponseMessage(data.message)
                    console.log("An error occured",data.message)
                } else if(status === 403 && data && data.message){
                    console.log("An error with status 403 occured",data.message)
                    setResponseMessage(data.message)
                    // send user back to the login page!
                } else {
                  console.log('Axios error:', error);
                }
            }else {
                console.log('Network error:', error.message);
              }
        })
    }

    const getAllInspectors = async () => { 
        await axios.get(`${LOCAL_URL}get-all-inspector`, {
            headers: {Authorization: `Bearer ${access_token}`}
        }).then((response) => { 
            setAllInspectors(response.data.data.allInspectors)
        }).catch((error) => { 
            if(error.response){ 
                const { status, data } = error.response;
                if (status === 400 && data && data.message) {
                    setResponseMessage(data.message)
                    console.log("An error occured",data.message)
                } else if(status === 403 && data && data.message){
                    console.log("An error with status 403 occured",data.message)
                    setResponseMessage(data.message)
                    // send user back to the login page!
                } else {
                  console.log('Axios error:', error);
                }
            }else {
                console.log('Network error:', error.message);
              }
        })
    }
    const addTask = async(roomId, cleanerId, inspectorId) => { 
        await axios.post(`${LOCAL_URL}task/create-task`, 
        { 
            inspectorId: inspectorId, 
            cleanerId: cleanerId, 
            roomId: roomId
        }, 
        {headers: { Authorization: `Bearer ${access_token}`}}
        ).then((response) => { 
            // send user back to the task home page 
            navigate('/home/tasks')
        }).catch((error) => { 
            if(error.response){ 
                const { status, data } = error.response;
                if (status === 400 && data && data.message) {
                    setResponseMessage(data.message)
                    console.log("An error occured",data.message)
                } else if(status === 403 && data && data.message){
                    navigate('/')
                } else {
                  console.log('Axios error:', error);
                }
            }else {
                console.log('Network error:', error.message);
              }
        })
    }

    // const getAllTasks = async () => { 
    //     const response = await axios.get(`${LOCAL_URL}task/get-all-tasks`, {
    //         headers: { Authorization: `Bearer ${access_token}` }
    //     });

    //     const allTasks = response.data.data.allTasks;
    //     setAllTasks(allTasks)

    //     const propertyIds = {
    //         cleaner: allTasks.map(task => task.assigned_cleaner._id),
    //         inspector: allTasks.map(task => task.assigned_inspector._id),
    //         room: allTasks.map(task => task.assigned_room._id),
    //     };

    //     const propertyDetails = await Promise.all([
    //         fetchPropertyDetails(propertyIds.cleaner, 'cleaner'),
    //         fetchPropertyDetails(propertyIds.inspector, 'inspector'),
    //     ]);

    //     // console.log(propertyIds)

    //     propertyDetails.forEach((details, index) => {
    //         Object.entries(details).forEach(([propertyName, userDetails]) => {
    //             const task = allTasks[index];
    //             console.log(`Task ID: ${task._id}, Assigned ${propertyName}: ${userDetails}`);
    //             // You can display the details on the page as needed
    //         });
    //     });
       
    // }
    async function fetchPropertyDetails(propertyIds, propertyName) {
        try{
            const userDetailsPromises = propertyIds.map(propertyId => getStaffById(propertyId));
            const userDetails = await Promise.all(userDetailsPromises);
            const propertyDetails = userDetails.map(userDetails => userDetails.data.username);
            // console.log(`${propertyName} Details:`, propertyDetails);
    
            return { [propertyName]: propertyDetails };
        }catch(e){}
        
    }
    return{ 
        getUnAssignedRooms, 
        getAllCleaners, 
        getAllInspectors, 
        unAssignedRooms, 
        allCleaners, allInspectors,
        addTask, getAllTasks, 
        allTasks
    }
}
export default useTask