import React from 'react';
import { lazy } from 'react';

// project imports
import Loadable from 'component/Loadable';
import MinimalLayout from 'layout/MinimalLayout';
import UnAuthorized from 'views/Unauthorized Page/UnAuthorized';

const AuthLogin = Loadable(lazy(() => import('../views/Login')));

// ==============================|| AUTHENTICATION ROUTES ||============================== //

const AuthenticationRoutes = {
  path: '/',
  element: <MinimalLayout />,
  children: [
    {
      path: '/',
      element: <AuthLogin />
    },
    {
      path: '/unauthorized',
      element: <UnAuthorized/>
    }
  ]
};

export default AuthenticationRoutes;