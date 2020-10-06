import React from "react";
import { Radar, defaults } from "react-chartjs-2";
import "chartjs-plugin-style";

export default function RadarChart(props) {
  const performance = props.performance;
  const data = {
    /*["😁", "😡", "😥", "😐", "😮"]*/
    labels: ["", "", "", "", ""],
    datasets: [
      {
        label: "Player 1",
        backgroundColor: "rgba(75, 250, 240, .3)",
        borderColor: "rgba(75, 250, 240, 1)",
        pointRadius: 0,
        borderWidth: 3,
        lineTension: 0,
        data: performance.player1,
      },
      {
        label: "Player 2",
        backgroundColor: "rgba(202, 250, 75, .3)",
        borderColor: "rgba(202, 250, 75, 1)",
        pointRadius: 0,
        borderWidth: 3,
        lineTension: 0,
        data: performance.player2,
      },
      {
        label: "Average",
        backgroundColor: "rgba(179,181,198,0.2)",
        borderColor: "rgba(179,181,198,.5)",
        pointRadius: 0,
        borderWidth: 3,
        lineTension: 0,
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
        color: "rgba(70, 2, 112, .1)",
      },
      gridLines: {
        circular: true,
        display: true,
        color: "rgba(70, 2, 112, .1)",
      },
      ticks: {
        display: false,
        suggestedMin: 0,
        suggestedMax: 100,
        stepSize: 20,
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
/*
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
      <div className="w-64 h-64 col-start-1 col-span-5 row-start-1 row-span-5 place-self-center">
        <Radar data={data} options={options} />
      </div>
    </div>
    <div
      style={{ width: "100vh / 3", height: "100vh / 3" }}
      className="grid grid-cols-5 grid-rows-5"
    >
      <div className="text-5xl col-start-3 col-span-1 row-start-1 row-span-1">
        😁
      </div>
      <div className="text-5xl col-start-1 col-span-1 row-start-2 row-span-1">
        😮
      </div>
      <div className="text-5xl col-start-5 col-span-1 row-start-2 row-span-1">
        😡
      </div>
      <div className="text-5xl col-start-2 col-span-1 row-start-5 row-span-1">
        😥
      </div>
      <div className="text-5xl col-start-4 col-span-1 row-start-5 row-span-1">
        😐
      </div>
      <div className="h-64 w-64 p-4 m-auto">
        <Radar data={data} options={options} />
      </div>
    </div>
*/
