import React, { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import Loadable from 'component/Loadable';
import Tasks from 'views/Work Order/Tasks';
import AddTask from 'views/Work Order/AddTask';
import TaskDetails from 'views/Work Order/TaskDetails';
import Room from 'views/Rooms/Rooms';
import AddRoom from 'views/Rooms/AddRoom';
import RoomDetails from 'views/Rooms/RoomDetails';
import Messages from 'views/Messages/Messages';
import Facilities from 'views/Facilities/Facilities';
import WorkHistory from 'views/Work History/WorkHistory';
import CleanerHistory from 'views/Work History/Cleaner Work History/CleanerHistory';
import InspectorHistory from 'views/Work History/Inspector Work History/InspectorHistory';
import RoomHistory from 'views/Work History/Room Work History/RoomHistory';
import Evidence from 'views/Evidence/Evidence';
import ViewEvidence from 'views/Evidence/ViewEvidence';
import Users from 'views/Users/Users';
import AddUser from 'views/Users/AddUser';

const DashboardDefault = Loadable(lazy(() => import('../views/Dashboard')));

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
        { path: '/dashboard/work-history/rooms', element: <RoomHistory /> },
        { path: '/dashboard/work-history/cleaners', element: <CleanerHistory /> },
        { path: '/dashboard/work-history/inspectors', element: <InspectorHistory /> }
      ]
    },
    { path: '/dashboard/evidence', element: <Evidence /> },
    { path: '/dashboard/evidence/view/:taskId', element: <ViewEvidence /> },
    { path: '/dashboard/users', element: <Users /> },
    { path: '/dashboard/add-user', element: <AddUser/> }
  ]
};

export default MainRoutes;
