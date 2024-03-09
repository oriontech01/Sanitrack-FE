import React, { useContext, useEffect, useState } from 'react';
import useLoading from '../../general_hooks/useLoading';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';
import Constants from 'expo-constants';
import { useFocusEffect } from '@react-navigation/native';
const useGetTaksHistory = () => {
  const { loading, startLoading, stopLoading } = useLoading();
  const [history, setHistory] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const refetch = () => {
    setRefresh((prev) => prev + 1);
  };
  const { token, role } = useContext(UserContext);
  const getHistory = async () => {
    const api = role == 'Inspector' ? 'inspector' : 'cleaner-dashboard';
    startLoading();

    try {
      const response = await axios.get(
        `${Constants.expoConfig.extra.baseUrl}${api}/task-summary`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data.data.tasks, 'iooo');
      setHistory(response.data.data.tasks);

      stopLoading();
    } catch (error) {
      stopLoading();
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      getHistory();
    }, [refresh])
  );

  return {
    loadingHistory: loading,
    getHistory,
    history,
  };
};

export default useGetTaksHistory;
