// File contains CRUD operations for staffs
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useStaff = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const LOCAL_URL = import.meta.env.VITE_LOCAL_URL;

  const navigate = useNavigate();

  const [responseMessage, setResponseMessage] = useState();
  const [allStaffs, setAllStaffs] = useState([]);
  const [staffByName, setStaffByName] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const access_token = localStorage.getItem("auth-token");

  const addStaff = async (dataToPass) => {
    await axios
      .post(`${BASE_URL}create-user`, dataToPass, {
        headers: {Authorization: `Bearer ${access_token}`}
      })
      .then((response) => {
        setResponseMessage("Staff Added.");
        navigate("/home/user")
      })
      .catch((error) => {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
            console.log("An error occured", data.message);
          } else {
            console.log("Axios error:", data.err.details[0].message);
            alert(data.err.details[0].message)
          }
        } else {
          console.log("Network error:", error.message);
        }
      });
  };

  const getStaffById = async (userId) => {
    try {
      const response = await axios.get(
        `${BASE_URL}get-user?userId=${userId}`,
        { headers: { Authorization: `Bearer ${access_token}` } }
      );
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
      .get(`${BASE_URL}staff/?userName=${name}`, 
      { headers: { Authorization: `Bearer ${access_token}` } })
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
    await axios
      .get(
        `${BASE_URL}get-all-users?page=${page}&documentCount=${itemPerPage}`,
        {
          headers: { Authorization: `Bearer ${access_token}` },
        }
      )
      .then((response) => {
        setAllStaffs(response.data.data.allUsers);
        setTotalPages(Math.ceil(response.data.data.totalUsers / itemPerPage));
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
        navigate("/home/user");
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
        navigate("/home/user");
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
  };
};

export default useStaff;
