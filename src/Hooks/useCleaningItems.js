import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const useCleaningItems = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const navigate = useNavigate();

  const access_token = localStorage.getItem('auth-token');

  const [cleaningItems, setAllCleaningItems] = useState([]);
  const [responseMessage, setResponseMessage] = useState('');

  const getCleaningItems = async () => {
    await axios
      .get(`${BASE_URL}cleaning-items`, {
        headers: { Authorization: `Bearer ${access_token}` }
      })
      .then(response => {
        console.log('Cleaning Items', response.data);
        setAllCleaningItems(response.data.data.allItems);
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

  return {
    getCleaningItems,
    cleaningItems
  };
};
export default useCleaningItems;
