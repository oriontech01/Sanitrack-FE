import React, { useState, useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthState } from 'context/AuthContext';
import CircularProgress from '@mui/material/CircularProgress'; // For showing a loading indicator

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAuthState(); // Assuming useAuthState provides an isLoading flag
  const [authChecked, setAuthChecked] = useState(false);
  const location = useLocation(); // To capture the current location
  const [isLoading,setIsLoading ] = useState(false)

  useEffect(() => {
    // Simulate an async check to auth state (if needed)
    const checkAuthState = async () => {
      // Wait for auth state to be confirmed
      // This can be an actual check or simply waiting for a flag
      setIsLoading(true)
      await new Promise(resolve => setTimeout(resolve, 1000)); // Example delay to simulate loading
      setAuthChecked(true);
      setIsLoading(false)
    };
    checkAuthState();
  }, []);

  if (!authChecked || isLoading) { // Check for isLoading if it's provided by your auth context
    // Show a loading indicator while authentication status is being confirmed
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </div>
    );
  }

  if (!isLoggedIn) {
    // Redirect them to the /login page, saving the current location they were trying to go to
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoute;
