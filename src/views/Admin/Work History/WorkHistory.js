import React, { useState } from 'react';
import { Box, Container, Paper, useMediaQuery, useTheme } from '@mui/material';
import { Outlet } from 'react-router-dom';
import WorkHistoryTabs from 'component/WorkHistoryNav/WorkHistoryTabs';

const WorkHistory = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const theme = useTheme();
  const matchesSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  // Apply a minimalistic approach with emphasis on spacing and readability
  const boxStyle = {
    mt: 2,
    p: matchesSmallScreen ? 1 : 3, // Adjust padding based on screen size for better content spacing
    bgcolor: 'background.default', // Use the default background color from theme for consistency
    borderRadius: 2, // A moderate border radius for a subtle, modern look
    boxShadow: matchesSmallScreen ? 1 : 3, // Adjust shadow intensity based on screen size
    overflow: 'auto', // Ensure content is scrollable if it overflows
    height: matchesSmallScreen ? 'auto' : 'calc(100vh - 96px)', // Adjust height dynamically; consider navigation and tab heights
  };

  return (
    <Container maxWidth="lg" className="history-container">
      <Paper elevation={3} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <WorkHistoryTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </Paper>
      <Box sx={boxStyle}>
        <Outlet />
      </Box>
    </Container>
  );
};

export default WorkHistory;
