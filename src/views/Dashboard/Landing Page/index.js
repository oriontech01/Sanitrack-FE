import React, { useState } from 'react';
import { Tab, Tabs, Box } from '@mui/material';
import { Link, Outlet } from 'react-router-dom';

const SanitrackLandingPage = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const handleChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Box>
      <Tabs
        value={selectedTab}
        onChange={handleChange}
        style={{
          margin: '0 auto',
          justifyContent: 'center' // Align tabs at the center
        }}
      >
        <Tab style={{ marginLeft: 200 }} label="Master Sanitation Schedule" component={Link} to="/dashboard/sanitation-schedule" />
        <Tab label="Facility Cleaning Timer" component={Link} to="/dashboard/cleaning-timer" />
        <Tab label="Facility Overview" component={Link} to="/dashboard/facility-overview" />
      </Tabs>
      <Outlet/>
    </Box>
  );
};

export default SanitrackLandingPage;
