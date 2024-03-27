// File contains CRUD operations for staffs
import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, Flip } from 'react-toastify';
import { TRUE } from 'sass';
const useStaff = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  // const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();
  const [responseMessage, setResponseMessage] = useState();
  const [allStaffs, setAllStaffs] = useState([]);
  const [staffByName, setStaffByName] = useState({});
  const [isSucc,setIsSucc]=useState(false);
  // const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadings, setIsLoadings] = useState(false);
  const [allCleaners, setAllCleaners] = useState([]);
  const [allInspectors, setAllInspectors] = useState([]);

  const access_token = localStorage.getItem('auth-token');

  const addStaff = async dataToPass => {
    setIsLoadings(true);
    await axios
      .post(`${BASE_URL}create-user`, dataToPass, {
        headers: { Authorization: `Bearer ${access_token}` }
      })
      .then(response => {
        if (response) {
          setIsLoadings(false);
          toast.success('Staff Added Successfully', {
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
        }

        setResponseMessage('Staff Added.');

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch(error => {
        if (error.response) {
          setIsLoadings(false);
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
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
            console.log('An error occured', data.message);
          } else {
            console.log('Axios error:', data.err.details[0].message);
            toast.error(data.err.details[0].message, {
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
          }
        } else {
          setIsLoadings(false);
          console.log('Network error:', error.message);
        }
      });
  };

  const getStaffById = async userId => {
    try {
      const response = await axios.get(`${BASE_URL}get-user?userId=${userId}`, {
        headers: { Authorization: `Bearer ${access_token}` }
      });
      const userDetails = response.data; // Adjust based on your user data structure
      // console.log(`User Details for ID ${userId}:`, userDetails);
      return userDetails;
    } catch (error) {
      console.error(`Error fetching user details for ID ${userId}:`, error);
      return null;
    }
  };

  const getStaffByUserName = async name => {
    setIsLoading(true)
    setIsSucc(false)
    await axios
      .get(`${BASE_URL}staff/?userName=${name}`, {
        headers: { Authorization: `Bearer ${access_token}` }
      })
      .then(response => {
        if(response.data){
          setIsSucc(true)
          console.log("REST",response)
          setStaffByName(response.data.data);
          setIsLoading(false)
        }
       
      })
      .catch(error => {
        if (error.response) {
          setIsLoading(false)
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
            console.log('An error occurred', data.message);
          } else {
            console.log('Axios error:', error);
          }
        } else {
          console.log('Network error:', error.message);
        }
      });
  };
  const getAllStaffs = async (page, itemPerPage) => {
    setIsLoading(true);
    await axios
      .get(`${BASE_URL}get-all-users?page=${page}&documentCount=${itemPerPage}`, {
        headers: { Authorization: `Bearer ${access_token}` }
      })
      .then(response => {
        setIsLoading(false);
        setAllStaffs(response.data.data.allUsers);
        setTotalPages(Math.ceil(response.data.data.totalUsers / itemPerPage));
      })
      .catch(error => {
        setIsLoading(false);
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
            console.log('An error occurred', data.message);
          } else {
            console.log('Axios error:', error);
          }
        } else {
          console.log('Network error:', error.message);
        }
      });
  };

  const fireStaff = async staffId => {
    await axios
      .put(
        `${BASE_URL}delete-user`,
        {
          staffId: staffId
        },
        {
          headers: { Authorization: `Bearer ${access_token}` }
        }
      )
      .then(response => {
        console.log(response.data);
        navigate('/dashboard/user');
      })
      .catch(error => {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
            console.log('An error occurred', data.message);
          } else {
            console.log('Axios error:', error);
          }
        } else {
          console.log('Network error:', error.message);
        }
      });
  };

  const restoreStaff = async staffId => {
    await axios
      .put(
        `${BASE_URL}update-user-status`,
        {
          staffId: staffId
        },
        {
          headers: { Authorization: `Bearer ${access_token}` }
        }
      )
      .then(response => {
        console.log(response.data);
        navigate('/dashboard/user');
      })
      .catch(error => {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
            console.log('An error occurred', data.message);
          } else {
            console.log('Axios error:', error);
          }
        } else {
          console.log('Network error:', error.message);
        }
      });
  };
  const getAllCleaners = async () => {
    try {
      const res = await axios.get(`${BASE_URL}get-all-cleaner`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      console.log('All cleaners', res.data.data.allCleaners);
      setAllCleaners(res.data.data.allCleaners);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllInspectors = async () => {
    try {
      const res = await axios.get(`${BASE_URL}get-all-inspector`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      setAllInspectors(res.data.data.allInspectors);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    addStaff,
    responseMessage,
    getStaffById,
    getStaffByUserName,
    staffByName,
    getAllStaffs,
    allStaffs,
    fireStaff,
    restoreStaff,
    totalPages,
    isLoading,
    getAllCleaners,
    getAllInspectors,
    allCleaners,
    allInspectors,
    isLoadings,
    isSucc
  };
};

export default useStaff;
