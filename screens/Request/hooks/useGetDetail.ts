import React, { useContext, useEffect, useState } from 'react';
import useLoading from '../../general_hooks/useLoading';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';
import Constants from 'expo-constants';
import { useFocusEffect } from '@react-navigation/native';
const useGetDetail = (id, request) => {
  const { loading, startLoading, stopLoading } = useLoading();
  const [item, setItems] = useState(null);
  const [refresh, setRefresh] = useState(0);
  const refetch = () => {
    setRefresh((prev) => prev + 1);
  };
  const { token } = useContext(UserContext);
  const useGetItemDetail = async () => {
    startLoading();

    try {
      const response = await axios.get(
        `${Constants.expoConfig.extra.baseUrl}inspector/request-detail?taskId=${id}&requestId=${request}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data.data);
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

export default useGetDetail;
