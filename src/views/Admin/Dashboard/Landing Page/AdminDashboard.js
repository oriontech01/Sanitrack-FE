import React, { useState } from 'react';
import { Tab, Tabs, Box, Typography, Paper, useMediaQuery, useTheme } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

const AdminDashboard = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  const tabStyle = {
    flex: 1,
    fontSize: isSmallScreen ? '0.75rem' : '1rem', // Smaller font size on small screens
    fontWeight: 'bold',
    textTransform: 'none',
    color: 'gray', // Adjust the color to match your design
    '&.Mui-selected': {
      color: theme.palette.primary.main, // Ensure using the theme's primary color
    },
    '&.Mui-focusVisible': {
      backgroundColor: 'rgba(100, 95, 228, 0.32)', // Adjust focus color if necessary
    },
  };

  let username = localStorage.getItem('name') || 'User'; // Added default value to avoid null reference errors
  return (
    <Box>
      <Box sx={{ padding: isSmallScreen ? 1 : 3 }}>
        <Typography variant={isSmallScreen ? 'h4' : 'h2'} color="blue" gutterBottom>
          Welcome {`${username.charAt(0).toUpperCase()}${username.slice(1)}`}!
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
            variant="scrollable" // Allows scrolling through tabs on small screens
            scrollButtons={isSmallScreen ? "auto" : false} // Only show scroll buttons on small screens
            allowScrollButtonsMobile // Better scrolling on mobile
            indicatorColor="primary"
            textColor="primary"
            centered={!isSmallScreen} // Center tabs on larger screens only
          >
            <Tab label="Facility Overview" component={Link} to="/dashboard/" sx={tabStyle} />
            <Tab label="Master Sanitation Schedule" component={Link} to="/dashboard/sanitation-schedule" sx={tabStyle} />
            <Tab label="Facility Cleaning Timer" component={Link} to="/dashboard/cleaning-timer" sx={tabStyle} />
          </Tabs>
        </Paper>
      </Box>
      <Outlet />
    </Box>
  );
};

export default AdminDashboard;
