import React, { useEffect, useState } from 'react';
import useTask from 'Hooks/useTask';
import useWorkHistory from 'Hooks/useWorkHistory';
import useRoom from 'Hooks/useRoom';
import Loader from 'component/Loader/Loader';
import useCleaningItems from 'Hooks/useCleaningItems';
import { Box } from '@mui/material';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Grid } from '@mui/material';
import Charts from './chart/Charts';

//project import
import ReportCard from './ReportCard';
import { gridSpacing } from 'config.js';

// assets
import DescriptionTwoTone from '@mui/icons-material/DescriptionTwoTone';
import { AddTaskSharp, CleaningServicesSharp, RoomSharp, TaskAltOutlined } from '@mui/icons-material';
import { GroupWorkRounded } from '@mui/icons-material';
import { SupervisorAccount } from '@mui/icons-material';
import FacilityCleaningOverviewChart from './chart/FacilityCleaningOverviewChart';

// custom style
const FlatCardBlock = styled(props => <Grid item sm={6} xs={12} {...props} />)(({ theme }) => ({
  padding: '25px 25px',
  borderLeft: '1px solid' + theme.palette.background.default,
  [theme.breakpoints.down('sm')]: {
    borderLeft: 'none',
    borderBottom: '1px solid' + theme.palette.background.default
  },
  [theme.breakpoints.down('md')]: {
    borderBottom: '1px solid' + theme.palette.background.default
  }
}));

// ==============================|| DASHBOARD DEFAULT ||============================== //

const Default = () => {
  const theme = useTheme();
  const { activeCleaners, activeInspectors, everyTask, getAllCleaners, getAllInspectors, getAllTasks, pendingTasks, completedTasks } =
    useTask();
  const { roomsCount, getRoom } = useRoom();
  const { getCleanerSummary, cleanerSummary } = useWorkHistory();
  const { getCleaningItems, cleaningItems } = useCleaningItems();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Start loading before initiating asynchronous operations

      try {
        // Create an array of promises
        const tasks = [getAllCleaners(), getAllInspectors(), getAllTasks(), getRoom(), getCleanerSummary(), getCleaningItems()];

        // Await all promises concurrently
        await Promise.all(tasks);
      } catch (error) {
        console.error('Failed to fetch data:', error);
        // Handle any errors here, such as displaying an error message to the user
      }

      setIsLoading(false); // End loading after all promises are resolved
    };

    fetchData();
  }, []); // Empty dependency array means this effect runs only once after the initial render

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Grid container marginTop={2} spacing={gridSpacing}>
      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={3} sm={6} xs={12}>
            <ReportCard
              to={'/dashboard/users'}
              primary={activeCleaners}
              secondary="All Cleaners"
              color={theme.palette.warning.main}
              iconPrimary={GroupWorkRounded}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <ReportCard
              to={'/dashboard/users'}
              primary={activeInspectors}
              secondary="All Inspectors"
              color={theme.palette.error.main}
              iconPrimary={SupervisorAccount}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <ReportCard
              to={'/dashboard/tasks'}
              primary={everyTask}
              secondary="All Tasks"
              color={theme.palette.success.main}
              iconPrimary={DescriptionTwoTone}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <ReportCard
              to={'/dashboard/rooms'}
              primary={roomsCount}
              secondary="Total Room Count"
              color={theme.palette.primary.main}
              iconPrimary={RoomSharp}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <ReportCard
              primary={completedTasks.length}
              secondary="Completed Tasks"
              color={theme.palette.primary.dark}
              iconPrimary={TaskAltOutlined}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <ReportCard
              to={'/dashboard/inventory'}
              primary={cleaningItems.length}
              secondary="Cleaning Items"
              color={theme.palette.action.active}
              iconPrimary={CleaningServicesSharp}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <ReportCard
              primary={pendingTasks.length}
              secondary="Pending Tasks"
              color={theme.palette.action.focus}
              iconPrimary={AddTaskSharp}
            />
          </Grid>
        </Grid>
      </Grid>
      <Box display={'flex'} alignContent={'center'} width={'100%'} justifyContent={'center'}  alignItems={'center'}>
        <Charts data={cleanerSummary} />
        <FacilityCleaningOverviewChart />
      </Box>
    </Grid>
  );
};

export default Default;
