// import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';

const useLocation = () => {
  // const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  // const BASE_URL = process.env.REACT_APP_BASE_URL;
  const access_token = localStorage.getItem('auth-token');
  const [loading, setLoading] = useState(false);
  const [loadings, setLoadings] = useState(false);
  const [allLocations, setLocation] = useState([]);
  const [assignedFac, setAssignedFac] = useState([]);
  // const [responseMessage, setResponseMessage] = useState();

  const getLocation = async () => {
    setLoading(true);
    await axios
      .get(`${BASE_URL}locations`, {
        headers: { Authorization: `Bearer ${access_token}` }
      })
      .then(response => {
        console.log(response);
        setLocation(response.data.data.allLocations);
        if (response.data) {
          setLoading(false);
        }
      })
      .catch(error => {
        if (error.response) {
          setLoading(false);
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            // setResponseMessage(data.message);
            console.log('An error occured', data.message);
          } else if (status === 403 && data && data.message) {
            console.log('An error with status 403 occured', data.message);
            // setResponseMessage(data.message);
          } else {
            console.log('Axios error:', error);
          }
        } else {
          console.log('Network error:', error.message);
          setLoading(false);
        }
      });
  };
  const getAssignedFac = async () => {
    setLoadings(true);
    await axios
      .get(`${BASE_URL}work-facility/`, {
        headers: { Authorization: `Bearer ${access_token}` }
      })
      .then(response => {
        console.log(response);
        setAssignedFac(response.data.data.allFacilityTiming);
        if (response.data) {
          setLoadings(false);
        }
      })
      .catch(error => {
        if (error.response) {
          setLoadings(false);
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            // setResponseMessage(data.message);
            console.log('An error occured', data.message);
          } else if (status === 403 && data && data.message) {
            console.log('An error with status 403 occured', data.message);
            // setResponseMessage(data.message);
          } else {
            console.log('Axios error:', error);
          }
        } else {
          console.log('Network error:', error.message);
          setLoading(false);
        }
      });
  };
  return {
    getLocation,
    allLocations,
    loading,getAssignedFac,assignedFac,loadings
  };
};
export default useLocation;
