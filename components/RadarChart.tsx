import React from "react";
import { Radar, defaults } from "react-chartjs-2";

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
        borderWidth: 3,
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
        borderWidth: 3,
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
        borderWidth: 3,
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
    maintainAspectRatio: false,
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
    <div className="flex w-56 h-56 self-center relative">
      <div className="absolute top-0 inset-x-0 flex justify-center">
        <div className="text-3xl flex">😁</div>
      </div>
      <div className="absolute inset-0 flex content-center">
        <div className="flex self-center justify-center space-x-40 w-full h-24">
          <div className="text-3xl">😮</div>
          <div className="text-3xl">😡</div>
        </div>
      </div>
      <div className="absolute bottom-0 inset-x-0 flex justify-center space-x-20">
        <div className="text-3xl flex">😥</div>
        <div className="text-3xl flex">😐</div>
      </div>
      <div className="h-48 w-48 p-4 m-auto">
        <Radar data={data} options={options} />
      </div>
    </div>
  );
}
