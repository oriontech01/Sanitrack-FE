import React, { useContext, useEffect, useState } from 'react';
import useLoading from '../../general_hooks/useLoading';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';
import Constants from 'expo-constants';
import { useFocusEffect } from '@react-navigation/native';
const useGetFacilities = () => {
  const { loading, startLoading, stopLoading } = useLoading();
  const [facilities, setFacilities] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const refetch = () => {
    setRefresh((prev) => prev + 1);
  };
  const { token, role } = useContext(UserContext);
  const getAllFacilities = async () => {
    const api = role == 'Inspector' ? 'inspector' : 'inspector';
    startLoading();

    try {
      const response = await axios.get(
        `${Constants.expoConfig.extra.baseUrl}${api}/assigned-facilties`,
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
      console.log(error);
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

export default useGetFacilities;
