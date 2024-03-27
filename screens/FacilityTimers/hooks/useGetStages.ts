import React, { useContext, useEffect, useState } from 'react';
import useLoading from '../../general_hooks/useLoading';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';
import Constants from 'expo-constants';
import { useFocusEffect } from '@react-navigation/native';
const useGetStages = (id) => {
  const { loading, startLoading, stopLoading } = useLoading();
  const [stages, setFacilities] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const refetch = () => {
    setRefresh((prev) => prev + 1);
  };
  const { token, role } = useContext(UserContext);
  const getStages = async () => {
    const api = role == 'Inspector' ? 'inspector' : 'inspector';
    startLoading();

    try {
      const response = await axios.get(
        `${Constants.expoConfig.extra.baseUrl}${api}/facility-stages?work_order_id=${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setFacilities(response.data.data);
      console.log(response.data.data, 'asss');
      stopLoading();
    } catch (error) {
      stopLoading();
    }
  };
  useEffect(() => {
    getStages();
  }, [refresh]);

  return {
    loadingStages: loading,
    getStages,
    stages,
    refetch,
  };
};

export default useGetStages;
