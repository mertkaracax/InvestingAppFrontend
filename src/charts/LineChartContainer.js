import React from "react";
import classes from "./LineChartContainer.module.scss";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

function LineChartContainer() {
  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
  );
  const labels = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
  };

  const data = {
    labels,
    datasets: [
      {
        pointBorderWidth: 7,
        label: "Dataset 1",
        data: [
          500, 700, 1000, 5000, 3000, 2340, 4700, 6500, 6100, 6800, 7000, 7567,
        ],
        borderWidth: 2,
        borderColor: "#b5964d95",
        pointBackgroundColor: "#b5964d",
        backgroundColor: "#b5964d",
      },
    ],
  };

  return (
    <div className={classes.container}>
      <div className={classes.header}>Your Capital</div>
      <div className={classes.chart}>
        <Line options={options} data={data} />;
      </div>
    </div>
  );
}

export default LineChartContainer;
