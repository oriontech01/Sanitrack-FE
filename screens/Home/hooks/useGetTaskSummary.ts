import { useContext, useEffect, useState } from 'react';
import useLoading from '../../general_hooks/useLoading';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';
import Constants from 'expo-constants';
const useGetTaskSummary = (id) => {
  const { loading, startLoading, stopLoading } = useLoading();
  const [summary, setSummary] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const refetch = () => {
    setRefresh((prev) => prev + 1);
  };
  const { token, role } = useContext(UserContext);
  const getSummary = async () => {
    const api = role == 'Inspector' ? 'inspector' : 'cleaner-dashboard';
    startLoading();

    try {
      console.log('start');
      const response = await axios.get(
        `${Constants.expoConfig.extra.baseUrl}cleaner-dashboard/summary?taskId=${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data.data);
      stopLoading();

      setSummary(response.data.data);
    } catch (error) {
      console.error(error);
      stopLoading();
    }
  };

  useEffect(() => {
    getSummary();
  }, []);
  return {
    loadingSummary: loading,
    getSummary,
    summary,
  };
};

export default useGetTaskSummary;
