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
 <></>
  );
};

export default CleanerDashboard;
