import { useContext, useEffect, useState } from 'react';
import useLoading from '../../general_hooks/useLoading';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';
import Constants from 'expo-constants';
const useApproveTask = () => {
  const { loading, startLoading, stopLoading } = useLoading();

  const { token } = useContext(UserContext);
  const approveTask = async (bodyData, id) => {
    startLoading();
    console.log(bodyData);
    try {
      const response = await axios.put(
        `${Constants.expoConfig.extra.baseUrl}inspector/approve-task?taskId=${id}`,
        bodyData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data.data, 'confirmed');
      stopLoading();
      return true;
    } catch (error) {
      console.log(error);
      stopLoading();
      return false;
    }
  };

  return {
    approving: loading,
    approveTask,
  };
};

export default useApproveTask;
