import React, { useEffect } from 'react';
import { Box, Card, CardContent, CardMedia, Typography, Grid, Button, Divider, CircularProgress } from '@mui/material';
import { FaUsers } from 'react-icons/fa6';
import { HiChartBar } from 'react-icons/hi';
import { Link } from 'react-router-dom/dist';
import useFetch from 'Hooks/useFetch';

const LearningOverview = () => {
  const currentRole = localStorage.getItem('role');
  const { isLoading, data } = useFetch('course/published-courses', 'get');
  const localData = [
    {
      id: '65f04832dbb7f1e6459b5067',
      thumbnailUrl: 'https://orionbucketlms.s3.amazonaws.com/thumbnails/osha+dpt+of+labour.png',
      title: 'Osha Training Guidelines',
      description: 'Cleaning above-head of factory buildings and ceilings',
      level: 'Cleaner',
      group: 'Beginner',

      authorName: 'OSHA',
      __v: 0
    },
    {
      id: '65f048ef0818c753684eca60',
      thumbnailUrl: 'https://orionbucketlms.s3.amazonaws.com/thumbnails/cdph.png',
      title: 'CDPH Food Safety Program',
      description: 'Cleaning of Oily',
      level: 'Cleaner',
      group: 'Beginner',
      authorName: 'CDPH'
    }
  ];

  return isLoading ? (
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
          <Typography variant="h5" gutterBottom color={'blue'}>
            {currentRole === 'Admin' ? 'Created Courses' : 'Listed Courses'}
          </Typography>
          <Grid container spacing={2}>
            {data.map((course, index) => (
              <Grid item key={index}>
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
                </Link>
              </Grid>
            ))}
            {localData.map((course, index) => (
              <Grid item key={index}>
                <Link to={`/dashboard/training-files/${course.id}`}>
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
                </Link>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default LearningOverview;
