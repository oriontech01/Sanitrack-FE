import { useContext, useEffect, useState } from 'react';
import useLoading from '../../general_hooks/useLoading';
import { UserContext } from '../../../context/UserContext';
import axios from 'axios';
import Constants from 'expo-constants';
const useGetFacilities = (id) => {
  const { loading, startLoading, stopLoading } = useLoading();
  const [facilityList, setFacilities] = useState([]);
  const [refresh, setRefresh] = useState(0);
  const refetch = () => {
    setRefresh((prev) => prev + 1);
  };
  const { token, role } = useContext(UserContext);
  const getFacilities = async () => {
    const api = role == 'Inspector' ? 'inspector' : 'cleaner-dashboard';
    startLoading();

    try {
      const response = await axios.get(
        `${Constants.expoConfig.extra.baseUrl}${api}/rooms?locationId=${id}`,
        {
          headers: {
            Authorization: token,
          },
        }
      );
      console.log(response.data.data.inspectorRooms);
      stopLoading();

      setFacilities(
        role == 'Inspector'
          ? response.data.data.inspectorRooms
          : response.data.data.cleanerRooms
      );
    } catch (error) {
      stopLoading();
    }
  };

  useEffect(() => {
    getFacilities();
  }, []);
  return {
    loadingFacilities: loading,
    getFacilities,
    facilityList,
  };
};

export default useGetFacilities;
