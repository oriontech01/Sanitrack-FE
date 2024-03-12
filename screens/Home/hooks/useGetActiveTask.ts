import React, { useContext, useEffect, useState } from 'react';
import useLoading from '../../general_hooks/useLoading';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';
import Constants from 'expo-constants';
import { useFocusEffect } from '@react-navigation/native';
const useGetActiveTask = () => {
  const { loading, startLoading, stopLoading } = useLoading();
  const [activeTask, setActiveTask] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const refetch = () => {
    setRefresh((prev) => prev + 1);
  };
  const { token, role } = useContext(UserContext);
  const useGetActiveTask = async () => {
    const api = role == 'Inspector' ? 'inspector' : 'cleaner-dashboard';
    startLoading();

    try {
      const response = await axios.get(
        `${Constants.expoConfig.extra.baseUrl}${api}/active-task`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setActiveTask(response.data.data);
      console.log(response.data, 'iooo');
      stopLoading();
    } catch (error) {
      stopLoading();
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      useGetActiveTask();
    }, [refresh])
  );

  return {
    loadingActiveTask: loading,
    useGetActiveTask,
    activeTask,
  };
};

export default useGetActiveTask;
