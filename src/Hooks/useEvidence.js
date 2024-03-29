import axios from "axios";
import { useState } from "react";


const useEvidence = () => { 
    const BASE_URL = process.env.REACT_APP_BASE_URL;
    // const BASE_URL = process.env.REACT_APP_BASE_URL;
    const access_token = localStorage.getItem('auth-token')

    const [allRooms, setAllRooms] = useState([])
    const [allImages, setImages] =  useState([])

    const getRoom = async() => { 
        await axios.get(`${BASE_URL}evidence/room-name`, {
            headers: {Authorization: `Bearer ${access_token}`}
        }).then((response) => { 
            setAllRooms(response.data.data)
            // console.log(response.data.data.allRooms)
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

    const getImages = async(taskId) => { 
        await axios.get(`${BASE_URL}evidence/images?taskId=${taskId}`, {
            headers: {Authorization: `Bearer ${access_token}`}
        }).then((response) => { 
            setImages(response.data.data)
            // console.log(response.data.data.allRooms)
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

    return{ 
        getRoom, 
        allRooms, 
        getImages, 
        allImages
    }
}

export default useEvidence