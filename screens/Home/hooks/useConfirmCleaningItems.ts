import { useContext, useEffect, useState } from 'react';
import useLoading from '../../general_hooks/useLoading';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';
import Constants from 'expo-constants';
const useConfirmCleaningItems = () => {
  const { loading, startLoading, stopLoading } = useLoading();

  const { token } = useContext(UserContext);
  const confirmCleaningItems = async (bodyData, id) => {
    startLoading();

    try {
      console.log(bodyData, id);
      const response = await axios.post(
        `${Constants.expoConfig.extra.baseUrl}cleaner-dashboard/confirm?taskId=${id}`,
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
      console.log(error, 'confirmed');
      stopLoading();
      return false;
    }
  };

  return {
    confirming: loading,
    confirmCleaningItems,
  };
};

export default useConfirmCleaningItems;
