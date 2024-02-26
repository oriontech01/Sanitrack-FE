import { useContext, useEffect, useState } from 'react';
import useLoading from '../../general_hooks/useLoading';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';
import Constants from 'expo-constants';
const useGetLocation = () => {
  const { loading, startLoading, stopLoading } = useLoading();
  const [locations, setLocations] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const refetch = () => {
    setRefresh((prev) => prev + 1);
  };
  const { token, role } = useContext(UserContext);
  const getLocations = async () => {
    const api = role == 'Inspector' ? 'inspector' : 'cleaner-dashboard';
    startLoading();

    try {
      const response = await axios.get(
        `${Constants.expoConfig.extra.baseUrl}${api}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      setLocations(response.data.data);
      console.log(response.data.data);
      stopLoading();
    } catch (error) {
      stopLoading();
    }
  };

  useEffect(() => {
    getLocations();
  }, []);
  return {
    loadingLocation: loading,
    getLocations,
    locations,
  };
};

export default useGetLocation;
