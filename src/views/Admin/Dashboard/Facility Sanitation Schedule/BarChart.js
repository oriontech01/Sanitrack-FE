import React from 'react';
import { Bar } from 'react-chartjs-2';

const MonthlyMissedCleaningsChart = () => {
  // Sample data (replace with your actual data)
  const monthlyMissedCleanings = [5, 3, 7, 2, 4, 6, 8, 3, 2, 5, 4, 6]; // Example data for 12 months

  // Labels for the months
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  // Chart data
  const data = {
    labels: months,
    datasets: [
      {
        label: 'Monthly Missed Cleanings',
        backgroundColor: '#5edd3e', // Red color with some transparency
        borderColor: '#5edd3e',
        borderWidth: 1,
        hoverBackgroundColor: '#3366ff',
        hoverBorderColor: '#3366ff',
        data: monthlyMissedCleanings,
      },
    ],
  };

  // Chart options
  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <div className='h-[400px] mx-auto flex flex-col justify-center items-center w-full'>
      <h2>Number of Monthly Missed Cleanings</h2>
      <Bar data={data} options={options}   />
    </div>
  );
};

export default MonthlyMissedCleaningsChart;
