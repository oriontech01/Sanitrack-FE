// File contains CRUD operations for staffs
import axios from "axios";
import { useState, useContext } from "react";
import Constants from "expo-constants";
import { UserContext } from "../context/UserContext";
import { Alert } from "react-native";

const useStaff = () => {
  const BASE_URL = Constants.expoConfig.extra.baseUrl;
  const [responseMessage, setResponseMessage] = useState();
  const [allStaffs, setAllStaffs] = useState([]);
  const [staffByName, setStaffByName] = useState([]);
  // const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [allCleaners, setAllCleaners] = useState([]);
  const [allInspectors, setAllInspectors] = useState([]);
  const user = useContext(UserContext);
  const access_token = user.token;

  const addStaff = async (dataToPass) => {
    await axios
      .post(`${BASE_URL}create-user`, dataToPass, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        setResponseMessage("Staff Added.");
        Alert.alert("User", "User has been added!");
        console.log("Here is staff added response", response.json());
      })
      .catch((error) => {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
            console.log("An error occurred", data.message);
          } else {
            console.log("Axios error:", data.err.details[0].message);
            alert(data.err.details[0].message);
          }
        } else {
          console.log("Network error:", error.message);
        }
      });
  };

  const getStaffById = async (userId) => {
    try {
      const response = await axios.get(`${BASE_URL}get-user?userId=${userId}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      });
      const userDetails = response.data; // Adjust based on your user data structure
      // console.log(`User Details for ID ${userId}:`, userDetails);
      return userDetails;
    } catch (error) {
      console.error(`Error fetching user details for ID ${userId}:`, error);
      return null;
    }
  };

  const getStaffByUserName = async (name) => {
    await axios
      .get(`${BASE_URL}staff/?userName=${name}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        setStaffByName(response.data.data);
      })
      .catch((error) => {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
            console.log("An error occurred", data.message);
          } else {
            console.log("Axios error:", error);
          }
        } else {
          console.log("Network error:", error.message);
        }
      });
  };
  const getAllStaffs = async (page, itemPerPage) => {
    setIsLoading(true);
    await axios
      .get(
        `${BASE_URL}get-all-users?page=${page}&documentCount=${itemPerPage}`,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        setIsLoading(false);
        setAllStaffs(response.data.data.allUsers);
        setTotalPages(Math.ceil(response.data.data.totalUsers / itemPerPage));
      })
      .catch((error) => {
        setIsLoading(false);
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
            console.log("An error occurred", data.message);
          } else {
            console.log("Axios error:", error);
          }
        } else {
          console.log("Network error:", error.message);
        }
      });
  };

  const fireStaff = async (staffId) => {
    await axios
      .put(
        `${BASE_URL}delete-user`,
        {
          staffId: staffId,
        },
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
            console.log("An error occurred", data.message);
          } else {
            console.log("Axios error:", error);
          }
        } else {
          console.log("Network error:", error.message);
        }
      });
  };

  const restoreStaff = async (staffId) => {
    await axios
      .put(
        `${BASE_URL}update-user-status`,
        {
          staffId: staffId,
        },
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
            console.log("An error occurred", data.message);
          } else {
            console.log("Axios error:", error);
          }
        } else {
          console.log("Network error:", error.message);
        }
      });
  };
  const getAllCleaners = async () => {
    try {
      const res = await axios.get(`${BASE_URL}get-all-cleaner`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setAllCleaners(res.data.data.allCleaners);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllInspectors = async () => {
    try {
      const res = await axios.get(`${BASE_URL}get-all-inspector`, {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      setAllInspectors(res.data.data.allInspectors);
    } catch (error) {
      console.log(error);
    }
  };
  return {
    addStaff,
    responseMessage,
    getStaffById,
    getStaffByUserName,
    staffByName,
    getAllStaffs,
    allStaffs,
    fireStaff,
    restoreStaff,
    totalPages,
    isLoading,
    getAllCleaners,
    getAllInspectors,
    allCleaners,
    allInspectors,
  };
};

export default useStaff;
