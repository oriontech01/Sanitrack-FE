import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useTask = () => { 
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const LOCAL_URL = import.meta.env.VITE_LOCAL_URL;
    const[responseMessage, setResponseMessage] = useState()

    const [unAssignedRooms, setUnAssignedRooms] = useState([])
    const [allCleaners, setAllCleaners] = useState([])
    const [allInspectors, setAllInspectors] = useState([])
    const [singleTaskDetail, setSingleTaskDetail] = useState([])

    const [allTasks, setAllTasks] = useState([])

    const [activeCleaners, setActiveCleaners] = useState()
    const [activeInspectors, setActiveInspectors] = useState()
    const [everyTask, setEveryTask] = useState()

    const navigate = useNavigate()

    const access_token = localStorage.getItem('auth-token')


   
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
                    navigate('/')
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
            setActiveCleaners(response.data.data.allCleaners.length)
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
                    navigate('/')
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
            setActiveInspectors(response.data.data.allInspectors.length)
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
                    navigate('/')
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

    const getAllTasks = async () => { 
        await axios.get(`${LOCAL_URL}task/get-all-tasks`, {
            headers: { Authorization: `Bearer ${access_token}` }
        }).then((response) => {
            setEveryTask(response.data.data.allTasks.length)
            setAllTasks(response.data.data.allTasks)
            console.log(response.data.data.allTasks)
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

    const getTaskById = async (taskId) => {
        await axios.get(`${LOCAL_URL}task/get-single-task?taskId=${taskId}`, 
        {
            headers: {Authorization: `Bearer ${access_token}`}
        }).then((response) => { 
            setSingleTaskDetail(response.data.data)
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

    const updateTask = async(taskId, cleanerId, inspectorId, roomId) => { 
        await axios.put(`${LOCAL_URL}task/update-task`, {
            taskId: taskId,
            inspectorId: inspectorId,
            cleanerId: cleanerId,
            roomId: roomId
        },
        {headers: {Authorization: `Bearer ${access_token}`}} 
        ).then((response) => { 
            console.log(response.data)
            navigate("/home/tasks")
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
    const deleteTask =  async (taskId) => { 
        await axios.delete(`${LOCAL_URL}task/delete-task`, {
            data: { taskId: taskId }, 
            headers: { Authorization: `Bearer ${access_token}` }
        }).then((response) => { 
            console.log(response)
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
  

    
    return{ 
        getUnAssignedRooms, 
        getAllCleaners, 
        getAllInspectors, 
        unAssignedRooms, 
        allCleaners, allInspectors,
        addTask, getAllTasks, 
        allTasks, 
        deleteTask, 
        activeCleaners, 
        everyTask, 
        activeInspectors, 
        getTaskById,
        singleTaskDetail, 
        updateTask
    }
}
export default useTask