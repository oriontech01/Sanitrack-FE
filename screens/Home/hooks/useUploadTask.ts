import { useContext, useEffect, useState } from 'react';
import useLoading from '../../general_hooks/useLoading';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';
import Constants from 'expo-constants';
const useUploadTask = () => {
  const { loading, startLoading, stopLoading } = useLoading();

  const { token } = useContext(UserContext);
  const uploadTask = async (bodyData, id) => {
    startLoading();

    try {
      const response = await axios.post(
        `${Constants.expoConfig.extra.baseUrl}cleaner-dashboard/room-details`,
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
    uploading: loading,
    uploadTask,
  };
};

export default useUploadTask;
