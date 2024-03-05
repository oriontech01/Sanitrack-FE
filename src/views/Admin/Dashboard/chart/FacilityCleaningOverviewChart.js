import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import facilitiesData from 'constants/facilitiesData';
import { Box, Typography, useTheme, useMediaQuery } from '@mui/material';

const FacilityCleaningOverviewChart = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // You can further customize sizes based on your needs or use '100%' to make it fully responsive
  const chartSize = {
    width: isMobile ? '100%' : 500, // Use 100% width for mobile devices
    height: 300,
  };

  return (
    <Box sx={{
      textAlign: 'center',
      height: '100%',
      width: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end'
    }}>
      <Typography fontWeight={'bold'} marginBottom={2} variant="h4">Facility Cleaning Overview</Typography>
      <ResponsiveContainer width="100%" height={chartSize.height}>
        <BarChart
          data={facilitiesData}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 5,
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
      </ResponsiveContainer>
    </Box>
  );
};

export default FacilityCleaningOverviewChart;
