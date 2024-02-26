import { useContext, useEffect, useState } from 'react';
import useLoading from '../../general_hooks/useLoading';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';
import Constants from 'expo-constants';
const useStartTime = () => {
  const { loading, startLoading, stopLoading } = useLoading();

  const { token } = useContext(UserContext);
  const saveStartTimer = async (roomId, id) => {
    startLoading();

    try {
      const response = await axios.post(
        `${Constants.expoConfig.extra.baseUrl}cleaner-dashboard/save?taskId=${id}`,
        {
          roomId,
        },
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response, 'confirmed');
      stopLoading();
      return true;
    } catch (error) {
      stopLoading();
      return false;
    }
  };

  return {
    confirming: loading,
    saveStartTimer,
  };
};

export default useStartTime;
