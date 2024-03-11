import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router';
import { toast, Flip } from 'react-toastify';

const useCleanerHook = () => {
  const taskId = localStorage.getItem('taskId');
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [loading, setLoading] = useState(false);
  const access_token = localStorage.getItem('auth-token');
  const [workOrderLocations, setWorkOrderLocations] = useState([]);
  const [cleaningItems, setCleaningItems] = useState([]);
  const [roomDetails, setRoomDetails] = useState([]);
  const [itemsLoading, setItemsLoading] = useState(false);
  const [rooms, setRooms] = useState([]);
  const [summary, setSummary] = useState([]);
  const [activeTask, setActiveTask] = useState('');
  const [activeLoading, setActiveLoading] = useState(false);
  const [facility, setFacilties] = useState('');
  const [faciltiyLoading, setFaciityLoading] = useState(false);
  const navigate = useNavigate();

  const getActiveTask = async () => {
    setActiveLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}cleaner-dashboard/active-task`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      if (res.data) {
        setActiveLoading(false);
      }
      setActiveTask(res.data.data);
    } catch (error) {
      setActiveLoading(false);
      console.log(error);
    }
  };
  const getFacilities = async () => {
    setFaciityLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}cleaner-dashboard/all-facility`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      if (res.data) {
        setFaciityLoading(false);
      }
      setFacilties(res.data.data);
    } catch (error) {
      setFaciityLoading(false);
      console.log(error);
    }
  };
  const getWorkOrderLocationsForCleaner = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}cleaner-dashboard`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      if (res.data) {
        setLoading(false);
      }
      setWorkOrderLocations(res.data.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const getRoomDetailsForCleaner = async id => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}cleaner-dashboard/rooms?locationId=${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      if (res.data) {
        setLoading(false);
      }
      setRoomDetails(res.data.data.cleanerRooms);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const getCleaningItemsForCleaner = async id => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}cleaner-dashboard/cleaning-items?taskId=${id}`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      if (res.data) {
        setLoading(false);
      }
      setCleaningItems(res.data.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const getRoomsToClean = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}cleaner-dashboard/room-task?taskId=${taskId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      if (res.data) {
        setLoading(false);
      }
      setRooms(res.data.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const getSummary = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}cleaner-dashboard/summary?taskId=${taskId}`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      if (res.data) {
        setLoading(false);
      }
      setSummary(res.data.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const confrimCleaningItems = async data => {
    setItemsLoading(true);
    await axios
      .post(
        `${BASE_URL}cleaner-dashboard/confirm?taskId=${taskId}`,

        data,
        { headers: { Authorization: `Bearer ${access_token}` } }
      )
      .then(response => {
        console.log(response);
        // send user back to the task home page
        if (response.data) {
          toast.success('Cleaning Item Confirmed', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            transition: Flip
          });
          setItemsLoading(false);
          setTimeout(() => {
            navigate(`/dashboard/cleaner/cleaner-summary`);
          }, 1500);
        }

        // console.log(response.json())
      })
      .catch(error => {
        if (error.response) {
          setItemsLoading(false);
          const { status, data } = error.response;
          toast.error(data.message, {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            transition: Flip
          });
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
            console.log('An error occured', data.message);
          } else if (status === 403 && data && data.message) {
            // navigate('/')
          } else {
            console.log('Axios error:', error);
          }
        } else {
          setItemsLoading(false);
          console.log('Network error:', error.message);
        }
      });
  };
  const uploadCleaningItemsUrl = async data => {
    setItemsLoading(true);
    await axios
      .post(
        `${BASE_URL}cleaner-dashboard/room-details`,

        data,
        { headers: { Authorization: `Bearer ${access_token}` } }
      )
      .then(response => {
        console.log(response);
        // send user back to the task home page
        if (response.data) {
          toast.success('Cleaning Item Images Have Been Uploaded', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            transition: Flip
          });
          setItemsLoading(false);
          // setTimeout(() => {
          //   navigate(`/dashboard/cleaner/cleaner-summary`);
          // }, 1500);
        }

        // console.log(response.json())
      })
      .catch(error => {
        if (error.response) {
          setItemsLoading(false);
          const { status, data } = error.response;
          toast.error(data.message, {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            transition: Flip
          });
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
            console.log('An error occured', data.message);
          } else if (status === 403 && data && data.message) {
            // navigate('/')
          } else {
            console.log('Axios error:', error);
          }
        } else {
          setItemsLoading(false);
          console.log('Network error:', error.message);
        }
      });
  };
  const submitTask = async data => {
    setItemsLoading(true);
    await axios
      .post(
        `${BASE_URL}task/submit?taskId=${taskId}`,

        data,
        { headers: { Authorization: `Bearer ${access_token}` } }
      )
      .then(response => {
        console.log(response);
        // send user back to the task home page
        if (response.data) {
          toast.success('Task Uploaded Successfully', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            transition: Flip
          });
          setItemsLoading(false);
          setTimeout(() => {
            navigate(`/dashboard`);
          }, 1500);
        }

        // console.log(response.json())
      })
      .catch(error => {
        if (error.response) {
          setItemsLoading(false);
          const { status, data } = error.response;
          toast.error(data.message, {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            transition: Flip
          });
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
            console.log('An error occured', data.message);
          } else if (status === 403 && data && data.message) {
            // navigate('/')
          } else {
            console.log('Axios error:', error);
          }
        } else {
          setItemsLoading(false);
          console.log('Network error:', error.message);
        }
      });
  };
  const requestCleaningItems = async data => {
    setItemsLoading(true);
    await axios
      .post(
        `${BASE_URL}cleaner-dashboard/request?taskId=${taskId}`,

        data,
        { headers: { Authorization: `Bearer ${access_token}` } }
      )
      .then(response => {
        console.log(response);
        // send user back to the task home page
        if (response.data) {
          toast.success('Task Uploaded Successfully', {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            transition: Flip
          });
          setItemsLoading(false);
          setTimeout(() => {
            navigate(`/dashboard`);
          }, 3000);
        }

        // console.log(response.json())
      })
      .catch(error => {
        if (error.response) {
          setItemsLoading(false);
          const { status, data } = error.response;
          toast.error(data.message, {
            position: 'top-center',
            autoClose: 5000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: 'colored',
            transition: Flip
          });
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
            console.log('An error occured', data.message);
          } else if (status === 403 && data && data.message) {
            // navigate('/')
          } else {
            console.log('Axios error:', error);
          }
        } else {
          setItemsLoading(false);
          console.log('Network error:', error.message);
        }
      });
  };
  return {
    workOrderLocations,
    getWorkOrderLocationsForCleaner,
    loading,
    roomDetails,
    getRoomDetailsForCleaner,
    cleaningItems,
    setCleaningItems,
    getCleaningItemsForCleaner,
    itemsLoading,
    confrimCleaningItems,
    getRoomsToClean,
    rooms,
    summary,
    getSummary,
    uploadCleaningItemsUrl,
    submitTask,
    requestCleaningItems,
    activeLoading,
    activeTask,
    getActiveTask,
    facility,
    faciltiyLoading,
    getFacilities
  };
};

export default useCleanerHook;
