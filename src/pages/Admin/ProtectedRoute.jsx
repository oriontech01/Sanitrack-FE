import React from 'react';
import { Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, isLoggedIn, redirectTo, ...props }) => { 
    return isLoggedIn ? (
        <Route {...props} element={element} />
      ) : (
        <Navigate to={redirectTo} replace />
      );
}
export default ProtectedRoute