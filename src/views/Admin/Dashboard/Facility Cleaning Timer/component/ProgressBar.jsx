
import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export default function ProgressBar({ stats }) {
  const data = {
    datasets: [
      {
        label: "User Ratio",
        data: [90, 10],
        backgroundColor: ["#5edd3e", "#3366ff"],

        borderWidth: 1,
      },
    ],
    labels: ["Active  ", "Registered"],
  };
  const options = {
    plugins: {
      legend: {
        position: "bottom",
        rtl: true,
        labels: {
          // usePointStyle: true,
          // pointStyle: 'circle',
          padding: 20,
        },
      },
    },
  };
  return <Doughnut data={data} options={options} height={80} />;
}
