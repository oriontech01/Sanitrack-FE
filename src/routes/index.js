// src/routes/ThemeRoutes.js
import React from 'react';
import { useRoutes } from 'react-router-dom';
import { AuthProvider } from '../context/AuthContext';
import ProtectedRoute from '../views/Login/ProtectedRoute';
import MainRoutes from './MainRoutes';
import AuthenticationRoutes from './AuthenticationRoutes';

const ThemeRoutes = () => {
  const routes = useRoutes([
    {
      ...AuthenticationRoutes,
      element: <AuthProvider>{AuthenticationRoutes.element}</AuthProvider>,
    },
    {
      ...MainRoutes,
      element: (
        <AuthProvider>
          <ProtectedRoute>{MainRoutes.element}</ProtectedRoute>
        </AuthProvider>
      ),
    },
  ]);

  return routes;
};

export default ThemeRoutes;