import React, { lazy } from 'react';

// project import
import Loadable from 'component/Loadable';
import AssignPermission from 'views/Permissions/AssignPermissions';
import CreatePermissions from 'views/Permissions/CreatePermissions';
import CreateRole from 'views/Roles/CreateRole';
import AssignRole from 'views/Roles/AssignRole';
const Roles = Loadable(lazy(() => import('views/Roles/Roles')));
const MainLayout = Loadable(lazy(() => import('layout/MainLayout')));
const Tasks = Loadable(lazy(() => import('views/Work Order/Tasks')));
const AddTask = Loadable(lazy(() => import('views/Work Order/AddTask')));
const TaskDetails = Loadable(lazy(() => import('views/Work Order/TaskDetails')));
const Room = Loadable(lazy(() => import('views/Rooms/Rooms')));
const AddRoom = Loadable(lazy(() => import('views/Rooms/AddRoom')));
const RoomDetails = Loadable(lazy(() => import('views/Rooms/RoomDetails')));
const Messages = Loadable(lazy(() => import('views/Messages/Messages')));
const Facilities = Loadable(lazy(() => import('views/Facilities/Facilities')));
const WorkHistory = Loadable(lazy(() => import('views/Work History/WorkHistory')));
const CleanerHistory = Loadable(lazy(() => import('views/Work History/Cleaner Work History/CleanerHistory')));
const InspectorHistory = Loadable(lazy(() => import('views/Work History/Inspector Work History/InspectorHistory')));
const RoomHistory = Loadable(lazy(() => import('views/Work History/Room Work History/RoomHistory')));
const Evidence = Loadable(lazy(() => import('views/Evidence/Evidence')));
const ViewEvidence = Loadable(lazy(() => import('views/Evidence/ViewEvidence')));
const Users = Loadable(lazy(() => import('views/Users/Users')));
const AddUser = Loadable(lazy(() => import('views/Users/AddUser')));
const DashboardDefault = Loadable(lazy(() => import('../views/Dashboard')));
const Permissions = Loadable(lazy(() => import('../views/Permissions/Permissions')));

// const UtilsTypography = Loadable(lazy(() => import('../views/Utils/Typography')));

// const SamplePage = Loadable(lazy(() => import('../views/SamplePage')));

// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/dashboard',
      element: <DashboardDefault />
    },
    { path: '/dashboard/tasks', element: <Tasks /> },
    { path: '/dashboard/add-task', element: <AddTask /> },
    { path: '/dashboard/edit-task/:taskId', element: <TaskDetails /> },
    { path: '/dashboard/rooms', element: <Room /> },
    { path: '/dashboard/add-room', element: <AddRoom /> },
    { path: '/dashboard/view-details/:roomId', element: <RoomDetails /> },
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
    { path: '/dashboard/users', element: <Users /> },
    { path: '/dashboard/add-user', element: <AddUser /> },
    {
      path: '/dashboard/permissions',
      element: <Permissions />
    },
    { path: '/dashboard/permissions/create', element: <CreatePermissions /> },
    { path: '/dashboard/permissions/assign', element: <AssignPermission /> },
    { path: '/dashboard/roles', element: <Roles /> },
    { path: '/dashboard/roles/create', element: <CreateRole/>},
    { path: '/dashboard/roles/assign', element: <AssignRole/>},
    // { path: '/dashboard/roles/permissions/view', element: },
    { path: '/dashboard/roles/staff/view/:id', element: <CreateRole/>}
  ]
};

export default MainRoutes;
