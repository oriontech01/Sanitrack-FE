import axios from 'axios';
import { useContext, useState } from 'react';
import { UserContext } from '../../../context/UserContext';
import Constants from 'expo-constants';
import useLoading from '../../general_hooks/useLoading';

const useTaskDetails = () => {
  const BASE_URL = Constants.expoConfig.extra.baseUrl;
  const { startLoading, stopLoading, loading } = useLoading();

  const { token } = useContext(UserContext);
  // const BASE_URL = process.env.REACT_APP_BASE_URL;
  const [responseMessage, setResponseMessage] = useState();
  const [unAssignedRooms, setUnAssignedRooms] = useState([]);
  const [allCleaners, setAllCleaners] = useState([]);
  const [allInspectors, setAllInspectors] = useState([]);
  const [singleTaskDetail, setSingleTaskDetail] = useState([]);
  const [cleaningItems, setCleaningItems] = useState([]);
  const [taskLoading, setTaskLoading] = useState(false);
  const [allTasks, setAllTasks] = useState([]);
  const [pendingTasks, setPendingTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  // eslint-disable-next-line no-unused-vars

  const [activeCleaners, setActiveCleaners] = useState();
  const [activeInspectors, setActiveInspectors] = useState();
  const [activeCleaningItems, setActiveCleaningItems] = useState();
  const [everyTask, setEveryTask] = useState();

  const storedId = '';
  const getUnAssignedRooms = async () => {
    await axios
      .get(`${BASE_URL}room/unassigned-rooms`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setUnAssignedRooms(response.data.data.roomsNotInTasks);
      })
      .catch((error) => {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
            console.log('An error occured', data.message);
          } else if (status === 403 && data && data.message) {
            console.log('An error with status 403 occured', data.message);
            setResponseMessage(data.message);
            // navigate('/')
          } else {
            console.log('Axios error:', error);
          }
        } else {
          console.log('Network error:', error.message);
        }
      });
  };

  const getAllCleaners = async () => {
    await axios
      .get(`${BASE_URL}get-all-cleaner`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setActiveCleaners(response.data.data.allCleaners.length);
        setAllCleaners(response.data.data.allCleaners);
      })
      .catch((error) => {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
            console.log('An error occured', data.message);
          } else if (status === 403 && data && data.message) {
            console.log('An error with status 403 occured', data.message);
            setResponseMessage(data.message);
            // send user back to the login page!
            // navigate('/')
          } else {
            console.log('Axios error:', error);
          }
        } else {
          console.log('Network error:', error.message);
        }
      });
  };

  const getAllInspectors = async () => {
    await axios
      .get(`${BASE_URL}get-all-inspector`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setActiveInspectors(response.data.data.allInspectors.length);
        setAllInspectors(response.data.data.allInspectors);
      })
      .catch((error) => {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
            console.log('An error occured', data.message);
          } else if (status === 403 && data && data.message) {
            console.log('An error with status 403 occured', data.message);
            setResponseMessage(data.message);
            // navigate('/')
            // send user back to the login page!
          } else {
            console.log('Axios error:', error);
          }
        } else {
          console.log('Network error:', error.message);
        }
      });
  };
  const getCleaningItems = async () => {
    await axios
      .get(`${BASE_URL}cleaning-items`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log('dang', response);
        setActiveCleaningItems(response.data.data.allItems.length);
        console.log('aaa====================================');
        console.log(response);
        console.log('====================================');
        setCleaningItems(response.data.data.allItems);
      })
      .catch((error) => {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
            console.log('An error occured', data.message);
          } else if (status === 403 && data && data.message) {
            console.log('An error with status 403 occured', data.message);
            setResponseMessage(data.message);
            // navigate('/')
            // send user back to the login page!
          } else {
            console.log('Axios error:', error);
          }
        } else {
          console.log('Network errorasy:', error.message);
        }
      });
  };
  const addTask = async (data) => {
    setTaskLoading(true);
    await axios
      .post(
        `${BASE_URL}task/create`,

        data,
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        console.log(response);
        // send user back to the task home page
        if (response.data) {
          setTaskLoading(false);
        }

        // console.log(response.json())
      })
      .catch((error) => {
        if (error.response) {
          setTaskLoading(false);
          const { status, data } = error.response;

          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
            console.log('An error occured', data.message);
          } else if (status === 403 && data && data.message) {
            // navigate('/')
          } else {
            console.log('Axios error:', error);
          }
        } else {
          setTaskLoading(false);
          console.log('Network error:', error.message);
        }
      });
  };

  const getAllTasks = async () => {
    startLoading();
    try {
      const response = await axios.get(`${BASE_URL}task/get`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      //   console.log('Task retrieved', response.data.data);
      setEveryTask(response.data.data.allTasks.length);
      setAllTasks(response.data.data.allTasks);
      setPendingTasks(
        response.data.data.allTasks.filter((task) => task.isSubmitted === false)
      );
      setCompletedTasks(
        response.data.data.allTasks.filter((task) => task.isSubmitted === true)
      );
    } catch (error) {
      if (error.response) {
        const { status, data } = error.response;
        console.log('An error occurred', data.message || 'Error');
        setResponseMessage(data.message || 'Error');

        if (status === 403) {
          // Use navigate to redirect
          //   navigate('/'); // Make sure navigate is passed correctly if used outside of a component
        }
      } else {
        console.log('Network error:', error.message);
      }
    } finally {
      stopLoading();
    }
  };

  const getTaskById = async (taskId) => {
    await axios
      .get(`${BASE_URL}task/get-single-task?taskId=${taskId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setSingleTaskDetail(response.data.data);
      })
      .catch((error) => {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
            console.log('An error occured', data.message);
          } else if (status === 403 && data && data.message) {
            // navigate('/')
          } else {
            console.log('Axios error:', error);
          }
        } else {
          console.log('Network error:', error.message);
        }
      });
  };

  const updateTask = async (taskId, cleanerId, inspectorId, roomId) => {
    await axios
      .put(
        `${BASE_URL}task/update-task`,
        {
          taskId: taskId,
          inspectorId: inspectorId,
          cleanerId: cleanerId,
          roomId: roomId,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        setResponseMessage(response.data.message);
        navigate('/dashboard/tasks');
      })
      .catch((error) => {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
            console.log('An error occured', data.message);
          } else if (status === 403 && data && data.message) {
            // navigate('/')
          } else {
            console.log('Axios error:', error);
          }
        } else {
          console.log('Network error:', error.message);
        }
      });
  };
  const deleteTask = async (taskId) => {
    await axios
      .delete(`${BASE_URL}task/delete-task`, {
        data: { taskId: taskId },
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
            console.log('An error occured', data.message);
          } else if (status === 403 && data && data.message) {
            // navigate('/')
          } else {
            console.log('Axios error:', error);
          }
        } else {
          console.log('Network error:', error.message);
        }
      });
  };

  return {
    getUnAssignedRooms,
    getAllCleaners,
    getAllInspectors,
    unAssignedRooms,
    allCleaners,
    allInspectors,
    addTask,
    getAllTasks,
    allTasks,
    deleteTask,
    activeCleaners,
    everyTask,
    activeInspectors,
    getTaskById,
    singleTaskDetail,
    updateTask,
    responseMessage,
    getCleaningItems,
    cleaningItems,
    activeCleaningItems,
    taskLoading,
    pendingTasks,
    completedTasks,
    loading,
  };
};
export default useTaskDetails;