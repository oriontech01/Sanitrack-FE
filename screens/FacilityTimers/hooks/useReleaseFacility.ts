import React, { useContext, useEffect, useState } from 'react';
import useLoading from '../../general_hooks/useLoading';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';
import Constants from 'expo-constants';
import { useFocusEffect } from '@react-navigation/native';
const useReleaseFacility = () => {
  const { loading, startLoading, stopLoading } = useLoading();
  const [stages, setFacilities] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const refetch = () => {
    setRefresh((prev) => prev + 1);
  };
  const { token, role } = useContext(UserContext);
  const releaseFacility = async (id) => {
    const api = role == 'Inspector' ? 'inspector' : 'inspector';
    startLoading();
    console.log(
      `${Constants.expoConfig.extra.baseUrl}${api}/facility-release?work_order_id=${id}`
    );

    try {
      const response = await axios.post(
        `${Constants.expoConfig.extra.baseUrl}${api}/facility-release?work_order_id=${id}`,
        {},
        {
          headers: {
            Authorization: token,
          },
        }
      );
      stopLoading();
      if (response.status === 200) {
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log(error);
      stopLoading();
      return false;
    }
  };

  return {
    releasing: loading,
    releaseFacility,
  };
};

export default useReleaseFacility;
