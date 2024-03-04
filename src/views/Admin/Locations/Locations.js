import React, { useState } from 'react';
import TabPanel from 'component/Tab Panel/TabPanel';
import { Box, Tabs, Tab, Container, Typography, Button } from '@mui/material';
import AddLocation from './AddLocation';
import LocationListView from './LocationListView';
import LocationMapView from './LocationMapView';

const Locations = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Container className="tracker-container">
      <Box className="location-header" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Typography variant="h2">Locations</Typography>
        <Button style={{ backgroundColor: 'blue' }} onClick={() => setIsModalOpen(true)} variant="contained">
          Add Location
        </Button>
      </Box>

      <AddLocation isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} />

      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={selectedTab} onChange={handleTabChange} aria-label="Work order and tasks tabs">
          <Tab label="Map View" />
          <Tab label="List View" />
        </Tabs>
      </Box>

      <TabPanel value={selectedTab} index={0}>
        <LocationMapView />
      </TabPanel>
      <TabPanel value={selectedTab} index={1}>
        <LocationListView />
      </TabPanel>
    </Container>
  );
};

export default Locations;
