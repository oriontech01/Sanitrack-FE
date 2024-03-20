import React, { useState } from 'react';
import { Box, Tabs, Tab, Container, Typography, Button, Grid, useTheme, useMediaQuery } from '@mui/material';
import TabPanel from 'component/Tab Panel/TabPanel';
import AddLocation from './AddLocation';
import LocationListView from './LocationListView';
import LocationMapView from './LocationMapView';

const Locations = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return (
    <Container className="tracker-container">
      <Grid container justifyContent="space-between" alignItems="center" sx={{ marginBottom: 2 }}>
        <Box display={'flex'} justifyContent={'space-between'} width={'100%'} alignItems={'center'}>
          <Grid item xs={12} sm={6}>
            <Typography variant={isMobile ? 'h4' : 'h2'}>Facilties</Typography>
          </Grid>
          <Button
            style={{
              backgroundColor: !isMobile ? 'blue': null,
              '&:hover': {
                backgroundColor: 'darkblue'
              }
            }}
            onClick={() => setIsModalOpen(true)}
            variant={isMobile ? 'text' : 'contained'}
          >
            Add Facilties
          </Button>
        </Box>
      </Grid>

      <AddLocation isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)} />

      <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: 2 }}>
        <Tabs
          value={selectedTab}
          onChange={handleTabChange}
          aria-label="Work order and tasks tabs"
          variant={isMobile ? 'fullWidth' : 'standard'}
        >
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
