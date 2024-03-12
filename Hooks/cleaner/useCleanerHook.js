import axios from 'axios';
import { useState } from 'react';

const useCleanerHook = () => {
  const BASE_URL = Constants.expoConfig.extra.baseUrl;
  const access_token = localStorage.getItem('auth-token');
  const [workOrderLocations, setWorkOrderLocations] = useState([]);

  const getWorkOrderLocationsForCleaner = async () => {
    try {
      const res = await axios.get(`${BASE_URL}cleaner-dashboard`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      });
      setWorkOrderLocations(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  return {
    workOrderLocations,
    getWorkOrderLocationsForCleaner
  };
};

export default useCleanerHook;
