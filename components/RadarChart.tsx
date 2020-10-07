import React from "react";
import { Radar, defaults } from "react-chartjs-2";
import "chartjs-plugin-style";
import useMeasure from "react-use-measure";

export default function RadarChart(props) {
  const performance = props.performance;
  const [ref, bounds] = useMeasure();
  let width: number;
  let height: number;
  height = bounds.height;
  width = bounds.height;

  const data = {
    /*["😁", "😡", "😥", "😐", "😮"]*/
    labels: ["", "", "", "", ""],
    datasets: [
      {
        label: "Player 1",

        borderColor: "rgba(75, 250, 240, 1)",
        backgroundColor: "rgba(75, 250, 240, .2)",

        outerGlowWidth: 10,
        outerGlowColor: "rgba(75, 250, 240, 1)",
        innerGlowWidth: 5,
        innerGlowColor: "rgba(75, 250, 240, 1)",

        pointRadius: 6,
        pointBorderWidth: 1,
        pointBorderColor: "rgba(75, 250, 240, 1)",
        pointBackgroundColor: "rgba(255,255,255, 1)",
        pointOuterGlowColor: "rgba(75, 250, 240, 1)",
        pointOuterGlowWidth: 5,
        pointInnerGlowColor: "rgba(255, 255, 255, 1)",
        pointInnerGlowWidth: 50,

        borderWidth: 3,
        lineTension: 0,
        data: performance.player1,
      },
      {
        label: "Player 2",

        borderColor: "rgba(202, 250, 75, 1)",
        backgroundColor: "rgba(202, 250, 75, .2)",

        outerGlowWidth: 10,
        outerGlowColor: "rgba(202, 250, 75, 1)",
        innerGlowWidth: 5,
        innerGlowColor: "rgba(202, 250, 75, 1)",

        pointRadius: 6,
        pointBorderWidth: 1,
        pointBorderColor: "rgba(202, 250, 75, 1)",
        pointBackgroundColor: "rgba(255,255,255, 1)",
        pointOuterGlowColor: "rgba(202, 250, 75, 1)",
        pointOuterGlowWidth: 5,
        pointInnerGlowColor: "rgba(255, 255, 255, 1)",
        pointInnerGlowWidth: 50,

        borderWidth: 3,
        lineTension: 0,
        data: performance.player2,
      },
      {
        label: "Average",

        borderColor: "rgba(255, 0, 255, 1)",
        backgroundColor: "rgba(255, 0, 255, .2)",

        outerGlowWidth: 10,
        outerGlowColor: "rgba(255, 0, 255, 1)",
        innerGlowWidth: 5,
        innerGlowColor: "rgba(255, 0, 255, 1)",

        pointRadius: 6,
        pointBorderWidth: 1,
        pointBorderColor: "rgba(255, 0, 255, 1)",
        pointBackgroundColor: "rgba(255,255,255, 1)",
        pointOuterGlowColor: "rgba(255, 0, 255, 1)",
        pointOuterGlowWidth: 5,
        pointInnerGlowColor: "rgba(255, 255, 255, 1)",
        pointInnerGlowWidth: 50,

        borderWidth: 3,
        lineTension: 0,
        data: performance.average,
      },
    ],
  };

  const options = {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      display: false,
    },
    scale: {
      label: {
        display: false,
      },
      angleLines: {
        display: true,
        color: "rgba(255, 255, 255, .2)",
      },
      gridLines: {
        circular: true,
        display: false,
        color: "rgba(70, 2, 112, .3)",
      },
      ticks: {
        display: false,
        suggestedMin: 0,
        suggestedMax: 100,
        stepSize: 25,
      },
    },
    layout: {
      padding: 50,
    },
  };
  return (
    <div
      ref={ref}
      style={{ width, height: "100%" }}
      className="flex self-center relative"
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: "50%",
        }}
        className="text-5xl -ml-6"
      >
        😁
      </div>
      <div
        style={{
          position: "absolute",
          top: "32%",
          right: 0,
        }}
        className="text-5xl"
      >
        😮
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "2%",
          right: "17.5%",
        }}
        className="text-5xl"
      >
        😡
      </div>
      <div
        style={{
          position: "absolute",
          bottom: "2%",
          left: "17.5%",
        }}
        className="text-5xl"
      >
        😥
      </div>
      <div
        style={{
          position: "absolute",
          top: "32%",
          left: 0,
        }}
        className="text-5xl"
      >
        😐
      </div>
      <div
        style={{
          marginLeft: "58px",
          marginRight: "58px",
          marginTop: "70px",
          marginBottom: "56px",
        }}
        className="absolute inset-0 bg-black bg-opacity-25 rounded-full"
      />
      <div
        style={{
          paddingLeft: "50px",
          paddingRight: "50px",
          paddingTop: "62px",
          paddingBottom: "48px",
        }}
        className="absolute inset-0 flex justify-center items-center "
      >
        <Circle size={100} />
      </div>
      <div
        style={{
          paddingLeft: "50px",
          paddingRight: "50px",
          paddingTop: "62px",
          paddingBottom: "48px",
        }}
        className="absolute inset-0 flex justify-center items-center"
      >
        <Circle size={75} />
      </div>
      <div
        style={{
          paddingLeft: "50px",
          paddingRight: "50px",
          paddingTop: "62px",
          paddingBottom: "48px",
        }}
        className="absolute inset-0 flex justify-center items-center"
      >
        <Circle size={50} />
      </div>
      <div
        style={{
          paddingLeft: "50px",
          paddingRight: "50px",
          paddingTop: "62px",
          paddingBottom: "48px",
        }}
        className="absolute inset-0 flex justify-center items-center"
      >
        <Circle size={25} />
      </div>
      <Radar data={data} options={options} />
    </div>
  );
}
const Circle = (props) => {
  return (
    <svg
      style={{
        width: props.size + "%",
        height: props.size + "%",
      }}
      className="flex opacity-75"
      viewBox="0 0 576 576"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g filter="url(#filter0_d)">
        <circle
          cx="288.001"
          cy="287.908"
          r="281.438"
          stroke="rgba(255,255,255, .3)"
          stroke-width="2"
        />
      </g>
      <defs>
        <filter
          id="filter0_d"
          x="0.5625"
          y="0.469845"
          width="574.876"
          height="574.876"
          filterUnits="userSpaceOnUse"
          color-interpolation-filters="sRGB"
        >
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix
            in="SourceAlpha"
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          />
          <feOffset />
          <feGaussianBlur stdDeviation="2.5" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0.366667 0 0 0 0 1 0 0 0 0 0.962 0 0 0 1 0"
          />
          <feBlend
            mode="normal"
            in2="BackgroundImageFix"
            result="effect1_dropShadow"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_dropShadow"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  );
};
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
