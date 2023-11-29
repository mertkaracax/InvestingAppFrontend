import React, { useState, useEffect } from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import classes from "./PieChartContainer.module.scss";
import ChartDataLabels from 'chartjs-plugin-datalabels';
import autocolors from 'chartjs-plugin-autocolors';

ChartJS.register(ArcElement, Tooltip, Legend, autocolors, ChartDataLabels);

export const PieChartContainer = (props) => {
  const data = {
    labels: props.assets && props.assets.map((item) => item.asset_name),
    datasets: [
      {
        label: "Investment Amount",
        data: props.assets && props.assets.map((item) => item.average_cost * item.quantity),
        backgroundColor: [
          "#5E5D5A",
          "#787774",
          "#545351",
          "#393735",
          "#636260",
        ],
        borderColor: "transparent",
        borderWidth: 1,
      },
    ],
  };

  const dataCash = {
    labels: ["CASH", "ASSET"],
    datasets: [
      {
        label: "Position Amount",
        data: [props.cashPosition, props.assetPosition],
        backgroundColor: ["#393735", "#636260"],
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
                    text: "Assets",
                    color: "#b5964d",
                  },
                  autocolors: {
                    enabled: false
                  },
                  datalabels: {
                    formatter: function(value, context) {
                      return context.chart.data.labels[context.dataIndex];
                    },
                    color: "white",
                    font: {
                      weight: 'normal',
                    }
                  }
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
                  formatter: function(value, context) {
                    return context.chart.data.labels[context.dataIndex];
                  },
                  color: "white",
                  font: {
                    weight: 'normal',
                  }
                }
              },
            }}
            data={dataCash}
          />
        </div>
      </div>
    </div>
  );
};
