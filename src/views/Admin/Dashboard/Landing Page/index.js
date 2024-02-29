import React, { useState, useEffect } from 'react';
import { Tab, Tabs, Box, Typography, Paper } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';
import useCleanerHook from '../../../../Hooks/cleaner/useCleanerHook.js';
import { useCurrentRole } from 'context/UserRoleContext.js';

const CleanerAndInspectorLandingPage = () => {
  const { workOrderLocations, getWorkOrderLocationsForCleaner } = useCleanerHook();

  useEffect(() => {
    const fetchData = async () => {
      await getWorkOrderLocationsForCleaner();
    };
    fetchData();
  }, []);

  return (
    <Box>
      <Typography variant="h2" color="blue">
        Welcome {localStorage.getItem('name')}!
      </Typography>
      <Typography variant="body1" marginTop={2}>
        You are currently logged in with the role of {localStorage.getItem('role')}. View your dashboard below.
      </Typography>
      <Paper sx={{ width: '90%', mt: 5, gap: 10, padding: 5 }}>
        <Typography variant="h3" color="primary">
          Work Order Locations
        </Typography>
        {workOrderLocations.map((location, index) => {
          return (
            <Box key={location.id}>
              <Typography marginTop={5}>{`${index + 1}. ${location.country}, ${location.state}, ${location.city}`}</Typography>
            </Box>
          );
        })}
      </Paper>
      {console.log('LOCATIONS', workOrderLocations)}
    </Box>
  );
};

const SanitrackLandingPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const { currentRole } = useCurrentRole();
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };
  const tabStyle = {
    flex: 1,
    fontSize: '1rem',
    fontWeight: 'bold',
    textTransform: 'none',
    color: 'gray', // Adjust the color to match your design
    '&.Mui-selected': {
      color: 'primary' // Adjust the selected tab color to match your design
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)' // Adjust focus color if necessary
    }
  };

  return (
    <>
      {currentRole !== 'Admin' ? (
        <CleanerAndInspectorLandingPage />
      ) : (
        <Box>
          <Box>
            <Typography variant="h2" color="blue">
              Welcome {localStorage.getItem('name')}!
            </Typography>
            <Typography variant="body1" marginTop={2}>
              Keep track of all Cleaning Activities, Work Orders, Cleaners and Inspectors.
            </Typography>
          </Box>
          <Box sx={{ width: '100%', bgcolor: 'background.paper', marginTop: 2 }}>
            <Paper elevation={0} square>
              <Tabs
                value={selectedTab}
                onChange={handleChange}
                variant="fullWidth"
                indicatorColor="primary" // Adjust the indicator color to match your design
                textColor="primary"
                centered
              >
                <Tab label="Facility Overview" component={Link} to="/dashboard/" sx={tabStyle} />
                <Tab label="Master Sanitation Schedule" component={Link} to="/dashboard/sanitation-schedule" sx={tabStyle} />
                <Tab label="Facility Cleaning Timer" component={Link} to="/dashboard/cleaning-timer" sx={tabStyle} />
              </Tabs>
            </Paper>
          </Box>
          <Outlet />
        </Box>
      )}
    </>
  );
};

export default SanitrackLandingPage;
