import { Box, Container, Paper } from '@mui/material';
import { Outlet } from 'react-router-dom';
import { useState } from 'react';
import WorkHistoryTabs from 'component/WorkHistoryNav/WorkHistoryTabs';

const WorkHistory = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <Container maxWidth="md" className="history-container">
      <Paper elevation={3}>
        <WorkHistoryTabs selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      </Paper>
      <Box mt={2} height={'100vh'} p={2} bgcolor="#f3f3f3" borderRadius={10} boxShadow={3}>
        <Outlet />
      </Box>
    </Container>
  );
};

export default WorkHistory;
