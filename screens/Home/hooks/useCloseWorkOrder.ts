import { useContext, useEffect, useState } from 'react';
import useLoading from '../../general_hooks/useLoading';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';
import Constants from 'expo-constants';
const useCloseWorkOrder = () => {
  const { loading, startLoading, stopLoading } = useLoading();

  const { token } = useContext(UserContext);
  const closeWorkOrder = async (bodyData, id) => {
    startLoading();

    try {
      console.log(bodyData, id);
      const response = await axios.post(
        `${Constants.expoConfig.extra.baseUrl}inspector/close?taskId=${id}`,
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
    closing: loading,
    closeWorkOrder,
  };
};

export default useCloseWorkOrder;
