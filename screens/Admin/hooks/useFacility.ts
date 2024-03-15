import React, { useContext, useEffect, useState } from 'react';
import useLoading from '../../general_hooks/useLoading';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';
import Constants from 'expo-constants';
import { useFocusEffect } from '@react-navigation/native';
const useFacility = (id) => {
  const { loading, startLoading, stopLoading } = useLoading();
  const {
    loading: updating,
    startLoading: startUpdating,
    stopLoading: stopUpdating,
  } = useLoading();
  const [facilities, setFacilities] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const refetch = () => {
    setRefresh((prev) => prev + 1);
  };
  const { token } = useContext(UserContext);
  const getAllFacilities = async () => {
    startLoading();

    try {
      const response = await axios.get(
        `${Constants.expoConfig.extra.baseUrl}facility/location?locationId=${id}`,
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

  const addFacility = async (name) => {
    startUpdating();

    try {
      const response = await axios.post(
        `${Constants.expoConfig.extra.baseUrl}facility/add`,
        {
          facility_name: name,
          location_id: id,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setRefresh((pev) => pev + 1);
      //   setFacilities(response.data.data);
      console.log(response.data, 'iooo');

      startUpdating();
      return true;
    } catch (error) {
      stopLoading();
      return false;
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
    addFacility,
    updating,
  };
};

export default useFacility;
