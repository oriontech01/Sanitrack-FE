import React from 'react';
import { Bar } from 'react-chartjs-2';
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

const RoundedBarsPlugin = {
  id: 'roundedBars',

  // This method is called when the chart is initialized
  afterDraw: (chart) => {
    const ctx = chart.ctx;
    const bars = chart.getDatasetMeta(0).data;

    bars.forEach((bar) => {
      const { x, y, width, height } = bar._model;

      // Calculate border radius
      const borderRadius = height * 0.1;

      // Draw the rounded rectangle
      ctx.beginPath();
      ctx.moveTo(x, y + borderRadius);
      ctx.lineTo(x, y + height - borderRadius);
      ctx.quadraticCurveTo(x, y + height, x + borderRadius, y + height);
      ctx.lineTo(x + width - borderRadius, y + height);
      ctx.quadraticCurveTo(x + width, y + height, x + width, y + height - borderRadius);
      ctx.lineTo(x + width, y + borderRadius);
      ctx.quadraticCurveTo(x + width, y, x + width - borderRadius, y);
      ctx.lineTo(x + borderRadius, y);
      ctx.quadraticCurveTo(x, y, x, y + borderRadius);
      ctx.closePath();

      // Set the fill color to the same as the bar
      ctx.fillStyle = bar._model.backgroundColor;

      // Fill the bar
      ctx.fill();
    });
  },
};
const HorizonChart = ({ missed }) => {
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
  const data = {
    labels: missed.map(item => item.itemNames),

    datasets: [
      {
        label: 'Monthly Most Frequent Missed',
        backgroundColor: '#0000FF', // Red color with some transparency
        borderColor: '#0000FF',
        borderWidth: 1,
        borderRadius: 30,
        hoverBackgroundColor: '#3366ff',
        hoverBorderColor: '#3366ff',
        data: missed.map(item => item.count)
      }
    ]
  };

  // Chart options
  const options = {
    indexAxis: 'y',
    responsive: true,
    scales: {
      // xAxes: {
      //   display: 'hidden'
      // },

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
    },
    plugins: {
      // Register the custom plugin
      legend: false,
      title: false,
      roundedBars: RoundedBarsPlugin,
    },
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
    <div className="h-[400px] mx-auto flex flex-col justify-center items-center w-full ">
      <span className="p-2 border border-black  bg-gray-200 mb-5">
        <h2>Number of Monthly Missed Cleanings</h2>
      </span>

      <Bar data={data} options={options} />
    </div>
  );
};

export default HorizonChart;
