import React, { useContext, useEffect, useState } from 'react';
import useLoading from '../../general_hooks/useLoading';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';
import Constants from 'expo-constants';
import { useFocusEffect } from '@react-navigation/native';
const useGetAllCleaningItems = () => {
  const { loading, startLoading, stopLoading } = useLoading();
  const [items, setItems] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const refetch = () => {
    setRefresh((prev) => prev + 1);
  };
  const { token, role } = useContext(UserContext);
  const getItems = async () => {
    startLoading();

    try {
      const response = await axios.get(
        `${Constants.expoConfig.extra.baseUrl}cleaning-items`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setItems(response.data.data.allItems);
      console.log(response.data.data);
      stopLoading();
    } catch (error) {
      console.log(error);
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

export default useGetAllCleaningItems;
