import { useContext, useEffect, useState } from 'react';
import useLoading from '../../general_hooks/useLoading';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';
import Constants from 'expo-constants';
const useSubmitTask = () => {
  const { loading, startLoading, stopLoading } = useLoading();

  const { token } = useContext(UserContext);
  const submitTask = async (bodyData, id) => {
    startLoading();

    try {
      const response = await axios.post(
        `${Constants.expoConfig.extra.baseUrl}cleaner-dashboard/save?taskId=${id}`,
        bodyData,
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
    submitting: loading,
    submitTask,
  };
};

export default useSubmitTask;
