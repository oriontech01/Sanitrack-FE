import { useContext, useEffect, useState } from 'react';
import useLoading from '../../general_hooks/useLoading';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';
import Constants from 'expo-constants';
const useGetCleanerWork = (id) => {
  const { loading, startLoading, stopLoading } = useLoading();
  const [detailList, setDetails] = useState([]);
  const [task, setTask] = useState([]);
  const [taskId, setTaskId] = useState('');
  const [refresh, setRefresh] = useState(0);
  const refetch = () => {
    setRefresh((prev) => prev + 1);
  };
  const { token, role } = useContext(UserContext);
  const getDetails = async () => {
    const api = role == 'Inspector' ? 'inspector' : 'cleaner-dashboard';
    startLoading();

    try {
      console.log('start');
      const response = await axios.get(
        `${Constants.expoConfig.extra.baseUrl}cleaner-dashboard/room-task?roomId=${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data.data, 'yayi');
      setDetails(response.data.data);

      stopLoading();
    } catch (error) {
      console.log(error);
      stopLoading();
    }
  };

  useEffect(() => {
    getDetails();
  }, []);
  return {
    loadingDetails: loading,
    getDetails,
    detailList,
    task,
    taskId,
  };
};

export default useGetCleanerWork;
