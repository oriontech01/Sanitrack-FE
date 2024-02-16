import axios from 'axios';
import { useState } from 'react';

const useWorkHistory = () => {
  const [cleanerSummary, setCleanerSummary] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const BASE_URL = process.env.REACT_APP_BASE_URL;
//   const BASE_URL = process.env.REACT_APP_BASE_URL;
  const token = localStorage.getItem('auth-token');
  const getRoomHistory = async (roomId) => {
    try {
      const res = await axios.get(`${BASE_URL}work-history/rooms?roomId=${roomId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log("HAS THE DATA BEEN FETCHED?", res.data.data)
      return res.data.data;
    } catch (error) {
      console.error('Error fetching room history:', error);
      // Handle the error based on your application's needs
      // For example, you might want to return an empty array or null, or throw the error further
      return null; // or throw error;
    }
  };

  const getInspectorHistory = async (inspectorId) => {
    try {
      const res = await axios.get(`${BASE_URL}work-history/inspector?inspectorId=${inspectorId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      return res.data.data;
    } catch (error) {
      console.error('Error fetching inspector history:', error);
      return null; // or throw error;
    }
  };

  const getCleanerHistory = async (cleanerId) => {
    try {
      const res = await axios.get(`${BASE_URL}work-history/cleaner?cleanerId=${cleanerId}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
       console.log("Cleaner history", res.data.data);
      return res.data.data;
    } catch (error) {
      console.error('Error fetching cleaner history:', error);
      return null; // or throw error;
    }
  };

  const getCleanerSummary = async () => {
    setIsLoading(true);
    try {
      const res = await axios.get(`${BASE_URL}/work-history/cleaner-task-summary`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      setCleanerSummary(res.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  return {
    getCleanerSummary,
    getCleanerHistory,
    getInspectorHistory,
    getRoomHistory,
    cleanerSummary,
    isLoading
  };
};
export default useWorkHistory;
