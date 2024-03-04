import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import facilitiesData from 'constants/facilitiesData';
import { Box, Typography } from '@mui/material';

const FacilityCleaningOverviewChart = () => {
  return (
    <Box textAlign={'center'} height={'100%'} width={'100%'} display={'flex'} flexDirection={'column'} justifyContent={'flex-end'} >
      <Typography fontWeight={'bold'} marginBottom={10} variant="h4">Facility Cleaning Overview</Typography>
      <BarChart
        width={500}
        height={300}
        data={facilitiesData}
        margin={{
          top: 20,
          right: 30,
          left: 20,
          bottom: 5
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="roomsCleaned" stackId="a" fill="#8884d8" />
        <Bar dataKey="totalRooms" stackId="a" fill="#82ca9d" />
      </BarChart>
    </Box>
  );
};

export default FacilityCleaningOverviewChart;
