import React, {useEffect, useState} from 'react';
import useTask from 'Hooks/useTask';
import useWorkHistory from 'Hooks/useWorkHistory';
import useRoom from 'Hooks/useRoom';
import Loader from 'component/Loader/Loader';

// material-ui
import { useTheme, styled } from '@mui/material/styles';
import { Grid, Card, CardHeader, CardContent, Typography, Divider, LinearProgress } from '@mui/material';
import Charts from './chart/Charts';

//project import
import SalesLineCard from './SalesLineCard';
import SalesLineCardData from './chart/sale-chart-1';

import RevenuChartCard from './RevenuChartCard';
import RevenuChartCardData from './chart/revenu-chart';
import ReportCard from './ReportCard';
import { gridSpacing } from 'config.js';

// assets
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import DescriptionTwoTone from '@mui/icons-material/DescriptionTwoTone';
import ThumbUpAltTwoTone from '@mui/icons-material/ThumbUpAltTwoTone';
import { RoomSharp } from '@mui/icons-material';
import { GroupWorkRounded } from '@mui/icons-material';
import { SupervisorAccount } from '@mui/icons-material';

// custom style
const FlatCardBlock = styled((props) => <Grid item sm={6} xs={12} {...props} />)(({ theme }) => ({
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
  const {
    activeCleaners,
    activeInspectors,
    everyTask,
    getAllCleaners,
    getAllInspectors,
    getAllTasks,
  } = useTask();
  const { roomsCount, getRoom } = useRoom();
  const { getCleanerSummary, cleanerSummary } = useWorkHistory();
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Start loading before initiating asynchronous operations
  
      try {
        // Create an array of promises
        const tasks = [
          getAllCleaners(),
          getAllInspectors(),
          getAllTasks(),
          getRoom(),
          getCleanerSummary(),
        ];
  
        // Await all promises concurrently
        await Promise.all(tasks);
  
      } catch (error) {
        console.error("Failed to fetch data:", error);
        // Handle any errors here, such as displaying an error message to the user
      }
  
      setIsLoading(false); // End loading after all promises are resolved
    };
  
    fetchData();
  }, []); // Empty dependency array means this effect runs only once after the initial render
  

  if(isLoading){
    return <Loader/>
  }

  return (
    <Grid container spacing={gridSpacing}>
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
            {/* <Typography variant='h2'>Cleaner Work History Summary</Typography> */}
          </Grid>
        </Grid>
      </Grid>

      <Charts data={cleanerSummary}/>
      {/* <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item lg={8} xs={12}>
            <Grid container spacing={gridSpacing}>
              <Grid item xs={12} sm={6}>
                <Grid container spacing={gridSpacing}>
                  <Grid item xs={12}>
                    <SalesLineCard
                      chartData={SalesLineCardData}
                      title="Sales Per Day"
                      percentage="3%"
                      icon={<TrendingDownIcon />}
                      footerData={[
                        {
                          value: '$4230',
                          label: 'Total Revenue'
                        },
                        {
                          value: '321',
                          label: 'Today Sales'
                        }
                      ]}
                    />
                  </Grid>
                  <Grid item xs={12} sx={{ display: { md: 'block', sm: 'none' } }}>
                    <Card>
                      <CardContent sx={{ p: '0 !important' }}>
                        <Grid container alignItems="center" spacing={0}>
                          <FlatCardBlock>
                            <Grid container alignItems="center" spacing={1}>
                              <Grid item>
                                <Typography variant="subtitle2" align="left">
                                  REALTY
                                </Typography>
                              </Grid>
                              <Grid item sm zeroMinWidth>
                                <Typography variant="h5" sx={{ color: theme.palette.error.main }} align="right">
                                  -0.99
                                </Typography>
                              </Grid>
                            </Grid>
                          </FlatCardBlock>
                          <FlatCardBlock>
                            <Grid container alignItems="center" spacing={1}>
                              <Grid item>
                                <Typography variant="subtitle2" align="left">
                                  INFRA
                                </Typography>
                              </Grid>
                              <Grid item sm zeroMinWidth>
                                <Typography variant="h5" sx={{ color: theme.palette.success.main }} align="right">
                                  -7.66
                                </Typography>
                              </Grid>
                            </Grid>
                          </FlatCardBlock>
                        </Grid>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
              <Grid item xs={12} sm={6}>
                <RevenuChartCard chartData={RevenuChartCardData} />
              </Grid>
            </Grid>
          </Grid>
          <Grid item lg={4} xs={12}>
            <Card>
              <CardHeader
                title={
                  <Typography component="div" className="card-header">
                    Traffic Sources
                  </Typography>
                }
              />
              <Divider />
              <CardContent>
                <Grid container spacing={gridSpacing}>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item sm zeroMinWidth>
                        <Typography variant="body2">Direct</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" align="right">
                          80%
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <LinearProgress variant="determinate" aria-label="direct" value={80} color="primary" />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item sm zeroMinWidth>
                        <Typography variant="body2">Social</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" align="right">
                          50%
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <LinearProgress variant="determinate" aria-label="Social" value={50} color="secondary" />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item sm zeroMinWidth>
                        <Typography variant="body2">Referral</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" align="right">
                          20%
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <LinearProgress variant="determinate" aria-label="Referral" value={20} color="primary" />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item sm zeroMinWidth>
                        <Typography variant="body2">Bounce</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" align="right">
                          60%
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <LinearProgress variant="determinate" aria-label="Bounce" value={60} color="secondary" />
                      </Grid>
                    </Grid>
                  </Grid>
                  <Grid item xs={12}>
                    <Grid container alignItems="center" spacing={1}>
                      <Grid item sm zeroMinWidth>
                        <Typography variant="body2">Internet</Typography>
                      </Grid>
                      <Grid item>
                        <Typography variant="body2" align="right">
                          40%
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <LinearProgress variant="determinate" aria-label="Internet" value={40} color="primary" />
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Grid> */}
    </Grid>
  );
};

export default Default;
