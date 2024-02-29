import React, { useEffect } from 'react';
import useCleanerHook from '../../../../Hooks/cleaner/useCleanerHook.js';
import { Box, Typography, List, ListItem, ListItemText, Card, CardContent, Grid } from '@mui/material';
import { LibraryBooksSharp, HouseOutlined, BarChart, ArrowForwardIos } from '@mui/icons-material';
import ActiveTimer from 'component/Active Timer/ActiveTimer.js';

const CleanerDashboard = () => {
  const { workOrderLocations, getWorkOrderLocationsForCleaner } = useCleanerHook();

  useEffect(() => {
    getWorkOrderLocationsForCleaner();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h2" color="blue">
        Welcome {localStorage.getItem('name')}!
      </Typography>
      <Typography variant="h4" mt={2}>
        Below are the locations for the tasks of the day.
      </Typography>

      {/* Cards for summary */}
      <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 3 }}>
        {/* You can create a separate component for these cards to avoid repetition */}
        <Card sx={{ minWidth: 275, m: 1 }} style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
          <CardContent
            style={{ display: 'flex', alignContent: 'center', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
          >
            <LibraryBooksSharp />
            <Typography color="text.secondary" gutterBottom>
              NUMBER OF ACTIVE TASKS
            </Typography>
            <Typography variant="h5">5</Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 275, m: 1 }} style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
          <CardContent
            style={{ display: 'flex', alignContent: 'center', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
          >
            <HouseOutlined />
            <Typography color="text.secondary" gutterBottom>
              TOTAL FACILITIES CLEANED
            </Typography>
            <Typography variant="h5">5</Typography>
          </CardContent>
        </Card>
        <Card sx={{ minWidth: 275, m: 1 }} style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
          <CardContent
            style={{ display: 'flex', alignContent: 'center', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
          >
            <BarChart />
            <Typography color="text.secondary" gutterBottom>
              OVERALL PERFORMANCE
            </Typography>
            <Typography variant="h5">5</Typography>
          </CardContent>
        </Card>

        {/* Repeat for other summary cards */}
      </Box>
      {/* Locations List */}
      <Typography variant="h3" marginTop={5} color="primary">
        Locations
      </Typography>
      <Box sx={{ width: '100%', padding: 2 }}>
        {console.log('Location data', workOrderLocations)}
        <List>
          <Grid container spacing={2}>
            {workOrderLocations.map((location, index) => (
              <Grid item xs={12} sm={6} key={location.id}>
                <ListItem style={{ backgroundColor: 'lightblue', borderRadius: 10 }}>
                  <Box sx={{ flexGrow: 1 }}>
                    <ListItemText
                      primary={location.city}
                      primaryTypographyProps={{ fontWeight: 'bold', color: 'blue' }}
                      secondary="Floor, Windows, Bathroom..."
                      secondaryTypographyProps={{ color: 'blue' }}
                    />
                  </Box>
                  <ArrowForwardIos />
                </ListItem>
              </Grid>
            ))}
          </Grid>
        </List>
      </Box>

      {/* Active Timer */}
      <Typography variant="h3" marginTop={3} color="primary">
        Active Timer
      </Typography>
      <ActiveTimer />
    </Box>
  );
};

export default CleanerDashboard;
