// import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useContext, useState } from 'react';
import { UserContext } from '../../../context/UserContext';
import Constants from 'expo-constants';
const useInspector = () => {
  // const navigate = useNavigate();
  const BASE_URL = Constants.expoConfig.extra.baseUrl;

  const { token: access_token } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [allInspectors, setInspectors] = useState([]);
  // const [responseMessage, setResponseMessage] = useState();

  const getInspectors = async () => {
    setLoading(true);
    await axios
      .get(`${BASE_URL}get-all-inspector`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        if (response.data) {
          setInspectors(response.data.data.allInspectors);
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
    getInspectors,
    allInspectors,
    loading,
  };
};
export default useInspector;
