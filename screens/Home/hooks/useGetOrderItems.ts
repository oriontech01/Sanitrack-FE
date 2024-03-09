import React, { useContext, useEffect, useState } from 'react';
import useLoading from '../../general_hooks/useLoading';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';
import Constants from 'expo-constants';
import { useFocusEffect } from '@react-navigation/native';
const useGetOrderItems = (id) => {
  const { loading, startLoading, stopLoading } = useLoading();
  const [items, setActiveTask] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const refetch = () => {
    setRefresh((prev) => prev + 1);
  };
  const { token } = useContext(UserContext);
  const getItems = async () => {
    startLoading();

    try {
      const response = await axios.get(
        `${Constants.expoConfig.extra.baseUrl}inspector/all-items?taskId=${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setActiveTask(response.data.data);
      console.log(response.data.data, 'iooo0');
      stopLoading();
    } catch (error) {
      stopLoading();
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      getItems();
    }, [refresh])
  );

  return {
    loadingItems: loading,
    getItems,
    items,
  };
};

export default useGetOrderItems;
