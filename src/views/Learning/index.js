import React, { useEffect } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Grid, Button, Divider, CircularProgress } from '@mui/material';
import { FaUsers } from 'react-icons/fa6';
import { HiChartBar } from 'react-icons/hi';
import useCourses from 'Hooks/useCourses';
import { Link } from 'react-router-dom/dist';

const LearningOverview = () => {
  const currentRole = localStorage.getItem('role');
  const { getPublishedCourses, allPublishedCourses, loading } = useCourses();

  useEffect(() => {
    const fetchPublishedCourses = async () => {
      await getPublishedCourses();
    };
    fetchPublishedCourses();
  }, []);

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
              Learning
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
          <Typography variant="h5" gutterBottom color={'blue'}>
            {currentRole === 'Admin' ? 'Created Courses' : 'Listed Courses'}
          </Typography>
          <Grid container spacing={2}>
            {allPublishedCourses.map((course, index) => (
              <Grid item xs={6} key={index}>
                <a href="https://www.youtube.com/watch?v=84cMDuR-VuY" target="_blank" rel="noopener noreferrer">
                  <Card style={{ display: 'flex', height: '150px' }}>
                    <CardMedia
                      component="img"
                      image={course.thumbnailUrl}
                      alt={course.title}
                      style={{ height: '100%px', width: '50%', flexGrow: 0, objectFit: 'cover' }}
                    />
                    <CardContent style={{}}>
                      <Typography backgroundColor={'lime'} width={'40%'} textAlign={'center'} borderRadius={10}>
                        {course.level}
                      </Typography>
                      <Typography color="blue" width={'200%'} fontWeight={'bold'}>
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
                </a>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LearningOverview;
