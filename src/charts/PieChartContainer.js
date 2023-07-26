import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import classes from "./PieChartContainer.module.scss";
import "chartjs-plugin-datalabels";

ChartJS.register(ArcElement, Tooltip, Legend);

export const PieChartContainer = (props) => {
  const data = {
    labels: props.assets && props.assets.map((item) => item.assetName),
    datasets: [
      {
        label: "Piyasa Değeri",
        data: props.assets && props.assets.map((item) => item.totalValue),
        backgroundColor: [
          "#888888",
          "#C1C1C1",
          "#7C614B",
          "#515151",
          "#BAA998",
        ],
        borderColor: "transparent",
        borderWidth: 1,
      },
    ],
  };

  const dataCash = {
    labels: ["Cash", "Stock"],
    datasets: [
      {
        label: "Percentage",
        data: [props.cashPosition, props.assetPosition],
        backgroundColor: ["#515151", "#BAA998"],
        borderColor: "transparent",
        borderWidth: 1,
      },
    ],
  };
  return (
    <div className={classes.container}>
      <div className={classes.header}>Your positions</div>
      <div className={classes.chartContainer}>
        <div className={classes.chart}>
          {props.assets && props.assets.length > 0 ? (
            <Pie
              options={{
                plugins: {
                  legend: {
                    display: false,
                  },
                  title: {
                    display: true,
                    text: "Stocks",
                  },
                },
              }}
              data={data}
            />
          ) : (
            <span style={{ color: "gray" }}>You don't have any asset</span>
          )}
        </div>
        <div className={classes.chart}>
          <Pie
            options={{
              plugins: {
                legend: {
                  display: false,
                },
                title: {
                  display: true,
                  text: "Assets/Cash",
                  color: "#b5964d",
                  position: "top",
                },
                datalabels: {
                  color: "white", // Labelların yazı rengi
                  anchor: "end", // Labelların nerede konumlanacağı (start, center, end)
                  align: "end", // Labelların dilimin neresine göre hizalanacağı (start, center, end)
                },
              },
            }}
            data={dataCash}
          />
        </div>
      </div>
    </div>
  );
};
