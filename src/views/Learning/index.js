import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Grid, Button, Divider, CircularProgress, Tabs, Tab } from '@mui/material';
import { FaUsers } from 'react-icons/fa6';
import { HiChartBar } from 'react-icons/hi';
import useCourses from 'Hooks/useCourses';
import { Link } from 'react-router-dom/dist';
import TabPanel from 'component/Tab Panel/TabPanel';

const LearningOverview = () => {
  const [selectedTab, setSelectedTab] = useState(0);
  const currentRole = localStorage.getItem('role');
  const { getPublishedCourses, allPublishedCourses, loading } = useCourses();

  useEffect(() => {
    const fetchPublishedCourses = async () => {
      await getPublishedCourses();
    };
    fetchPublishedCourses();
  }, []);
  const handleTabChange = (event, newValue) => {
    setSelectedTab(newValue);
  };

  return loading ? (
    <div className=" flex items-center justify-center h-screen">
      <CircularProgress />
    </div>
  ) : (
    <Box sx={{ flexGrow: 1, m: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Box
            width={'100%'}
            display={'flex'}
            justifyContent={'space-between'}
            alignItems={'center'}
            alignContent={'center'}
            marginBottom={5}
          >
            <Typography variant="h2" color={'blue'} gutterBottom>
              Training
            </Typography>
            {currentRole === 'Admin' && (
              // <Link to={'/dashboard/add-course'}>
              <Button variant="contained" style={{ backgroundColor: 'blue' }} title="Add a new course">
                Add New +
              </Button>
              // </Link>
            )}
          </Box>

          {currentRole === 'Admin' && (
            <Grid container spacing={3}>
              <Grid item>
                <Card sx={{ minWidth: 200 }}>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      NUMBER OF COURSES CREATED
                    </Typography>
                    <Typography variant="h1">5</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card sx={{ minWidth: 200 }}>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      TOTAL CLEANERS ENROLLED
                    </Typography>
                    <Typography variant="h1">5</Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card sx={{ minWidth: 200 }}>
                  <CardContent>
                    <Typography variant="h6" component="div">
                      TOTAL INSPECTORS ENROLLED
                    </Typography>
                    <Typography variant="h1">5</Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </Grid>

        <Grid item xs={12}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            variant="fullWidth"
            centered
            sx={{
              '& .MuiTab-root': {
                flex: 1 // Ensure tabs take equal width on all screen sizes
              },
              '& .Mui-selected': {
                color: 'blue',
                backgroundColor: 'white'
              }
            }}
          >
            <Tab style={{ width: '50%' }} label="Created Courses" />

            <Tab label="Created File" />
          </Tabs>
          {/* <Typography variant="h5" gutterBottom color={'blue'}>
            {currentRole === 'Admin' ? 'Created Courses' : 'Listed Courses'}
          </Typography> */}
          <TabPanel value={selectedTab} index={0}>
            <Grid container spacing={2}>
              {allPublishedCourses.map((course, index) => (
                <Grid item xs={6} key={index}>
                  <Link to={`/dashboard/learning/${course._id}`}>
                    <Card style={{ display: 'flex', height: '150px' }}>
                      <CardMedia
                        component="img"
                        image={course.thumbnailUrl}
                        alt={course.title}
                        style={{ height: '100%px', width: '50%', flexGrow: 0, objectFit: 'cover' }}
                      />
                      <CardContent>
                        <Typography backgroundColor={'lime'} width={'40%'} textAlign={'center'} borderRadius={10}>
                          {course.level}
                        </Typography>
                        <Typography color="blue" width={'150%'} fontWeight={'bold'}>
                          {course.title}
                        </Typography>
                        <Typography>Author: {course.authorName}</Typography>
                        <Divider style={{ margin: '10px 0' }} />
                        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={'5px'}>
                          <Typography display={'flex'} gap={1} alignItems={'center'}>
                            <FaUsers /> {course.students} students
                          </Typography>
                          <Typography display={'flex'} gap={1} alignItems={'center'} justifyContent={'center'}>
                            <HiChartBar fill="orange" /> {course.group}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </TabPanel>
          <TabPanel value={selectedTab} index={1}>
            <Grid container spacing={2}>
              {allPublishedCourses.map((course, index) => (
                <Grid item xs={6} key={index}>
                  <Link to={`/dashboard/training/${course._id}`}>
                    <Card style={{ display: 'flex', height: '150px' }}>
                      <CardMedia
                        component="img"
                        image={course.thumbnailUrl}
                        alt={course.title}
                        style={{ height: '100%px', width: '50%', flexGrow: 0, objectFit: 'cover' }}
                      />
                      <CardContent>
                        <Typography backgroundColor={'lime'} width={'40%'} textAlign={'center'} borderRadius={10}>
                          {course.level}
                        </Typography>
                        <Typography color="blue" width={'150%'} fontWeight={'bold'}>
                          {course.title}
                        </Typography>
                        <Typography>Author: {course.authorName}</Typography>
                        <Divider style={{ margin: '10px 0' }} />
                        <Box display={'flex'} justifyContent={'center'} alignItems={'center'} gap={'5px'}>
                          <Typography display={'flex'} gap={1} alignItems={'center'}>
                            <FaUsers /> {course.students} students
                          </Typography>
                          <Typography display={'flex'} gap={1} alignItems={'center'} justifyContent={'center'}>
                            <HiChartBar fill="orange" /> {course.group}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </TabPanel>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LearningOverview;
