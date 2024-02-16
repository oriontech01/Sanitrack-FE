import React, { useEffect, useState } from 'react';
import useTask from 'Hooks/useTask';
import useWorkHistory from 'Hooks/useWorkHistory';
import useRoom from 'Hooks/useRoom';
import Loader from 'component/Loader/Loader';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Grid, Card, CardHeader, CardContent, Typography, Divider, LinearProgress } from '@mui/material';
import Charts from './chart/Charts';

//project import
import ReportCard from './ReportCard';
import { gridSpacing } from 'config.js';

// assets
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import DescriptionTwoTone from '@mui/icons-material/DescriptionTwoTone';
import ThumbUpAltTwoTone from '@mui/icons-material/ThumbUpAltTwoTone';
import { AddTaskSharp, CleaningServicesSharp, RoomSharp, TaskAltOutlined } from '@mui/icons-material';
import { GroupWorkRounded } from '@mui/icons-material';
import { SupervisorAccount } from '@mui/icons-material';

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
  const { activeCleaners, activeInspectors, everyTask, getAllCleaners, getAllInspectors, getAllTasks } = useTask();
  const { roomsCount, getRoom } = useRoom();
  const { getCleanerSummary, cleanerSummary } = useWorkHistory();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Start loading before initiating asynchronous operations

      try {
        // Create an array of promises
        const tasks = [getAllCleaners(), getAllInspectors(), getAllTasks(), getRoom(), getCleanerSummary()];

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
              primary={activeCleaners}
              secondary="All Cleaners"
              color={theme.palette.warning.main}
              footerData="Total Number Of Active Cleaners."
              iconPrimary={GroupWorkRounded}
              // iconFooter={TrendingUpIcon}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <ReportCard
              primary={activeInspectors}
              secondary="All Inspectors"
              color={theme.palette.error.main}
              footerData="Total Number Of Active inspectors."
              iconPrimary={SupervisorAccount}
              // iconFooter={TrendingDownIcon}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <ReportCard
              primary={everyTask}
              secondary="All Tasks"
              color={theme.palette.success.main}
              footerData="All Available Tasks For Cleaners and Inspectors."
              iconPrimary={DescriptionTwoTone}
              // iconFooter={TrendingUpIcon}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <ReportCard
              primary={roomsCount}
              secondary="Total Room Count"
              color={theme.palette.primary.main}
              footerData="All Rooms Listed For Cleaning."
              iconPrimary={RoomSharp}
              // iconFooter={TrendingUpIcon}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <ReportCard
              primary={5}
              secondary="Completed Tasks"
              color={theme.palette.primary.dark}
              footerData="All Completed Tasks."
              iconPrimary={TaskAltOutlined}
              // iconFooter={TrendingUpIcon}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <ReportCard
              primary={5}
              secondary="Cleaning Items"
              color={theme.palette.action.active}
              footerData="Total Number Of Available Cleaning Items."
              iconPrimary={CleaningServicesSharp}
              // iconFooter={TrendingUpIcon}
            />
          </Grid>
          <Grid item lg={3} sm={6} xs={12}>
            <ReportCard
              primary={5}
              secondary="Pending Tasks"
              color={theme.palette.action.focus}
              footerData="Total Number Of Available Cleaning Items."
              iconPrimary={AddTaskSharp}
              // iconFooter={TrendingUpIcon}
            />
          </Grid>
        </Grid>
      </Grid>
      <Charts data={cleanerSummary} />
    </Grid>
  );
};

export default Default;
