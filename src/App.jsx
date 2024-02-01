import "./App.scss";
import Login from "./pages/Admin/Login";
import { useState } from "react";
import { Routes, Route, useNavigate, Navigate } from "react-router-dom";
import Room from "./pages/Admin/Room";
import AdminHome from "./pages/Admin/AdminHome";
import SideNav from "./components/SideNav/SideNav";
import Staff from "./pages/Admin/Staff";
import AddUser from "./pages/Admin/AddUser";
import AddRoom from "./pages/Admin/AddRoom";
import RoomDetails from "./pages/Admin/RoomDetails";
import AddTask from "./pages/Admin/AddTask";
import Report from "./pages/Admin/Report";
import useAuth from "./Hooks/useAuth";
import NewDashboard from "./components/NewDashboard";
import Messages from "./pages/Admin/Messages";
import Tracker from "./pages/Admin/Tracker";
import WorkHistory from "./pages/Admin/WorkHistory";
import CleanerHistory from "./components/manager/WorkHistory/CleanerHistory";
import InspectorHistory from "./components/manager/WorkHistory/InspectorHistory";
import RoomHistory from "./components/manager/WorkHistory/RoomHistory";
import Modal from "react-modal";
import Roles from "./pages/Roles/role";
import Permissions from "./pages/Permissions/Permissions";
import AssignRole from "./pages/Roles/assign";
import CreateRole from "./pages/Roles/create";
import RolePermissions from "./pages/Roles/rolePermission";
import AddPermission from "./pages/Permissions/create";
import AssignPermission from "./pages/Permissions/assign";
import Evidence from "./pages/Evidence/evidence";
import ViewEvidence from "./pages/Evidence/view";
import Profile from "./pages/Profile";

Modal.setAppElement("#root"); // React Modal component

function App() {
  const [isLoggedIn, setLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setLoggedIn(false);
    localStorage.setItem("isLoggedIn", "false");
    alert("You have been logged out!");
    navigate("/");
  };

  return (
    <>
      {isLoggedIn ? (
        <SideNav handleLogout={handleLogout}>
          <Routes>
            <Route path="/admin-home" element={<AdminHome />}/>
            <Route path="/admin-home/profile" element={<Profile />} />
            <Route path="/home/user" element={<Staff />} />
            <Route path="/home/add-user" element={<AddUser />} />
            <Route path="/home/room" element={<Room />} />
            <Route path="/home/add-room" element={<AddRoom />} />
            <Route
              path="/home/view-details/:roomId"
              element={<RoomDetails />}
            />
            <Route path="/home/evidence" element={<Evidence />} />

            <Route path="/home/add-task" element={<AddTask />} />
            <Route path="/home/report" element={<Report />} />
            <Route path="/home/work-order" element={<NewDashboard />} />
            <Route path="/home/messages" element={<Messages />} />
            <Route path="/home/tracker" element={<Tracker />} />
            <Route path="*" element={<Navigate to="/admin-home" />} />
            <Route path="/home/work-history" element={<WorkHistory />}>
              <Route path="rooms" element={<RoomHistory />} />
              <Route path="cleaners" element={<CleanerHistory />} />
              <Route path="inspectors" element={<InspectorHistory />} />
              <Route index element={<RoomHistory />} />
            </Route>
            <Route path="/home/role" element={<Roles />} />
            <Route path="/home/role/assign" element={<AssignRole />} />
            <Route path="/home/role/add" element={<CreateRole />} />
            <Route
              path="/home/role/permissions/:roleId"
              element={<RolePermissions />}
            />

            <Route path="/home/permission" element={<Permissions />} />
            <Route path="/home/permission/add" element={<AddPermission />} />
            <Route
              path="/home/permission/assign"
              element={<AssignPermission />}
            />

            <Route path="/home/evidence" element={<Evidence />} />
            <Route
              path="/home/evidence/view/:taskId"
              element={<ViewEvidence />}
            />
          </Routes>
        </SideNav>
      ) : (
        <Routes>
          <Route
            path="/"
            element={<Login onLogin={() => setLoggedIn(true)} />}
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      )}
    </>
  );
}

export default App;
