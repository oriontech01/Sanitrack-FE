import axios from 'axios';
import { useState } from 'react';

const useCourses = () => {
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const access_token = localStorage.getItem('auth-token');
  const [loading, setLoading] = useState(false);
  const [allPublishedCourses, setAllPublishedCourses] = useState([]);
  // const [responseMessage, setResponseMessage] = useState();

  const getPublishedCourses = async () => {
    setLoading(true);
    await axios
      .get(`${BASE_URL}course/published-courses`, {
        headers: { Authorization: `Bearer ${access_token}` }
      })
      .then(response => {
        console.log(response.data.data);
        setAllPublishedCourses(response.data.data);
        if (response.data.data) {
          setLoading(false);
        }
      })
      .catch(error => {
        if (error.response) {
          setLoading(false);
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            // setResponseMessage(data.message);
            console.log('An error occurred', data.message);
          } else if (status === 403 && data && data.message) {
            console.log('An error with status 403 occurred', data.message);
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
    getPublishedCourses,
    allPublishedCourses,
    loading
  };
};
export default useCourses;
