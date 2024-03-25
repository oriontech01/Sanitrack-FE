// import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext, useState, useCallback } from "react";
import { UserContext } from "../../../context/UserContext";
import Constants from "expo-constants";
import { Alert } from "react-native";
const useTask = () => {
  const BASE_URL = Constants.expoConfig.extra.baseUrl;
  const { token: access_token } = useContext(UserContext);
  const [loading, setLoading] = useState(false);
  const [allTask, setTask] = useState([]);
  const [monthlyMissed, setMonthlyMissed] = useState([]);
  const [mssData, setMssData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [workOrderFacilityId, setWorkOrderFacilityId] = useState("");
  // const [responseMessage, setResponseMessage] = useState();

  const getTask = async () => {
    setLoading(true);
    await axios
      .get(`${BASE_URL}task/get`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        if (response.data) {
          setTask(response.data.data.allTasks);
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

  const getMSSTableData = useCallback(
    async (page = currentPage, limit) => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${BASE_URL}/task/mss?page=${page}&limit=${limit}`,
          {
            headers: {
              Authorization: `Bearer ${access_token}`, // Ensure access_token is defined or managed appropriately
            },
          }
        );

        if (res && res.data && res.data.data) {
          setMssData(res.data.data.taskData);
          setTotalPages(res.data.data.totalPages); // Update based on your actual API response
        }
      } catch (error) {
        console.error("Error fetching MSS data:", error);
      } finally {
        setLoading(false);
      }
    },
    [currentPage]
  );
  const getMonthlyMissed = async () => {
    await axios
      .get(`${BASE_URL}task/missed-cleaning`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        setMonthlyMissed(response.data.data);
        // console.log("Monthly Missed",response.data.data)
      })
      .catch((error) => {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            console.log("An error occured", data.message);
          } else if (status === 403 && data && data.message) {
            console.log("An error with status 403 occured", data.message);
          } else {
            console.log("Axios error:", error);
          }
        } else {
          console.log("Network error:", error.message);
        }
      });
  };

  const assignInspectorsForFacility = async (data) => {
    await axios
      .post(`${BASE_URL}work-facility/add`, data, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        if (response.data) {
          Alert.alert("Success", "Added inspector successfully");
          console.log("Work order facility ID", response.data.data._id);
          setWorkOrderFacilityId(response.data.data._id);
        }
      })
      .catch((error) => {
        console.log("Network error:", error.message);
      });
  };

  return {
    getTask,
    allTask,
    loading,
    getMSSTableData,
    mssData,
    getMonthlyMissed,
    monthlyMissed,
    currentPage,
    setCurrentPage,
    totalPages,
    assignInspectorsForFacility,
    workOrderFacilityId,
  };
};
export default useTask;
