import React, { useEffect, useState } from 'react';
import useTask from 'Hooks/useTask';
import useWorkHistory from 'Hooks/useWorkHistory';
import useRoom from 'Hooks/useRoom';
import Loader from 'component/Loader/Loader';
import useCleaningItems from 'Hooks/useCleaningItems';
import { Box, Grid, useTheme, styled } from '@mui/material';
import ReportCard from './ReportCard';
import Charts from './chart/Charts';
import FacilityCleaningOverviewChart from './chart/FacilityCleaningOverviewChart';
import { gridSpacing } from 'config.js';
import DescriptionTwoTone from '@mui/icons-material/DescriptionTwoTone';
import { AddTaskSharp, CleaningServicesSharp, RoomSharp, TaskAltOutlined } from '@mui/icons-material';
import { GroupWorkRounded } from '@mui/icons-material';
import { SupervisorAccount } from '@mui/icons-material';

const Default = () => {
  const theme = useTheme();
  const { activeCleaners, activeInspectors, everyTask, getAllCleaners, getAllInspectors, getAllTasks, pendingTasks, completedTasks } = useTask();
  const { roomsCount, getRoom } = useRoom();
  const { getCleanerSummary, cleanerSummary } = useWorkHistory();
  const { getCleaningItems, cleaningItems } = useCleaningItems();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await Promise.all([getAllCleaners(), getAllInspectors(), getAllTasks(), getRoom(), getCleanerSummary(), getCleaningItems()]);
      } catch (error) {
        console.error('Failed to fetch data:', error);
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Grid container spacing={gridSpacing} sx={{ marginTop: 2 }}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <ReportCard to='/dashboard/users' primary={activeCleaners} secondary="All Cleaners" color={theme.palette.warning.main} iconPrimary={GroupWorkRounded} />
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <ReportCard to='/dashboard/users' primary={activeInspectors} secondary="All Inspectors" color={theme.palette.error.main} iconPrimary={SupervisorAccount} />
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <ReportCard to='/dashboard/tasks' primary={everyTask} secondary="All Tasks" color={theme.palette.success.main} iconPrimary={DescriptionTwoTone} />
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <ReportCard to='/dashboard/rooms' primary={roomsCount} secondary="Total Room Count" color={theme.palette.primary.main} iconPrimary={RoomSharp} />
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <ReportCard primary={completedTasks.length} secondary="Completed Tasks" color={theme.palette.primary.dark} iconPrimary={TaskAltOutlined} />
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <ReportCard to='/dashboard/inventory' primary={cleaningItems.length} secondary="Cleaning Items" color={theme.palette.action.active} iconPrimary={CleaningServicesSharp} />
          </Grid>
          <Grid item lg={3} md={4} sm={6} xs={12}>
            <ReportCard primary={pendingTasks.length} secondary="Pending Tasks" color={theme.palette.action.focus} iconPrimary={AddTaskSharp} />
          </Grid>
        </Grid>
      </Grid>
      <Box sx={{ display: 'flex', width: '100%', paddingTop: 10, justifyContent: 'center', gap: 5, alignItems: 'center', flexDirection: { xs: 'column', md: 'row', alignContent: 'center' } }}>
        <Charts data={cleanerSummary} />
        <FacilityCleaningOverviewChart />
      </Box>
    </Grid>
  );
};

export default Default;
