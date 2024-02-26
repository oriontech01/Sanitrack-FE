import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const useRoom = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  // const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [responseMessage, setResponseMessage] = useState();
  const [allRooms, setAllRooms] = useState([]);
  const [allRoomsById, setAllRoomsById] = useState([]);
  const [allUnassignedRoomsById, setAllUnaassignedRoomsById] = useState([]);
  const [singleRoomTask,setSinleRoomTask]=useState([])
  const [isLoading, setIsLoading] = useState(false);

  const [roomsCount, setRoomCount] = useState();

  const access_token = localStorage.getItem('auth-token');

  const addRoom = async formData => {
    // console.log("From the useRoom hook", formData)
    setIsLoading(true);
    await axios
      .post(`${BASE_URL}room/create-room`, formData, {
        headers: { Authorization: `Bearer ${access_token}` }
      })
      .then(response => {
        // console.log(response.data.message)
        setIsLoading(false);
        setResponseMessage(response.data.message);
        navigate('/dashboard/rooms');
      })
      .catch(error => {
        setIsLoading(false);
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
            console.log('An error occured', data.message);
          } else if (status === 403 && data && data.message) {
            console.log('An error with status 403 occured', data.message);
            setResponseMessage(data.message);
          } else {
            console.log('Axios error:', error);
          }
        } else {
          console.log('Network error:', error.message);
        }
      });
  };

  const getRoom = async () => {
    setIsLoading(true);
    await axios
      .get(`${BASE_URL}/room/get`, {
        headers: { Authorization: `Bearer ${access_token}` }
      })
      .then(response => {
        setIsLoading(false);
        setAllRooms(response.data.data.allRooms);
        setRoomCount(response.data.data.allRooms.length);
        // console.log("All rooms", response.data.data.allRooms)
      })
      .catch(error => {
        setIsLoading(false);
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
            console.log('An error occured', data.message);
          } else if (status === 403 && data && data.message) {
            console.log('An error with status 403 occured', data.message);
            setResponseMessage(data.message);
          } else {
            console.log('Axios error:', error);
          }
        } else {
          console.log('Network error:', error.message);
        }
      });
  };

  const getRoomById = async id => {
    await axios
      .get(`${BASE_URL}/room/get-single?roomId=${id}`, {
        headers: { Authorization: `Bearer ${access_token}` }
      })
      .then(response => {
        setAllRoomsById(response.data.data);
        console.log('omah', response.data.data);
      })
      .catch(error => {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
            console.log('An error occured', data.message);
          } else if (status === 403 && data && data.message) {
            console.log('An error with status 403 occured', data.message);
            setResponseMessage(data.message);
          } else {
            console.log('Axios error:', error);
          }
        } else {
          console.log('Network error:', error.message);
        }
      });
  };
  const getUnassignedRoomById = async id => {
    setIsLoading(true);
    await axios
      .get(`${BASE_URL}/room/unassigned-rooms?locationId=${id}`, {
        headers: { Authorization: `Bearer ${access_token}` }
      })
      .then(response => {
        console.log("firstone",response)
        setAllUnaassignedRoomsById(response.data.data);
        console.log('omah', response.data.data);
        if (response.data.data) {
          setIsLoading(false);
        }
      })
      .catch(error => {
        if (error.response) {
          setIsLoading(false);
        
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
            console.log('An error occured', data.message);
          } else if (status === 403 && data && data.message) {
            console.log('An error with status 403 occured', data.message);
            setResponseMessage(data.message);
          } else {
            console.log('Axios error:', error);
          }
        } else {
          console.log('Network error:', error.message);
        }
      });
  };
  const getSingleRoomTaskById = async id => {
    setIsLoading(true);
    await axios
      .get(`${BASE_URL}/room/task?roomId=${id}`, {
        headers: { Authorization: `Bearer ${access_token}` }
      })
      .then(response => {
        setSinleRoomTask(response.data.data);
        console.log('omah', response.data.data);
        if (response.data.data) {
          setIsLoading(false);
        }
      })
      .catch(error => {
        if (error.response) {
          setIsLoading(false);
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
            console.log('An error occured', data.message);
          } else if (status === 403 && data && data.message) {
            console.log('An error with status 403 occured', data.message);
            setResponseMessage(data.message);
          } else {
            console.log('Axios error:', error);
          }
        } else {
          setIsLoading(false)
          console.log('Network error:', error.message);
        }
      });
  };
  const updateRoomDetail = async formData => {
    await axios
      .put(`${BASE_URL}room/update-room`, formData, {
        headers: { Authorization: `Bearer ${access_token}` }
      })
      .then(response => {
        // console.log(response.data.message)
        setResponseMessage(response.data.message);
        navigate('/dashboard/rooms');
      })
      .catch(error => {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
            console.log('An error occured', data.message);
          } else if (status === 403 && data && data.message) {
            console.log('An error with status 403 occured', data.message);
            setResponseMessage(data.message);
            // send user back to the login page!
          } else {
            console.log('Axios error:', error);
          }
        } else {
          console.log('Network error:', error.message);
        }
      });
  };

  const deleteRoom = async roomId => {
    await axios
      .delete(`${BASE_URL}room/delete?roomId=${roomId}`, {
        headers: { Authorization: `Bearer ${access_token}` }
      })
      .then(response => {
        console.log(response);
        navigate('/dashboard/rooms');
      })
      .catch(error => {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
            console.log('An error occured', data.message);
          } else if (status === 403 && data && data.message) {
            console.log('An error with status 403 occured', data.message);
            setResponseMessage(data.message);
            // send user back to the login page!
          } else {
            console.log('Axios error:', error);
          }
        } else {
          console.log('Network error:', error.message);
        }
      });
  };

  return {
    addRoom,
    responseMessage,
    getRoom,
    allRooms,
    getRoomById,
    allRoomsById,
    updateRoomDetail,
    deleteRoom,
    roomsCount,
    isLoading,
    getUnassignedRoomById,
    allUnassignedRoomsById,
    getSingleRoomTaskById,
    singleRoomTask,
    
  };
};

export default useRoom;
