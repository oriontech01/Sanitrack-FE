// import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useContext, useState } from 'react';
import { UserContext } from '../../../context/UserContext';
import Constants from 'expo-constants';
const useCourses = () => {
  const BASE_URL = Constants.expoConfig.extra.baseUrl;
  const { token: access_token } = useContext(UserContext);
  const [allPublishedCourses, setAllPublishedCourses] = useState([]);

  const getPublishedCourses = async () => {
    await axios
      .get(`${BASE_URL}course/published-courses`, {
        headers: { Authorization: `Bearer ${access_token}` }
      })
      .then(response => {
        console.log(response.data.data);
        setAllPublishedCourses(response.data.data);
        if (response.data.data) {
          //  console.log("Published Courses", response.data.data);
        }
      })
      .catch(error => {
        if (error.response) {
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
        }
      });
  };

  return {
    getPublishedCourses,
    allPublishedCourses
  };
};
export default useCourses;
