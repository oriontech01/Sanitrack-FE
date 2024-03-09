import React, { useContext, useEffect, useState } from 'react';
import useLoading from '../../general_hooks/useLoading';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';
import Constants from 'expo-constants';
import { useFocusEffect } from '@react-navigation/native';
const useGetRequestDetail = (id) => {
  const { loading, startLoading, stopLoading } = useLoading();
  const [item, setItems] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const refetch = () => {
    setRefresh((prev) => prev + 1);
  };
  const { token } = useContext(UserContext);
  const useGetItemDetail = async () => {
    startLoading();

    try {
      const response = await axios.get(
        `${Constants.expoConfig.extra.baseUrl}inspector/cleaning-items?taskId=${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );

      setItems(response.data.data);

      stopLoading();
    } catch (error) {
      stopLoading();
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      useGetItemDetail();
    }, [refresh])
  );

  return {
    loadingItem: loading,
    useGetItemDetail,
    item,
  };
};

export default useGetRequestDetail;
