import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
  BarElement
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Filler, Legend, BarElement);
const MonthlyMissedCleaningsChart = ({ missed }) => {
  // Sample data (replace with your actual data)
  const monthlyMissedCleanings = [5, 3, 7, 2, 4, 6, 8, 3, 2, 5, 4, 6]; // Example data for 12 months

  // Labels for the months
  const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  // const options = {

  //   plugins: {
  //     legend: {
  //       position: "top",
  //       labels: {
  //         usePointStyle: true,
  //         pointStyle: "circle",
  //         padding: 20,
  //       },
  //     },
  //     title: {
  //       display: true,
  //       text: "Transaction Summary",
  //       position: "left",
  //     },
  //   },
  // };
  // Chart data

  console.log("sec", missed.map((item) => months[item?._id ]))
  const data = {
    labels:  missed.map((item) => months[item?._id -1]),

    datasets: [
      {
        label: 'Monthly Missed Cleanings',
        backgroundColor: '#0000FF', // Red color with some transparency
        borderColor: 'white',
        borderWidth: 1,
        hoverBackgroundColor: '#3366ff',
        hoverBorderColor: '#3366ff',
        data: missed.map((item) => item?.missed_cleanings)
      }
    ]
  };

  // Chart options
  const options = {
    responsive: true,
    scales: {
      x: {
        grid: {
          display: false // Hide the vertical gridlines on the x-axis
        }
      },
      y: {
        grid: {
          display: false // Hide the horizontal gridlines on the y-axis
        }
      }
    }
    // scales: {
    //   yAxes: [
    //     {
    //       ticks: {
    //         beginAtZero: true,
    //       },
    //     },
    //   ],
    // },
  };

  return (
    <div className="h-[400px] mx-auto flex flex-col justify-center items-center w-full">
      <span className="p-2 border border-black  bg-gray-200 mb-5">
        <h2>Number of Monthly Missed Cleanings</h2>
      </span>

      <Bar data={data} options={options} />
    </div>
  );
};

export default MonthlyMissedCleaningsChart;
