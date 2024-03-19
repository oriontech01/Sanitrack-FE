import { useContext, useEffect, useState } from 'react';
import useLoading from '../../general_hooks/useLoading';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';
import Constants from 'expo-constants';
const useCreateTask = () => {
  const { loading, startLoading, stopLoading } = useLoading();

  const { token } = useContext(UserContext);
  const createTask = async (bodyData) => {
    startLoading();

    try {
      const response = await axios.post(
        `${Constants.expoConfig.extra.baseUrl}task/create`,
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
    submitting: loading,
    createTask,
  };
};

export default useCreateTask;
