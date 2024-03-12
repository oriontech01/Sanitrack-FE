import React, { useEffect } from 'react';
import { Box, Typography, List, ListItem, ListItemText, Divider, Grid, Card, CardContent } from '@mui/material';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import useInspectorHook from 'Hooks/inspector/useInspectorHook';
import { Link } from 'react-router-dom';
import { ArrowForwardIos, HouseOutlined, LibraryBooksSharp, BarChart } from '@mui/icons-material';
const InspectorRequests = () => {
  const { requestedItems, getRequestedCleaningItems, loading } = useInspectorHook();

  useEffect(() => {
    getRequestedCleaningItems();
  }, []);

  console.log(requestedItems);
  return (
    <>
      <header className="flex lg:flex-row flex-col justify-between items-center">
        <h1 className="text-2xl font-bold text-[#3366FF]">Requests</h1>
      </header>
      <div className="lg:mt-10 mt-5">
        <Grid container spacing={2}>
          {requestedItems &&
            !loading &&
            (requestedItems.length > 0 ? (
              requestedItems.map((location, index) => {
                return typeof(location) === "string" ? (
                  <span key={location} className="flex flex-col gap-y-3 gap-x-4 bg-blue-50 w-full p-2 ">
                    <p className="text-red-400 font-bold px-2">No Requests Available</p>
                  </span>
                ) : (
                  <Grid item xs={12} sm={6} key={location?.task?._id}>
                    <Link
                      className="w-full mt-5"
                      to={`/dashboard/requests/${location?.task?._id}`}
                      onClick={() => localStorage.setItem('locationDeets', JSON.stringify(location))}
                    >
                      <ListItem style={{ backgroundColor: '#EBF0FF', borderRadius: 10 }}>
                        <Box sx={{ flexGrow: 1 }}>
                          <ListItemText
                            primary={location?.task?.assigned_room?.roomName}
                            primaryTypographyProps={{ fontWeight: 'bold', color: 'blue' }}
                            secondary={location?.task?.tasks.map((task)=>task?.name)}
                            secondaryTypographyProps={{ color: 'blue' }}
                          />
                        </Box>
                        <ArrowForwardIos />
                      </ListItem>
                    </Link>
                  </Grid>
                );
              })
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
    </>
  );
};

export default InspectorRequests;
