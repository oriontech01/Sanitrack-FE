import React, { lazy } from 'react';

// project import
import Loadable from 'component/Loadable';

const AssignPermission = Loadable(lazy(() => import('views/Admin/Permissions/AssignPermissions')));
const CreatePermissions = Loadable(lazy(() => import('views/Admin/Permissions/CreatePermissions')));
const CreateRole = Loadable(lazy(() => import('views/Admin/Roles/CreateRole')));
const AssignRole = Loadable(lazy(() => import('views/Admin/Roles/AssignRole')));
const StaffRoles = Loadable(lazy(() => import('views/Admin/Roles/StaffRoles')));
const RevokeRole = Loadable(lazy(() => import('views/Admin/Roles/RevokeRole')));
const ViewRolePermissions = Loadable(lazy(() => import('views/Admin/Roles/ViewRolePermissions')));
const Roles = Loadable(lazy(() => import('views/Admin/Roles/Roles')));

const MainLayout = Loadable(lazy(() => import('layout/MainLayout')));
const Tasks = Loadable(lazy(() => import('views/Admin/Work Order/Tasks')));
const AddTask = Loadable(lazy(() => import('views/Admin/Work Order/AddTask')));
const TaskDetails = Loadable(lazy(() => import('views/Admin/Work Order/TaskDetails')));
const Room = Loadable(lazy(() => import('views/Admin/Rooms/Rooms')));
const AddRoom = Loadable(lazy(() => import('views/Admin/Rooms/AddRoom')));
const RoomDetails = Loadable(lazy(() => import('views/Admin/Rooms/RoomDetails')));
const RoomView = Loadable(lazy(() => import('views/Admin/Rooms/RoomView')));
const Messages = Loadable(lazy(() => import('views/Admin/Messages/Messages')));
const Contact = Loadable(lazy(() => import('views/Admin/Contact/Contact')));
const Inventory = Loadable(lazy(() => import('views/Admin/Inventory/Inventory')));
const Facilities = Loadable(lazy(() => import('views/Admin/Facilities/Facilities')));
const WorkHistory = Loadable(lazy(() => import('views/Admin/Work History/WorkHistory')));
const CleanerHistory = Loadable(lazy(() => import('views/Admin/Work History/Cleaner Work History/CleanerHistory')));
const InspectorHistory = Loadable(lazy(() => import('views/Admin/Work History/Inspector Work History/InspectorHistory')));
const RoomHistory = Loadable(lazy(() => import('views/Admin/Work History/Room Work History/RoomHistory')));
const Evidence = Loadable(lazy(() => import('views/Admin/Evidence/Evidence')));
const ViewEvidence = Loadable(lazy(() => import('views/Admin/Evidence/ViewEvidence')));
const Users = Loadable(lazy(() => import('views/Admin/Users/Users')));
const AddUser = Loadable(lazy(() => import('views/Admin/Users/AddUser')));
const DashboardDefault = Loadable(lazy(() => import('../views/Admin/Dashboard')));
const Permissions = Loadable(lazy(() => import('../views/Admin/Permissions/Permissions')));
const LandingPage = Loadable(lazy(() => import('../views/Admin/Dashboard/Landing Page/index')));
const SanitationSchedule = Loadable(lazy(() => import('../views/Admin/Dashboard/Facility Sanitation Schedule/index')));
const CleaningTimer = Loadable(lazy(() => import('../views/Admin/Dashboard/Facility Cleaning Timer/timer/CleaningTimer')));


// ==============================|| MAIN ROUTES ||============================== //
const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/dashboard',
      element: <LandingPage />,
      children: [
        { path: '', index: true, element: <DashboardDefault /> },
        { path: 'sanitation-schedule', element: <SanitationSchedule /> },
        { path: 'cleaning-timer', element: <CleaningTimer /> }
      ]
    },
    { path: '/dashboard/tasks', element: <Tasks /> },
    { path: '/dashboard/add-task', element: <AddTask /> },
    { path: '/dashboard/edit-task/:taskId', element: <TaskDetails /> },
    { path: '/dashboard/rooms', element: <Room /> },
    { path: '/dashboard/add-room', element: <AddRoom /> },
    { path: '/dashboard/view-details/:roomId', element: <RoomDetails /> },
    { path: '/dashboard/view-room/:roomId', element: <RoomView /> },
    { path: '/dashboard/messages', element: <Messages /> },
    { path: '/dashboard/facilities', element: <Facilities /> },
    {
      path: '/dashboard/work-history',
      element: <WorkHistory />,
      children: [
        { index: true, path: '', element: <RoomHistory /> },
        { path: 'cleaners', element: <CleanerHistory /> },
        { path: 'inspectors', element: <InspectorHistory /> }
      ]
    },
    { path: '/dashboard/evidence', element: <Evidence /> },
    { path: '/dashboard/evidence/view/:taskId', element: <ViewEvidence /> },
    { path: '/dashboard/contact', element: <Contact /> },
    { path: '/dashboard/inventory', element: <Inventory /> },
    { path: '/dashboard/users', element: <Users /> },
    { path: '/dashboard/add-user', element: <AddUser /> },
    {
      path: '/dashboard/permissions',
      element: <Permissions />
    },
    { path: '/dashboard/permissions/create', element: <CreatePermissions /> },
    { path: '/dashboard/permissions/assign', element: <AssignPermission /> },
    { path: '/dashboard/roles', element: <Roles /> },
    { path: '/dashboard/roles/create', element: <CreateRole /> },
    { path: '/dashboard/roles/assign', element: <AssignRole /> },
    { path: '/dashboard/roles/permissions/:id', element: <ViewRolePermissions /> },
    { path: '/dashboard/roles/staff', element: <StaffRoles /> },
    { path: '/dashboard/roles/staff/revoke/:staffId', element: <RevokeRole /> }
  ]
};

export default MainRoutes;
