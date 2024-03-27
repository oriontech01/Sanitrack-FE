import { useState, useContext } from "react";
import axios from "axios";
import Constants from 'expo-constants';
import { UserContext } from "../context/UserContext";

const useRole = () => {
  const BASE_URL = Constants.expoConfig.extra.baseUrl;
  const user = useContext(UserContext)
  const [roles, setAllRoles] = useState([]);
  const [staffRoles, setStaffRoles] = useState([]);
  const [roleForStaff, setRoleForStaff] = useState([]);
  const [responseMessage, setResponseMessage] = useState("");
  const access_token = user.token
  const getRoles = async () => {
    await axios
      .get(`${BASE_URL}/roles/`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        // console.log(`from hhok`, response.data.data.allRole)
        setAllRoles(response.data.data.allRole);
        // console.log(response.data.data.allRooms)
      })
      .catch((error) => {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
            console.log("An error occured", data.message);
          } else if (status === 403 && data && data.message) {
            console.log("An error with status 403 occured", data.message);
            setResponseMessage(data.message);
          } else {
            console.log("Axios error:", error);
          }
        } else {
          console.log("Network error:", error.message);
        }
      });
  };

  // consider this as 'getSTaffRoleById'
  const getStaffRoles = async (staffId) => {
    // console.log(staffId)
    await axios
      .get(`${BASE_URL}user-role/?userId=${staffId}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        console.log(
          `response is`,
          JSON.stringify(response.data.data.userRole, null, 2)
        );
        setStaffRoles(response.data.data.userRole);
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

  const getRoleForStaff = async () => {
    await axios
      .get(`${BASE_URL}roles/staff`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        setRoleForStaff(response.data.data.userRoles);
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

  const assignUserRole = async (roleData) => {
    await axios
      .post(`${BASE_URL}roles/assign`, roleData, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
      })
      .catch((error) => {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
            // console.log("An error occured", data.message);
          } else if (status === 403 && data && data.message) {
          } else {
            console.log("Axios error:", error);
          }
        } else {
          console.log("Network error:", error.message);
        }
      });
  };

  const addRole = async (roleName) => {
    await axios
      .post(
        `${BASE_URL}/roles/add`,
        { role_name: roleName },
        { headers: { Authorization: `Bearer ${access_token}` } }
      )
      .then((response) => {
      })
      .catch((error) => {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
            console.log("An error occured", data.message);
          } else if (status === 403 && data && data.message) {
            console.log("An error with status 403 occured", data.message);
            setResponseMessage(data.message);
          } else {
            console.log("Axios error:", error);
          }
        } else {
          console.log("Network error:", error.message);
        }
      });
  };

  const deleteRole = async (roleId) => {
    await axios
      .delete(`${BASE_URL}roles/delete?roleId=${roleId}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .catch((error) => {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
            console.log("An error occured", data.message);
          } else if (status === 403 && data && data.message) {
            console.log("An error with status 403 occured", data.message);
            setResponseMessage(data.message);
          } else {
            console.log("Axios error:", error);
          }
        } else {
          console.log("Network error:", error.message);
        }
      });
  };

  const revokeUserRole = async (roleIds) => {
    await axios
      .post(`${BASE_URL}user-role/delete`, roleIds, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
      })
      .catch((error) => {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
            console.log("An error occured", data.message);
          } else if (status === 403 && data && data.message) {
            console.log("An error with status 403 occured", data.message);
            setResponseMessage(data.message);
          } else {
            console.log("Axios error:", error);
          }
        } else {
          console.log("Network error:", error.message);
        }
      });
  };
  return {
    getRoles,
    roles,
    getStaffRoles,
    staffRoles,
    assignUserRole,
    addRole,
    deleteRole,
    getRoleForStaff,
    roleForStaff,
    revokeUserRole
  };
};
export default useRole;