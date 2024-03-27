import { useContext, useEffect, useState } from 'react';
import useLoading from '../../general_hooks/useLoading';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';
import Constants from 'expo-constants';
const useStopTime = () => {
  const { loading, startLoading, stopLoading } = useLoading();

  const { token, role } = useContext(UserContext);
  const stopTime = async (name, id, startId) => {
    const api = role == 'Inspector' ? 'inspector' : 'inspector';
    startLoading();

    try {
      const response = await axios.post(
        `${Constants.expoConfig.extra.baseUrl}${api}/facility-actual-stop?work_order_id=${id}&start_stage_id=${startId}`,
        {
          stage_name: name,
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
      console.log(error);
      stopLoading();
      return false;
    }
  };

  return {
    confirming: loading,
    stopTime,
  };
};

export default useStopTime;
