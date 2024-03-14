import React, { useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Grid, Card, CardContent } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import useInspectorHook from 'Hooks/inspector/useInspectorHook';
import { Link } from 'react-router-dom';
import { ArrowForwardIos, HouseOutlined, LibraryBooksSharp,BarChart } from '@mui/icons-material';


const InspectorDashboard = () => {
  const {
    facilities,
    getFacilitiesForInspector,
    facilitiesLoading,
    getActiveTask,
    activeLoading,
    activeTask,
    getFacilities,
    faciltiyLoading,
    facility
  } = useInspectorHook();

  useEffect(() => {
    getFacilitiesForInspector();
    getActiveTask();
    getFacilities();
  }, []);
  console.log('first', facilities);
  // This data is just for the example and should be fetched from your backend or context
  const tasks = [
    {
      id: 1,
      title: 'Discovery Mall',
      subtitle: 'Floor, Windows, Bathroom...'
    },
    {
      id: 2,
      title: 'Aso Villa',
      subtitle: 'Floor, Windows, Bathroom...'
    }
    // ... more tasks
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h2" color="blue">
        Welcome {localStorage.getItem('name')}!
      </Typography>
      <Typography variant="h4" mt={2}>
        Below are the locations for the tasks of the day.
      </Typography>

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
      <div className="lg:mt-10 mt-5">
        <Grid container spacing={2}>
          {facilities &&
            !facilitiesLoading &&
            (facilities.length > 0 ? (
              facilities.map((location, index) => (
                <Grid item xs={12} sm={6} key={location?.id}>
                  <Link
                    className="w-full mt-5"
                    to={`/dashboard/inspector/inspector-location-details/${location.id}`}
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
        {facilitiesLoading && (
          <div className="flex items-center justify-center pt-5">
            <div className="relative">
              <div className="h-20 w-20 rounded-full border-t-8 border-b-8 border-gray-200"></div>
              <div className="absolute top-0 left-0 h-20 w-20 rounded-full border-t-8 border-b-8 border-blue-500 animate-spin"></div>
            </div>
          </div>
        )}
      </div>
      {/* Add additional UI elements as needed */}
    </Box>
  );
};

export default InspectorDashboard;
