import axios from 'axios';
import { useState, useEffect, useMemo } from 'react';
import { useLocation } from 'react-router';

const useLessons = () => {
  const BASE_URL = useMemo(() => process.env.REACT_APP_BASE_URL, []);
  const access_token = useMemo(() => localStorage.getItem('auth-token'), []);
  const [loading, setLoading] = useState(false);
  const [allPublishedLessons, setAllPublishedLessons] = useState([]);
  const path = useLocation().pathname.split('/')[3];

  useEffect(() => {
    const getPublishedLessons = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${BASE_URL}course-lesson/${path}/all-lessons`, {
          headers: { Authorization: `Bearer ${access_token}` }
        });
        console.log(response.data.data);
        setAllPublishedLessons(response.data.data);
      } catch (error) {
        handleErrorResponse(error);
      } finally {
        setLoading(false);
      }
    };

    getPublishedLessons();
  }, [BASE_URL, access_token, path]);

  const handleErrorResponse = error => {
    if (error.response) {
      const { status, data } = error.response;
      if (status === 400 && data && data.message) {
        console.log('An error occurred', data.message);
        // handle specific error case
      } else if (status === 403 && data && data.message) {
        console.log('An error with status 403 occurred', data.message);
        // handle specific error case
      } else {
        console.log('Axios error:', error);
        // handle other error cases
      }
    } else {
      console.log('Network error:', error.message);
      // handle network errors
    }
  };

  return {
    allPublishedLessons,
    loading
  };
};

export default useLessons;
