import React, { useContext, useEffect, useState } from 'react';
import useLoading from '../../general_hooks/useLoading';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';
import Constants from 'expo-constants';
import { useFocusEffect } from '@react-navigation/native';
const useInspectorGetCleaningItems = (id) => {
  const { loading, startLoading, stopLoading } = useLoading();
  const [cleaningItems, setLocations] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const refetch = () => {
    setRefresh((prev) => prev + 1);
  };
  const { token } = useContext(UserContext);
  const getCleaningItems = async () => {
    startLoading();

    try {
      console.log('start');
      const response = await axios.get(
        `${Constants.expoConfig.extra.baseUrl}inspector/cleaning-items?taskId=${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setLocations(response.data.data);
      console.log(response.data.data, 'opoeee');
      stopLoading();
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
  };
};

export default useInspectorGetCleaningItems;
