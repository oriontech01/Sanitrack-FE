import { useState, useEffect, useRef } from 'react';
import { FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { styled } from '@mui/system';
import Chart from 'chart.js/auto';

const ChartContainer = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginTop: 20
});

const ChartControls = styled('div')({
  marginBottom: 20
});

function Charts({ data }) {
  const [chartType, setChartType] = useState('bar');
  const chartRef = useRef(null);

  useEffect(() => {
    destroyChart();
    renderChart();
  }, [data, chartType]);

  const renderChart = () => {
    const chartData = {
      labels: data.map(cleaner => cleaner.cleanerUsername),
      datasets: [
        {
          label: chartType === 'bar' ? 'Total Rooms Cleaned' : undefined,
          data: data.map(cleaner => cleaner.totalRoomsCleaned),
          backgroundColor:
            chartType === 'bar'
              ? data.map((cleaner, index) => (index % 2 === 0 ? 'rgba(75, 192, 192, 0.2)' : 'rgba(255, 99, 132, 0.2)'))
              : undefined,
          borderColor:
            chartType === 'bar'
              ? data.map((cleaner, index) => (index % 2 === 0 ? 'rgba(75, 192, 192, 1)' : 'rgba(255, 99, 132, 1)'))
              : undefined,
          borderWidth: 1
        }
      ]
    };

    const chartOptions = {
      scales: {
        y: {
          beginAtZero: true,
          max: Math.max(...data.map(data => data.totalRoomsCleaned)),
          ticks: {
            stepSize: 1
          }
        }
      },
      responsive: true,
      maintainAspectRatio: false
    };

    const ctx = document.getElementById('cleanerRoomChart').getContext('2d');

    if (chartRef.current) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: chartType,
      data: chartData,
      options: chartOptions
    });
  };

  const destroyChart = () => {
    if (chartRef.current) {
      const ctx = chartRef.current.ctx;
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
      chartRef.current.destroy();
    }
  };

  return (
    <ChartContainer style={{ margin: '0 auto', marginTop: 50}}>
      <Typography variant="h4" component="h4" gutterBottom style={{ fontWeight: 600, marginBottom: 20 }}>
        Cleaning Data Overview
      </Typography>
      <ChartControls>
        <InputLabel style={{ padding: 2 }} variant="h2">
          Chart Type
        </InputLabel>
        <FormControl>
          <Select
            value={chartType}
            onChange={e => setChartType(e.target.value)}
          >
            <MenuItem value="bar">Bar Chart</MenuItem>
            <MenuItem value="pie">Pie Chart</MenuItem>
          </Select>
        </FormControl>
      </ChartControls>
      <div className="chart-background">
        <canvas id="cleanerRoomChart" width="400" height="200"></canvas>
      </div>
    </ChartContainer>
  );
}

export default Charts;
