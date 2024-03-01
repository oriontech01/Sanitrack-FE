import React, { useContext, useEffect, useState } from 'react';
import useLoading from '../../general_hooks/useLoading';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';
import Constants from 'expo-constants';
import { useFocusEffect } from '@react-navigation/native';
const useGetAllFacility = () => {
  const { loading, startLoading, stopLoading } = useLoading();
  const [facilities, setFacilities] = useState(0);
  const [refresh, setRefresh] = useState(0);
  const refetch = () => {
    setRefresh((prev) => prev + 1);
  };
  const { token, role } = useContext(UserContext);
  const getAllFacilities = async () => {
    const api = role == 'Inspector' ? 'inspector' : 'cleaner-dashboard';
    startLoading();

    try {
      const response = await axios.get(
        `${Constants.expoConfig.extra.baseUrl}${api}/all-facility`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setFacilities(response.data.data);
      console.log(response.data, 'iooo');
      stopLoading();
    } catch (error) {
      stopLoading();
    }
  };
  useFocusEffect(
    React.useCallback(() => {
      getAllFacilities();
    }, [refresh])
  );

  return {
    loadingFacilities: loading,
    getAllFacilities,
    facilities,
  };
};

export default useGetAllFacility;
