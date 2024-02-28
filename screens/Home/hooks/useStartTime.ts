import { useContext, useEffect, useState } from 'react';
import useLoading from '../../general_hooks/useLoading';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';
import Constants from 'expo-constants';
const useStartTime = () => {
  const { loading, startLoading, stopLoading } = useLoading();

  const { token, role } = useContext(UserContext);
  const saveStartTimer = async (roomId, id) => {
    const api = role == 'Inspector' ? 'inspector' : 'cleaner-dashboard';
    startLoading();

    try {
      const response = await axios.post(
        `${Constants.expoConfig.extra.baseUrl}${api}/save?taskId=${id}`,
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
