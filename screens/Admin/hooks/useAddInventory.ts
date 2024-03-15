// import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useContext, useState } from 'react';
import { UserContext } from '../../../context/UserContext';
import Constants from 'expo-constants';
const useAddInventor = () => {
  // const navigate = useNavigate();
  const BASE_URL = Constants.expoConfig.extra.baseUrl;

  const { token: access_token } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [allCleaner, setCleaners] = useState([]);
  // const [responseMessage, setResponseMessage] = useState();

  const addInventory = async (data) => {
    setLoading(true);
    await axios
      .post(
        `${BASE_URL}cleaning-items/add`,

        data,
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      )
      .then((response) => {
        console.log(response);

        if (response.data) {
          console.log(response.data);
          return true;
        }

        // console.log(response.json())
      })
      .catch((error) => {
        alert('Error Adding Items');
        if (error.response) {
          setLoading(false);
          const { status, data } = error.response;

          if (status === 400 && data && data.message) {
            console.log('An error occured', error);
          } else if (status === 403 && data && data.message) {
            // navigate('/')
          } else {
            console.log('Axios error:', error);
          }
        } else {
          setLoading(false);
          console.log('Network error:', error.message);
        }
      });
    return false;
  };

  return {
    addInventory,
    allCleaner,
    adding: loading,
  };
};
export default useAddInventor;
