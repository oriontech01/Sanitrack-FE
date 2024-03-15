import React, { useEffect } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Grid, Button, Divider, CircularProgress } from '@mui/material';
import { FaUsers } from 'react-icons/fa6';
import { HiChartBar } from 'react-icons/hi';
import useCourses from 'Hooks/useCourses';

const dummyData = [
  {
    title: 'Investing In Stocks The Complete Course',
    students: '265.7K',
    level: 'Beginner',
    role: 'CLEANER'
  },
  {
    title: 'Investing In Stocks The Complete Course',
    students: '265.7K',
    level: 'Intermediate',
    role: 'CLEANER'
  },
  {
    title: 'Investing In Stocks The Complete Course',
    students: '265.7K',
    level: 'Beginner',
    role: 'INSPECTOR'
  },
  {
    title: 'Investing In Stocks The Complete Course',
    students: '265.7K',
    level: 'Advanced',
    role: 'INSPECTOR'
  }
];

const LearningOverview = () => {
  const { getPublishedCourses, allPublishedCourses, loading } = useCourses();

  useEffect(() => {
    const fetchPublishedCourses = async () => {
      await getPublishedCourses();
    };
    fetchPublishedCourses();
  }, []);

  return loading ? (
    <CircularProgress />
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
              Learning
            </Typography>
            <Button variant="contained" style={{ backgroundColor: 'blue' }} title="Add a new course">
              Add New +
            </Button>
          </Box>

          <Grid container spacing={3}>
            <Grid item>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    NUMBER OF COURSES CREATED
                  </Typography>
                  <Typography variant="h1">5</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    TOTAL CLEANERS ENROLLED
                  </Typography>
                  <Typography variant="h1">5</Typography>
                </CardContent>
              </Card>
            </Grid>
            <Grid item>
              <Card sx={{ minWidth: 275 }}>
                <CardContent>
                  <Typography variant="h5" component="div">
                    TOTAL INSPECTORS ENROLLED
                  </Typography>
                  <Typography variant="h1">5</Typography>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom color={'blue'}>
            Created Courses
          </Typography>
          <Grid container spacing={2}>
            {allPublishedCourses.map((course, index) => (
              <Grid item xs={6} key={index}>
                {' '}
                {/* Set to 6 for half width */}
                <Card style={{ display: 'flex' }}>
                  {' '}
                  <CardMedia
                    component="img"
                    image={course.thumbnailUrl}
                    alt={course.title}
                    style={{ height: '180px', width: 'auto', flexGrow: 0 }}
                  />
                  <CardContent style={{ flexGrow: 1 }}>
                    <Typography
                      gutterBottom
                      variant="body2"
                      component="div"
                      backgroundColor={'lime'}
                      width={'40%'}
                      textAlign={'center'}
                      borderRadius={10}
                    >
                      {course.level}
                    </Typography>
                    <Typography variant="body2" color="blue" fontWeight={'bold'}>
                      {course.title}
                    </Typography>
                    <Typography variant="body2" >
                       Author: {course.authorName}
                    </Typography>
                    <Divider style={{ padding: 5 }} />
                    <Box display={'flex'} justifyContent={'space-between'}>
                      {/* <Typography marginTop={2} variant="body2" display={'flex'} gap={1} alignItems={'center'}>
                        <FaUsers /> {course.students} students
                      </Typography> */}
                      <Typography marginTop={2} variant="body2" display={'flex'} gap={1} alignItems={'center'}>
                        <HiChartBar fill="orange" /> {course.group}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LearningOverview;
