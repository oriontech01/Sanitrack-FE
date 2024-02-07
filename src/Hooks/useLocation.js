// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

const useLocation = () => {
  // const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_LOCAL_URL;
  // const LOCAL_URL = process.env.REACT_APP_LOCAL_URL;
  const access_token = localStorage.getItem("auth-token");

  const [allLocations, setLocation] = useState([])
  // const [responseMessage, setResponseMessage] = useState();

  const getLocation = async () => {
    await axios
      .get(`${BASE_URL}locations`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        setLocation(response.data.data.allLocations);
      })
      .catch((error) => {
        if (error.response) {
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
        }
      });
  };

  return {
    getLocation,
    allLocations
  };
};
export default useLocation;
