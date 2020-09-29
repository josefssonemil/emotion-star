import React from "react";
import { Radar } from "react-chartjs-2";

export default function RadarChart(props) {
  const performance = props.performance;
  const data = {
    /*["😁", "😡", "😥", "😐", "😮"]*/
    labels: ["", "", "", "", ""],
    datasets: [
      {
        label: "Player 1",
        backgroundColor: "rgba(66, 245, 87, 0.2)",
        borderColor: "rgba(66, 245, 87, 1)",
        borderWidth: 5,
        pointBackgroundColor: "rgba(155,99,132,1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(179,181,198,1)",
        pointRadius: 0,
        lineTension: 0.1,
        data: performance.player1,
      },
      {
        label: "Player 2",
        backgroundColor: "rgba(247, 52, 120,0.2)",
        borderColor: "rgba(255,99,132,1)",
        borderWidth: 5,
        pointBackgroundColor: "rgba(255,99,132,1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(255,99,132,1)",
        pointRadius: 0,
        lineTension: 0.1,
        data: performance.player2,
      },
      {
        label: "Average",
        backgroundColor: "rgba(179,181,198,0.2)",
        borderColor: "rgba(179,181,198,1)",
        borderWidth: 5,
        pointBackgroundColor: "rgba(179,181,198,1)",
        pointBorderColor: "#fff",
        pointHoverBackgroundColor: "#fff",
        pointHoverBorderColor: "rgba(255,99,132,1)",
        pointRadius: 0,
        lineTension: 0.1,
        data: performance.average,
      },
    ],
  };

  const options = {
    legend: {
      display: false,
    },
    scale: {
      label: {
        display: false,
      },
      angleLines: {
        display: true,
      },
      gridLines: {
        circular: true,
        display: true,
      },
      ticks: {
        display: false,
        suggestedMin: 0,
        suggestedMax: 100,
      },
    },
  };

  return (
    <div className="container h-full w-full">
      <Radar data={data} options={options} />
    </div>
  );
}
