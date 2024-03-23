// import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useContext, useState } from 'react';
import { UserContext } from '../../../context/UserContext';
import Constants from 'expo-constants';
const useLocation = () => {
  // const navigate = useNavigate();
  const BASE_URL = Constants.expoConfig.extra.baseUrl;

  const { token: access_token } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [allLocations, setLocation] = useState([]);
  // const [responseMessage, setResponseMessage] = useState();

  const getLocation = async () => {
    setLoading(true);
    await axios
      .get(`${BASE_URL}locations`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        setLocation(response.data.data.allLocations);
        if (response.data) {
          console.log("Location Data Dawg",response.data.data.allLocations);
          setLoading(false);
        }
      })
      .catch((error) => {
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

  return {
    getLocation,
    allLocations,
    loading,
  };
};
export default useLocation;
