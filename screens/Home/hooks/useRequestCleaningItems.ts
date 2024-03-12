import { useContext, useEffect, useState } from 'react';
import useLoading from '../../general_hooks/useLoading';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';
import Constants from 'expo-constants';
const useRequestCleaningItems = () => {
  const { loading, startLoading, stopLoading } = useLoading();

  const { token } = useContext(UserContext);
  const requestCleaningItems = async (bodyData, id) => {
    startLoading();

    try {
      console.log(bodyData, id);
      const response = await axios.post(
        `${Constants.expoConfig.extra.baseUrl}cleaner-dashboard/request?taskId=${id}`,
        bodyData,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data.data);
      stopLoading();
      return true;
    } catch (error) {
      console.log(error);
      stopLoading();
      return false;
    }
  };

  return {
    requesting: loading,
    requestCleaningItems,
  };
};

export default useRequestCleaningItems;
