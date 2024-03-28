import React from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProgressBar({ stats }) {
  const data = {
    datasets: [
      {
        label: 'Performance',
        data: [95, 5],
        backgroundColor: ['#5edd3e', '#3366ff'],

        borderWidth: 1
      }
    ],
    labels: ["Performance","Failure  ", ],
  };
  const options = {
    plugins: {
      labels: {
        render: 'label',
        fontColor: 'black',
        precision: 2
      }
    }
  };
  return (
    <div className="relative">
      <Doughnut data={data} options={options} height={80} />;
      <span className="absolute top-[50%] bottom-[50%] font-bold left-[45%]  text-2xl text-blue-500">95 %</span>
    </div>
  );
}
