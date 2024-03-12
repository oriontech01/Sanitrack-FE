import { useContext, useEffect, useState } from 'react';
import useLoading from '../../general_hooks/useLoading';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';
import Constants from 'expo-constants';
const useGetCleaningItems = (id) => {
  const { loading, startLoading, stopLoading } = useLoading();
  const [cleaningItems, setCleaningItems] = useState([]);
  const [planned_time, setPlanned_time] = useState('');
  const [task, setTask] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const refetch = () => {
    setRefresh((prev) => prev + 1);
  };
  const { token, role } = useContext(UserContext);
  const getCleaningItems = async () => {
    const api = role == 'Inspector' ? 'inspector' : 'cleaner-dashboard';
    startLoading();

    try {
      console.log(id);
      const response = await axios.get(
        `${Constants.expoConfig.extra.baseUrl}${api}/cleaning-items?taskId=${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      stopLoading();
      console.log(response.data.data, 'ooooo');
      setPlanned_time(response.data.data.planned_time);
      setCleaningItems(response.data.data);
      setTask([]);
    } catch (error) {
      console.log(error);
      stopLoading();
    }
  };

  useEffect(() => {
    getCleaningItems();
  }, []);
  return {
    loadingItems: loading,
    getCleaningItems,
    cleaningItems,
    task,
    planned_time,
  };
};

export default useGetCleaningItems;
