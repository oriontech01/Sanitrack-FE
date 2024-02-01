import { useState, useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "../../styles/Charts.scss";

// eslint-disable-next-line react/prop-types
function Charts({ data }) {
  const [chartType, setChartType] = useState("bar");
  const chartRef = useRef(null);

  // const cleanerRoomData = [
  //   {
  //     _id: "65a3e4a08e1cd614e43c1c47",
  //     cleanerId: "65a3e4a08e1cd614e43c1c47",
  //     cleanerUsername: "cleaner-testing",
  //     totalRoomsCleaned: 1,
  //   },
  //   {
  //     _id: "65a168a2f08626bff34b026b",
  //     cleanerId: "65a168a2f08626bff34b026b",
  //     cleanerUsername: "lilstex",
  //     totalRoomsCleaned: 2,
  //   },
  //   {
  //       _id: "65a168a2f08626bff34b026b",
  //       cleanerId: "65a168a2f08626bff34b026b",
  //       cleanerUsername: "lilstex",
  //       totalRoomsCleaned: 2,
  //     },
  //     {
  //       _id: "65a168a2f08626bff34b026b",
  //       cleanerId: "65a168a2f08626bff34b026b",
  //       cleanerUsername: "lilstex",
  //       totalRoomsCleaned: 2,
  //     },
  // ];

  useEffect(() => {
    destroyChart();
    renderChart();
  }, [data, chartType]);

  const renderChart = () => {
    const chartData = {
      // eslint-disable-next-line react/prop-types
      labels: data.map((cleaner) => cleaner.cleanerUsername),
      datasets: [
        {
          label: chartType === "bar" ? "Total Rooms Cleaned" : undefined,
          // eslint-disable-next-line react/prop-types
          data: data.map((cleaner) => cleaner.totalRoomsCleaned),
          backgroundColor:
            chartType === "bar" ? "rgba(75, 192, 192, 0.2)" : undefined,
          borderColor:
            chartType === "bar" ? "rgba(75, 192, 192, 1)" : undefined,
          borderWidth: 1,
        },
      ],
    };

    const chartOptions = {
      scales: {
        y: {
          beginAtZero: true,
          max: Math.max(
            // eslint-disable-next-line react/prop-types
            ...data.map((data) => data.totalRoomsCleaned)
          ),
          ticks: {
            stepSize: 1,
          },
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    };

    const ctx = document.getElementById("cleanerRoomChart").getContext("2d");

    // Clear the canvas
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

    // Destroy the previous chart instance using destroy method
    if (chartRef.current) {
      chartRef.current.destroy();
    }

    // Create a new chart instance
    chartRef.current = new Chart(ctx, {
      type: chartType,
      data: chartData,
      options: chartOptions,
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
    <div className="charts-container">
      <div className="chart-controls">
        <label>
          Chart Type:
          <select
            value={chartType}
            onChange={(e) => setChartType(e.target.value)}
          >
            <option value="bar">Bar Chart</option>
            <option value="pie">Pie Chart</option>
          </select>
        </label>
      </div>
      <div className="chart-background">
        <canvas id="cleanerRoomChart" width="400" height="200"></canvas>
      </div>
    </div>
  );
}

export default Charts;