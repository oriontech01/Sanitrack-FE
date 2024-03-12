import { useContext, useEffect, useState } from 'react';
import useLoading from '../../general_hooks/useLoading';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';
import Constants from 'expo-constants';
const useApprove = () => {
  const { loading, startLoading, stopLoading } = useLoading();

  const { token } = useContext(UserContext);
  const approve = async (bodyData, id) => {
    startLoading();

    try {
      const response = await axios.put(
        `${Constants.expoConfig.extra.baseUrl}inspector/approve-cleaning-items?taskId=${id}`,
        bodyData,
        {
          headers: {
            Authorization: token,
          },
        }
      );

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
    approve,
  };
};

export default useApprove;
