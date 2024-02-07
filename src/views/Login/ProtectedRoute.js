// src/components/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuthState } from 'context/AuthContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuthState();

  console.log("Login state", isLoggedIn)

  if (!isLoggedIn) {
    // Redirect them to the /login page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after logging in, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/" replace />;
  }

  return children;
};

export default ProtectedRoute
