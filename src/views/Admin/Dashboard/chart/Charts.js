import { useState, useEffect, useRef } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Chart from 'chart.js/auto';

const ChartContainer = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: 20,
  width: '95%', // Use a percentage to make the width responsive
  maxWidth: '800px', // Max width for larger screens
  marginLeft: 'auto', // Center the chart
  marginRight: 'auto', // Center the chart
}));

const ChartControls = styled('div')({
  marginBottom: 20,
  display: 'flex',
  justifyContent: 'center',
  width: '100%',
});

const ChartWrapper = styled('div')(({ theme }) => ({
  width: '100%', // Make the canvas width responsive
  height: 'auto', // Adjust height automatically
  minHeight: '300px', // Minimum height to ensure visibility on smaller screens
  maxHeight: '500px', // Maximum height for larger screens
  '& canvas': {
    maxWidth: '100% !important', // Ensure the canvas is responsive
    height: 'auto !important', // Adjust height automatically
  },
}));

function Charts({ data }) {
  const [chartType, setChartType] = useState('bar');
  const chartRef = useRef(null);

  useEffect(() => {
    destroyChart();
    renderChart();
  }, [data, chartType]);

  const renderChart = () => {
    const chartData = {
      labels: data.map((cleaner) => cleaner.cleanerUsername),
      datasets: [
        {
          label: chartType === 'bar' ? 'Total Rooms Cleaned' : undefined,
          data: data.map((cleaner) => cleaner.totalRoomsCleaned),
          backgroundColor: chartType === 'bar' ? data.map((cleaner, index) => (index % 2 === 0 ? 'rgba(75, 192, 192, 0.2)' : 'rgba(255, 99, 132, 0.2)')) : undefined,
          borderColor: chartType === 'bar' ? data.map((cleaner, index) => (index % 2 === 0 ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)')) : undefined,
          borderWidth: 1,
        },
      ],
    };

    const chartOptions = {
      scales: {
        y: {
          beginAtZero: true,
          max: Math.max(...data.map((data) => data.totalRoomsCleaned)) + 1, // Add 1 to ensure the highest value is visible
          ticks: {
            stepSize: 1,
          },
        },
      },
      responsive: true,
      maintainAspectRatio: true, // Adjust based on your need
    };

    const ctx = document.getElementById('cleanerRoomChart').getContext('2d');
    if (chartRef.current) {
      chartRef.current.destroy();
    }
    chartRef.current = new Chart(ctx, {
      type: chartType,
      data: chartData,
      options: chartOptions,
    });
  };

  const destroyChart = () => {
    if (chartRef.current) {
      chartRef.current.destroy();
    }
  };

  return (
    <ChartContainer>
      <Typography variant="h4" component="h4" gutterBottom style={{ fontWeight: 'bold', marginBottom: 20 }}>
        Cleaning Data Overview
      </Typography>
      <ChartControls>
        <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
          <InputLabel>Chart Type</InputLabel>
          <Select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
            label="Chart Type"
          >
            <MenuItem value="bar">Bar Chart</MenuItem>
            <MenuItem value="pie">Pie Chart</MenuItem>
          </Select>
        </FormControl>
      </ChartControls>
      <ChartWrapper>
        <canvas id="cleanerRoomChart"></canvas>
      </ChartWrapper>
    </ChartContainer>
  );
}

export default Charts;
