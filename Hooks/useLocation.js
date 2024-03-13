// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useState } from "react";
import Constants from "expo-constants";
import { UserContext } from "../context/UserContext";
import { Alert } from "react-native";

const useLocation = () => {
  const BASE_URL = Constants.expoConfig.extra.baseUrl;
  const user = useContext(UserContext);
  const access_token = user.token;
  const [loading, setLoading] = useState(false);
  const [allLocations, setLocation] = useState([]);
  // const [responseMessage, setResponseMessage] = useState();

  const getLocation = async () => {
    setLoading(true);
    await axios
      .get(`${BASE_URL}locations`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        setLocation(response.data.data.allLocations);
        if (response.data) {
          setLoading(false);
        }
      })
      .catch((error) => {
        if (error.response) {
          setLoading(false);
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            // setResponseMessage(data.message);
            console.log("An error occured", data.message);
          } else if (status === 403 && data && data.message) {
            console.log("An error with status 403 occured", data.message);
            // setResponseMessage(data.message);
          } else {
            console.log("Axios error:", error);
          }
        } else {
          console.log("Network error:", error.message);
          setLoading(false);
        }
      });
  };
  const addLocation = async (country, state, city, postalCode) => {
        try {
          const res = await axios.post(
            `${BASE_URL}/locations/add`,
            { country, state, city, postal_code: postalCode },
            { headers: { Authorization: `Bearer ${access_token}` } }
          );
          console.log(res.data);
          Alert.alert("Message",res.data.message);
        } catch (error) {
          console.error('Error adding location', error);
          Alert.alert('Error adding location');
        }
  };


  return {
    addLocation,
    getLocation,
    allLocations,
    loading,
  };
};
export default useLocation;
