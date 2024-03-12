import React, { useEffect } from 'react';
import useCleanerHook from 'Hooks/cleaner/useCleanerHook';
import { Box, Typography, List, ListItem, ListItemText, Card, CardContent, Grid } from '@mui/material';
import { LibraryBooksSharp, HouseOutlined, BarChart, ArrowForwardIos } from '@mui/icons-material';
import ActiveTimer from 'component/Active Timer/ActiveTimer.js';
import { Link } from 'react-router-dom';

const CleanerDashboard = () => {
  const {
    workOrderLocations,
    getWorkOrderLocationsForCleaner,
    loading,
    getActiveTask,
    activeLoading,
    activeTask,
    getFacilities,
    faciltiyLoading,
    facility
  } = useCleanerHook();

  useEffect(() => {
    getWorkOrderLocationsForCleaner();
    getActiveTask();
    getFacilities();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <h2 className="capitalize text-3xl font-bold text-blue-500">Welcome {localStorage.getItem('name')}!</h2>
      <p className="text-lg pb-5">Below are the locations for the tasks of the day.</p>

      {/* Cards for summary */}
      <Grid container spacing={3}>
        {/* You can create a separate component for these cards to avoid repetition */}
        <Grid item lg={4} sm={6} xs={12}>
          <Card style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
            <CardContent
              style={{ display: 'flex', alignContent: 'center', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
            >
              <span className="p-2 text-green-500 bg-green-200 rounded-lg mb-2">
                <LibraryBooksSharp color="inherit" />
              </span>

              <Typography color="text.secondary" gutterBottom>
                NUMBER OF ACTIVE TASKS
              </Typography>
              {activeTask && !activeLoading && <p className="text-2xl text-green-500 font-bold">{activeTask ?? '-'}</p>}
              {activeLoading && (
                <div className="flex items-center justify-center pt-5">
                  <div className="relative">
                    <div className="h-5 w-5 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                    <div className="absolute top-0 left-0 h-5 w-5 rounded-full border-t-8 border-b-8 border-gray-500 animate-spin"></div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item lg={4} sm={6} xs={12}>
          <Card style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
            <CardContent
              style={{ display: 'flex', alignContent: 'center', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
            >
              <span className="p-2 text-amber-500 bg-amber-200 rounded-lg mb-2">
                <HouseOutlined />
              </span>
              <Typography color="text.secondary" gutterBottom>
                TOTAL FACILITIES CLEANED
              </Typography>
              {facility && !faciltiyLoading && <p className="text-2xl text-amber-500 font-bold">{facility ?? '-'}</p>}
              {faciltiyLoading && (
                <div className="flex items-center justify-center pt-5">
                  <div className="relative">
                    <div className="h-5 w-5 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                    <div className="absolute top-0 left-0 h-5 w-5 rounded-full border-t-8 border-b-8 border-amber-500 animate-spin"></div>
                  </div>
                </div>
              )}
             
            </CardContent>
          </Card>
        </Grid>
        {/* <Grid item lg={4} sm={6} xs={12}>
          <Card style={{ display: 'flex', alignContent: 'center', justifyContent: 'center' }}>
            <CardContent
              style={{ display: 'flex', alignContent: 'center', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}
            >
              <span className="p-2 text-red-500 bg-red-200 rounded-lg mb-2">
                <BarChart />
              </span>
              <Typography color="text.secondary" gutterBottom>
                OVERALL PERFORMANCE
              </Typography>
              <p className="text-2xl text-red-500 font-bold">5</p>
            </CardContent>
          </Card>
        </Grid> */}
        {/* Repeat for other summary cards */}
      </Grid>
      {/* Locations List */}

      <Box sx={{ width: '100%' }}>
        <h2 className="capitalize text-3xl font-bold text-blue-500 pt-3"> Locations</h2>
        <div className="">
          <Grid container spacing={2}>
            {workOrderLocations &&
              !loading &&
              (workOrderLocations.length > 0 ? (
                workOrderLocations.map((location, index) => (
                  <Grid item xs={12} sm={6}   key={location.id}>
                  <Link
                    className="w-full mt-5"
                  
                    to={`/dashboard/cleaner/cleaner-location-details/${location.id}`}
                    onClick={() => localStorage.setItem('locationDeets', JSON.stringify(location))}
                  >
                   
                      <ListItem style={{ backgroundColor: '#EBF0FF', borderRadius: 10 }}>
                        <Box sx={{ flexGrow: 1 }}>
                          <ListItemText
                            primary={location?.city}
                            primaryTypographyProps={{ fontWeight: 'bold', color: 'blue' }}
                            secondary={location?.state}
                            secondaryTypographyProps={{ color: 'blue' }}
                          />
                        </Box>
                        <ArrowForwardIos />
                      </ListItem>
                   
                  </Link>
                  </Grid>
                ))
              ) : (
                <span className="flex justify-center items-center my-4 w-full">
                  <p className="text-black text-lg font-medium">No locations available </p>
                </span>
              ))}
          </Grid>
          {loading && (
            <div className="flex items-center justify-center pt-5">
              <div className="relative">
                <div className="h-20 w-20 rounded-full border-t-8 border-b-8 border-gray-200"></div>
                <div className="absolute top-0 left-0 h-20 w-20 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
              </div>
            </div>
          )}
        </div>
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
