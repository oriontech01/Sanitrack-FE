// PieChart3D.js

import React from 'react';
import {  Pie } from 'react-chartjs-2';

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
    ArcElement
  } from "chart.js";
ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Filler,
    Legend,ArcElement
  );
const PieChart3D = () => {
  const data = {
    labels: ['Completed', 'Incomplete',],
    datasets: [
      {
        label: 'cleaning rate',
        data: [98, 2,],
        backgroundColor: [
          '#0000FF',
          '#F0F2F8',
        
        ],
        borderColor: 'white',
        // borderColor: [
        //   'rgba(255, 99, 132, 1)',
        //   'rgba(54, 162, 235, 1)',
         
        // ],
        borderWidth: 1
      }
    ]
  };

  const options = {
    plugins: {
      legend: {
        display: true,
        position: 'top'
      },
    //   labels: {
    //     render: 'percentage',
    //     fontColor: '#fff',
    //     precision: 2,
    //     fontSize: 16,
    //     fontFamily: 'Arial',
    //     fontStyle: 'bold',
    //   },
    },
    maintainAspectRatio: false,
    layout: {
      padding: 10
    },
    responsive: true
    // plugins: {
    //   tooltip: {
    //     callbacks: {
    //       label: function(context) {
    //         return context.label + ": " + context.parsed + " %";
    //       }
    //     }
    //   }
    // }
  };

  return (
    <div className="h-[200px] mx-auto flex flex-col justify-center items-center w-full">
      <span className="p-2 border border-black  bg-gray-200 ">
        <h2>Current Cleaning Rate</h2>
      </span>
      <Pie data={data} options={options} />
    </div>
  );
};

export default PieChart3D;
