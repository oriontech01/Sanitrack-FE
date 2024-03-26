import { useState, useContext } from "react";
import axios from "axios";
import { UserContext } from "../../../context/UserContext";
import Constants from "expo-constants";

const useMss = () => {
  const [mssData, setMssData] = useState([]);
  const { token: access_token } = useContext(UserContext);
  const BASE_URL = Constants.expoConfig.extra.baseUrl;

  const getMSSTableData = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}/task/mss`, // Adjust limit as needed
        {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );
      console.log(response.data.data)
      if (response.data && response.data.data) {
        setMssData(response.data.data); // Make sure this matches the actual path to your data in the response
      }
    } catch (error) {
      console.error("Error fetching MSS data:", error);
    }
  };
  return { mssData, getMSSTableData };
};

export default useMss;
