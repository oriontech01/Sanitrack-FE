import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const usePermission = () => {
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_BASE_URL;
  const access_token = localStorage.getItem("auth-token");

  const [rolePermissions, setRolePermission] = useState([]);
  const [allPermissions, setAllPermissions] = useState([]);
  const [errorResponse, setResponseMessage] = useState();

  const getPermissionByRole = async (roleId) => {
    await axios
      .get(`${BASE_URL}permissions/role-id?roleId=${roleId}`, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        if (response.data.data == null) {
          setRolePermission(response.data.message);
        } else {
          setRolePermission(response.data.data.permissions);
        }
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

  const getPermissions = async () => {
    await axios
      .get(`${BASE_URL}permissions`, {
        headers: { Authorization: `Bearer ${access_token}`},
      })
      .then((response) => {
        setAllPermissions(response.data.data.allPermissions);
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

  const addPermission = async (permission_name) => {
    await axios
      .post(
        `${BASE_URL}permissions/add`,
        { permission_name: permission_name },
        { headers: { Authorization: `Bearer ${access_token}` } }
      )
      .then((response) => {
        navigate("/dashboard/permissions");
      })
      .catch((error) => {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
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

  const assignPermission = async (permissions) => {
    await axios
      .post(`${BASE_URL}permissions/assign`, permissions, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        navigate("/dashboard/permissions");
      })
      .catch((error) => {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
            navigate("/dashboard/roles");
            // console.log("An error occured", data.message);
          } else if (status === 403 && data && data.message) {
            navigate("/");
          } else {
            console.log("Axios error:", error);
          }
        } else {
          console.log("Network error:", error.message);
        }
      });
  };

  const revokePermission = async (permissions) => {
    await axios
      .post(`${BASE_URL}permissions/delete`, permissions, {
        headers: { Authorization: `Bearer ${access_token}` },
      })
      .then((response) => {
        navigate("/dashboard/roles");
      })
      .catch((error) => {
        if (error.response) {
          const { status, data } = error.response;
          if (status === 400 && data && data.message) {
            setResponseMessage(data.message);
            navigate("/dashboard/roles");
            // console.log("An error occured", data.message);
          } else if (status === 403 && data && data.message) {
            navigate("/");
          } else {
            console.log("Axios error:", error);
          }
        } else {
          console.log("Network error:", error.message);
        }
      });
  };

  return {
    getPermissionByRole,
    rolePermissions,
    getPermissions,
    allPermissions,
    addPermission,
    errorResponse,
    assignPermission, 
    revokePermission
  };
};
export default usePermission;
