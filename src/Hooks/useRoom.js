import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const useRoom = () => { 
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const LOCAL_URL = import.meta.env.VITE_LOCAL_URL;
    const navigate = useNavigate()
    const [responseMessage, setResponseMessage] = useState()
    const [allRooms, setAllRooms] = useState([])
    const [allRoomsById, setAllRoomsById] = useState([])

    const [roomsCount, setRoomCount] = useState()

    const access_token = localStorage.getItem('auth-token')

    const addRoom = async(formData) => { 
        console.log("From the useRoom hook", formData)
        await axios.post(`${LOCAL_URL}room/create-room`, formData, {
            headers: {Authorization: `Bearer ${access_token}`} 
            
        }).then((response) => {
            // console.log(response.data.message)
            setResponseMessage(data.message)
            navigate('/home/room')
        }).catch((error) => { 
            if (error.response) {
                const { status, data } = error.response;
                if (status === 400 && data && data.message) {
                    setResponseMessage(data.message)
                    console.log("An error occured",data.message)
                } else if(status === 403 && data && data.message){
                    console.log("An error with status 403 occured",data.message)
                    setResponseMessage(data.message)
                } else {
                  console.log('Axios error:', error);
                }
            } else {
                console.log('Network error:', error.message);
              }
        })
    }

    const getRoom = async() => {
        await axios.get(`${LOCAL_URL}/room/get`, {
            headers: {Authorization: `Bearer ${access_token}`}
        }).then((response) => { 
            setAllRooms(response.data.data.allRooms)
            setRoomCount(response.data.data.allRooms.length)
            // console.log("All rooms", response.data.data.allRooms)
        }).catch((error)=> { 
            if(error.response){ 
                const { status, data } = error.response;
                if (status === 400 && data && data.message) {
                    setResponseMessage(data.message)
                    console.log("An error occured",data.message)
                } else if(status === 403 && data && data.message){
                    console.log("An error with status 403 occured",data.message)
                    setResponseMessage(data.message)
                } else {
                  console.log('Axios error:', error);
                }
            }else {
                console.log('Network error:', error.message);
              }
        })
    }

    const getRoomById = async(roomId) => {
        await axios.get(`${LOCAL_URL}/room/get-single-room?roomId=${roomId}`, {
            headers: {Authorization: `Bearer ${access_token}`}
        }).then((response) => { 
            setAllRoomsById(response.data.data)
            // console.log(response.data.data)
        }).catch((error)=> { 
            if(error.response){ 
                const { status, data } = error.response;
                if (status === 400 && data && data.message) {
                    setResponseMessage(data.message)
                    console.log("An error occured",data.message)
                } else if(status === 403 && data && data.message){
                    console.log("An error with status 403 occured",data.message)
                    setResponseMessage(data.message)
                } else {
                  console.log('Axios error:', error);
                }
            }else {
                console.log('Network error:', error.message);
              }
        })
    }

    const updateRoomDetail = async( formData) => { 
        await axios.put(`${LOCAL_URL}room/update-room`, formData, {
            headers: {Authorization: `Bearer ${access_token}`}
        } ).then((response) => { 
            // console.log(response.data.message)
            setResponseMessage(response.data.message)
            navigate('/home/room')
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

    const deleteRoom = async(roomId) => { 
        await axios.delete(`${LOCAL_URL}room/delete-room`, 
        {
            data: {roomId: roomId},
            headers: {Authorization: `Bearer ${access_token}`}
        }).then((response) => { 
            console.log(response)
            navigate('/home/room')
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
    
    return{ 
        addRoom, 
        responseMessage, 
        getRoom, 
        allRooms, 
        getRoomById, 
        allRoomsById, 
        updateRoomDetail, 
        deleteRoom, 
        roomsCount
    }
}

export default useRoom