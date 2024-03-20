// import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useContext, useState } from 'react';
import { UserContext } from '../../../context/UserContext';
import Constants from 'expo-constants';
const useTask = () => {
  const BASE_URL = Constants.expoConfig.extra.baseUrl;
  const [mssData, setMssData] = useState([])
  const { token: access_token } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [allTask, setTask] = useState([]);
  // const [responseMessage, setResponseMessage] = useState();

  const getTask = async () => {
    setLoading(true);
    await axios
      .get(`${BASE_URL}task/get`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        if (response.data) {
          setTask(response.data.data.allTasks);
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
  const getMSSTableData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/task/mss`, {
        headers: {
          Authorization: `Bearer ${access_token}`
        }
      })
      setMssData(res.data.data)
      console.log("NOT FRIENDLY",res.data.data[1].assigned_room)
    } catch (error) {
      console.log("FRIENDLY",error);
    }
}

  return {
    getTask,
    allTask,
    loading,
    getMSSTableData,
    mssData
  };
};
export default useTask;
