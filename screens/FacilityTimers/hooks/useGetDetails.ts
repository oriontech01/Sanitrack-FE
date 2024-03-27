import React, { useContext, useEffect, useState } from 'react';
import useLoading from '../../general_hooks/useLoading';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';
import Constants from 'expo-constants';
import { useFocusEffect } from '@react-navigation/native';
const useGetDetails = (id) => {
  const { loading, startLoading, stopLoading } = useLoading();
  const [facility, setFacility] = useState(null);
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
        `${Constants.expoConfig.extra.baseUrl}/work-facility/single?work_order_id=${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setFacility(response.data.data);
      console.log(response.data, 'asss2');
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
    facility,
  };
};

export default useGetDetails;
