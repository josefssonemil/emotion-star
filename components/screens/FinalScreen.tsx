import { useCollection } from "@nandorojo/swr-firestore";
import { motion } from "framer-motion";
import React, { MutableRefObject, useMemo } from "react";
import useActiveExpression from "../../hooks/useActiveExpression";
import { FinalStats } from "../../hooks/useFinalStats";
import useIdle from "../../hooks/useIdle";
import { HighscoreEntry } from "../../types/Database";
import { Expression } from "../../types/Expressions";
import { Level } from "../../types/Level";
import FinalScreenEmoji from "../FinalScreenEmoji";
import PlayerFace from "../PlayerFace";
import RadarChart from "../RadarChart";
import ScoreScreen from "./ScoreScreen";

// TODO :
// * Add indicator for selected emotion
// * Add time spent

interface Props {
  canvasLeftRef: MutableRefObject<HTMLCanvasElement>;
  canvasRightRef: MutableRefObject<HTMLCanvasElement>;
  players: [Expression, Expression];
  faceBoxes: any[];
  onRestart: () => void;
  onIdle: () => void;
  level: Level;
  teamName: string;
  stats: FinalStats;
}

export default function FinalScreen(props: Props) {
  useIdle(props.onIdle, props.players);

  const textGlow = {
    textShadow: "0 0 35px rgb(255, 0, 255)",
  };
  const textGlowBlue = {
    textShadow: "0 0 20px #4bfaf0",
  };
  const textGlowGreen = {
    textShadow: "0 0 20px #86e409",
  };

  const maxCount = 1;

  const activeExpression = [
    useActiveExpression(props.players[0], maxCount),
    useActiveExpression(props.players[1], maxCount),
  ];

  const highscores = useCollection<HighscoreEntry>("highscores", {
    orderBy: ["score", "desc"],
    listen: true,
  });

  // Calculate the average of all accuracy values in the highscore database
  const average = useMemo(() => {
    const data = {
      happy: 0,
      surprised: 0,
      angry: 0,
      sad: 0,
      neutral: 0,
    };

    if (highscores.data) {
      highscores.data.forEach((entry) => {
        Object.keys(entry.expressions).forEach((key) => {
          if (entry.expressions[key]) {
            data[key] += entry.expressions[key];
          }
        });
      });

      Object.keys(data).forEach((key) => {
        data[key] = data[key] / highscores.data.length;
      });
    }

    return data;
  }, [highscores.data]);

  const data = {
    performance: {
      player1: [
        props.stats.accuracy[0] !== undefined &&
          props.stats.accuracy[0].happy * 100,
        props.stats.accuracy[0] !== undefined &&
          props.stats.accuracy[0].surprised * 100,
        props.stats.accuracy[0] !== undefined &&
          props.stats.accuracy[0].angry * 100,
        props.stats.accuracy[0] !== undefined &&
          props.stats.accuracy[0].sad * 100,
        props.stats.accuracy[0] !== undefined &&
          props.stats.accuracy[0].neutral * 100,
      ],
      player2: [
        props.stats.accuracy[1] !== undefined &&
          props.stats.accuracy[1].happy * 100,
        props.stats.accuracy[1] !== undefined &&
          props.stats.accuracy[1].surprised * 100,
        props.stats.accuracy[1] !== undefined &&
          props.stats.accuracy[1].angry * 100,
        props.stats.accuracy[1] !== undefined &&
          props.stats.accuracy[1].sad * 100,
        props.stats.accuracy[1] !== undefined &&
          props.stats.accuracy[1].neutral * 100,
      ],
      average: [
        average.happy * 100,
        average.surprised * 100,
        average.angry * 100,
        average.sad * 100,
        average.neutral * 100,
      ],
    },
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: 1,
      }}
      transition={{
        delay: 1,
      }}
      className="grid w-screen h-screen grid-cols-12 grid-rows-6 gap-6 p-10"
    >
      <ScoreScreen stats={props.stats} />
      <h1
        className="self-center col-span-5 col-start-1 row-start-1 text-6xl text-white"
        style={textGlow}
      >
        Emotion Stats
      </h1>

      <h1
        style={{ textShadow: "0px 0px 34px #FCD932" }}
        className="self-center col-span-3 col-start-6 row-start-1 text-6xl text-left text-white"
      >
        <span>
          <span className="text-3xl">Team: </span> {props.teamName}
        </span>
      </h1>

      <div
        style={{ textShadow: "0px 0px 34px #FCD932" }}
        className="self-center col-span-3 col-end-9 row-start-1 text-6xl text-right text-white"
      >
        <h1>
          <span>
            {props.stats.score}
            <span className="text-3xl"> P.</span>
          </span>
        </h1>
      </div>

      <div className="relative col-span-5 col-start-1 row-span-4 row-start-2 py-4 dark">
        <div className="absolute top-0 left-0 flex flex-col pt-4 pl-8 text-xl font-quicksand">
          <span style={textGlowBlue} className="text-player1">
            Player 1
          </span>
          <span style={textGlowGreen} className="text-player2">
            Player 2
          </span>
          <span
            style={{
              color: "rgba(255, 0, 255, .9)",
              textShadow: "0 0 20px rgb(255, 0, 255)",
            }}
          >
            Average
          </span>
        </div>
        <RadarChart performance={data.performance} />
      </div>

      <div className="flex flex-row col-span-7 col-end-13 row-span-2 row-start-2 overflow-hidden frosted-blue">
        <div>
          <PlayerFace
            canvasRef={props.canvasLeftRef}
            expression={props.players[0]}
            faceBox={props.faceBoxes[0]}
            constrainTo="height"
            player={1}
            border="none"
          />
        </div>

        <div className="relative flex flex-row items-center w-full p-6 justify-evenly">
          <div
            style={{
              left: "-1.5rem",
            }}
            className="absolute flex flex-col items-center justify-around w-12 h-full"
          >
            <FinalScreenEmoji
              emoji="happy"
              progress={
                props.players[0] === "happy"
                  ? activeExpression[0].timer.seconds
                  : 0
              }
              completed={activeExpression[0].selectedExpression == "happy"}
              maxCount={maxCount}
            />

            <FinalScreenEmoji
              emoji="angry"
              progress={
                props.players[0] === "angry"
                  ? activeExpression[0].timer.seconds
                  : 0
              }
              completed={activeExpression[0].selectedExpression == "angry"}
              maxCount={maxCount}
            />

            <FinalScreenEmoji
              emoji="surprised"
              progress={
                props.players[0] === "surprised"
                  ? activeExpression[0].timer.seconds
                  : 0
              }
              completed={activeExpression[0].selectedExpression == "surprised"}
              maxCount={maxCount}
            />

            <FinalScreenEmoji
              emoji="sad"
              progress={
                props.players[0] === "sad"
                  ? activeExpression[0].timer.seconds
                  : 0
              }
              completed={activeExpression[0].selectedExpression == "sad"}
              maxCount={maxCount}
            />

            <FinalScreenEmoji
              emoji="neutral"
              progress={
                props.players[0] === "neutral"
                  ? activeExpression[0].timer.seconds
                  : 0
              }
              completed={activeExpression[0].selectedExpression == "neutral"}
              maxCount={maxCount}
            />
          </div>
          <div className="text-center">
            <svg
              className="pb-2 mx-auto"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0)">
                <path
                  d="M31.2326 10.91V10.2014C29.0611 9.08704 26.6677 8.43848 24.1876 8.43848C15.6419 8.43848 8.68896 15.3774 8.68896 23.9069C8.68896 32.4359 15.6419 39.3753 24.1876 39.3753C32.7337 39.3753 39.6863 32.4359 39.6863 23.9069C39.6863 21.4317 39.0364 19.0429 37.9199 16.8756H37.2095L35.5976 18.4844C36.3887 20.1342 36.8683 21.959 36.8683 23.9069C36.8683 30.8858 31.1802 36.5628 24.1876 36.5628C17.1951 36.5628 11.507 30.8858 11.507 23.9069C11.507 16.928 17.1951 11.2506 24.1876 11.2506C26.1397 11.2506 27.9677 11.7296 29.6207 12.5192L31.2326 10.91Z"
                  fill="white"
                />
                <path
                  d="M24.1874 16.8756C24.5194 16.8756 24.8372 16.9291 25.1571 16.9734L27.4688 14.6663C26.437 14.2997 25.3435 14.0635 24.1874 14.0635C18.7495 14.0635 14.3247 18.4796 14.3247 23.9069C14.3247 29.3341 18.7495 33.7503 24.1874 33.7503C29.6252 33.7503 34.05 29.3341 34.05 23.9069C34.05 22.7529 33.813 21.6616 33.446 20.6318L31.1344 22.939C31.1788 23.2583 31.2324 23.5754 31.2324 23.9069C31.2324 27.7836 28.0716 30.9378 24.1874 30.9378C20.3031 30.9378 17.1427 27.7836 17.1427 23.9069C17.1427 20.0302 20.3031 16.8756 24.1874 16.8756Z"
                  fill="white"
                />
                <path
                  d="M24.187 47.9999C37.395 47.9999 48.1397 37.0886 48.1397 23.9069C48.1397 20.3869 47.3486 16.9767 45.8853 13.8412L44.0833 15.6397C43.2853 16.4362 42.223 16.8756 41.0947 16.8756H41.0466C41.9757 19.0894 42.5037 21.4642 42.5037 23.9069C42.5037 33.9865 34.2867 42.1874 24.187 42.1874C14.0877 42.1874 5.87075 33.9865 5.87075 23.9069C5.87075 13.8269 14.0877 5.62598 24.187 5.62598C26.6344 5.62598 29.014 6.15296 31.232 7.0802V7.03223C31.232 5.90613 31.6724 4.84595 32.4704 4.04944L34.2724 2.25098C31.1308 0.790528 27.7139 0.000976562 24.187 0.000976562C10.9795 0.000976562 0.046875 10.7247 0.046875 23.9069C0.046875 37.0886 10.9795 47.9999 24.187 47.9999Z"
                  fill="white"
                />
                <path
                  d="M42.0913 13.6512L47.7274 8.02656C48.1302 7.6241 48.2513 7.01985 48.0326 6.49397C47.8154 5.96809 47.3006 5.62605 46.7311 5.62605H42.5041V1.4073C42.5041 0.838937 42.1614 0.325143 41.6345 0.108346C41.1076 -0.111381 40.5022 0.00946905 40.0989 0.413034L34.4629 6.03804C34.1987 6.30171 34.0501 6.65876 34.0501 7.0323V12.0747L25.9982 20.1108C25.4471 19.8479 24.838 19.6882 24.1875 19.6882C21.8567 19.6882 19.9604 21.5804 19.9604 23.9069C19.9604 26.2331 21.8567 28.1253 24.1875 28.1253C26.5182 28.1253 28.4145 26.2331 28.4145 23.9069C28.4145 23.2573 28.2545 22.6494 27.9907 22.0993L36.0425 14.0632H41.0951C41.4694 14.0632 41.8272 13.9149 42.0913 13.6512Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="48" height="48" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <h1 className="font-bold text-white font-quicksand">Accuracy</h1>

            <h1 className="pt-6 text-5xl text-white" style={textGlowBlue}>
              {Math.round(
                props.stats.accuracy[0][
                  activeExpression[0].selectedExpression
                ] * 100
              )}
              <span className="text-3xl">%</span>
            </h1>
          </div>

          <div className="text-center">
            <svg
              className="pb-2 mx-auto"
              width="48"
              height="55"
              viewBox="0 0 48 55"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 51.3751C29.4559 51.3751 34.6883 49.2078 38.5462 45.3499C42.4041 41.492 44.5714 36.2596 44.5714 30.8037C44.5714 25.3478 42.4041 20.1154 38.5462 16.2575C34.6883 12.3996 29.4559 10.2323 24 10.2323C18.5441 10.2323 13.3117 12.3996 9.4538 16.2575C5.59591 20.1154 3.42857 25.3478 3.42857 30.8037C3.42857 36.2596 5.59591 41.492 9.4538 45.3499C13.3117 49.2078 18.5441 51.3751 24 51.3751ZM24 54.8037C30.3652 54.8037 36.4697 52.2751 40.9706 47.7743C45.4714 43.2734 48 37.1689 48 30.8037C48 24.4385 45.4714 18.334 40.9706 13.8331C36.4697 9.33227 30.3652 6.80371 24 6.80371C17.6348 6.80371 11.5303 9.33227 7.02944 13.8331C2.52856 18.334 0 24.4385 0 30.8037C0 37.1689 2.52856 43.2734 7.02944 47.7743C11.5303 52.2751 17.6348 54.8037 24 54.8037Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.4282 1.71429C15.4282 1.25963 15.6088 0.823594 15.9303 0.502103C16.2518 0.180612 16.6879 0 17.1425 0L30.8568 0C31.3114 0 31.7475 0.180612 32.069 0.502103C32.3905 0.823594 32.5711 1.25963 32.5711 1.71429C32.5711 2.16894 32.3905 2.60498 32.069 2.92647C31.7475 3.24796 31.3114 3.42857 30.8568 3.42857H17.1425C16.6879 3.42857 16.2518 3.24796 15.9303 2.92647C15.6088 2.60498 15.4282 2.16894 15.4282 1.71429Z"
                fill="white"
              />
              <path
                d="M20.5718 3.42822H27.4289V10.2854H20.5718V3.42822Z"
                fill="white"
              />
              <rect
                x="22.4707"
                y="17.3633"
                width="3.19114"
                height="17.0194"
                rx="1.59557"
                fill="white"
              />
              <rect
                x="35.2354"
                y="30.1279"
                width="4.25486"
                height="12.7646"
                rx="2.12743"
                transform="rotate(90 35.2354 30.1279)"
                fill="white"
              />
            </svg>

            <h1 className="font-bold text-white font-quicksand">Time</h1>

            <h1 className="pt-6 text-5xl text-white" style={textGlowBlue}>
              {
                props.stats.timePerExpression[0][
                  activeExpression[0].selectedExpression
                ]
              }
              <span className="text-3xl">s</span>
            </h1>
          </div>

          <div className="text-center">
            <svg
              className="pb-2 mx-auto"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M48 24C48 24.0091 47.9997 24.0181 47.9996 24.0271C47.9996 24.0291 47.9996 24.031 47.9995 24.033C47.991 30.4313 45.4957 36.4453 40.9705 40.9705C36.4375 45.5035 30.4106 48 24 48C17.5894 48 11.5625 45.5035 7.02938 40.9706C2.49647 36.4375 0 30.4106 0 24C0 17.5894 2.49647 11.5625 7.02938 7.02938C11.5623 2.49647 17.5891 9.53674e-05 23.9995 0H23.9996H23.9997H24C24.3659 9.53674e-05 24.7254 0.142876 24.9943 0.411842L47.5881 23.0056C47.857 23.2746 47.9992 23.6341 47.9993 23.9999H48V24ZM2.8125 24C2.8125 29.6594 5.01638 34.98 9.01819 38.9818C13.02 42.9836 18.3406 45.1875 24 45.1875C29.6594 45.1875 34.98 42.9836 38.9818 38.9818C42.6609 35.3027 44.8188 30.5087 45.1432 25.3617C44.199 25.3058 43.2652 25.1961 42.3454 25.0327C41.808 34.6861 33.7854 42.375 24 42.375C13.868 42.375 5.625 34.132 5.625 24C5.625 14.2146 13.3139 6.192 22.9673 5.65453C22.8039 4.73475 22.6943 3.8009 22.6384 2.85675C17.4914 3.18103 12.6973 5.33897 9.01819 9.01809C5.01638 13.02 2.8125 18.3406 2.8125 24ZM19.3566 22.9872L15.7719 26.4814L20.7258 27.2013C21.1838 27.2678 21.5798 27.5555 21.7846 27.9705L24 32.4593L26.2154 27.9704C26.4203 27.5554 26.8162 27.2677 27.2742 27.2012L32.2281 26.4813L28.6434 22.9871C28.312 22.6641 28.1608 22.1986 28.239 21.7424L28.9388 17.6619C28.7783 17.488 28.6202 17.3124 28.4654 17.1346L24.6544 19.1381C24.4495 19.2458 24.2247 19.2997 24 19.2997C23.7753 19.2997 23.5505 19.2458 23.3456 19.1381L18.9148 16.8086L19.761 21.7424C19.8393 22.1987 19.688 22.6642 19.3566 22.9872ZM31.3943 19.9831L31.136 21.4894L36.2316 26.4562C36.6148 26.8298 36.7528 27.3887 36.5873 27.8978C36.422 28.4069 35.9819 28.778 35.4522 28.8548L28.4103 29.8781L25.261 36.2592C25.0241 36.7392 24.5352 37.0431 24 37.0431C23.4648 37.0431 22.9759 36.7392 22.739 36.2592L19.5897 29.8781L12.5478 28.8548C12.0181 28.778 11.578 28.4069 11.4127 27.8978C11.2472 27.3887 11.3852 26.8298 11.7684 26.4562L16.864 21.4894L15.6611 14.4758C15.5707 13.9482 15.7875 13.4151 16.2205 13.1004C16.4656 12.9224 16.7557 12.8318 17.0472 12.8318C17.271 12.8318 17.4957 12.8852 17.7015 12.9934L24 16.3047L26.7219 14.8737C25.3706 12.8888 24.3331 10.7246 23.6367 8.44218C15.2227 8.63588 8.4375 15.5402 8.4375 24C8.4375 32.5812 15.4188 39.5625 24 39.5625C32.4597 39.5625 39.3641 32.7773 39.5579 24.3633C36.5927 23.4586 33.8259 21.98 31.3943 19.9831ZM25.7294 5.12437C26.4765 9.369 28.5009 13.2771 31.6119 16.3881C34.7229 19.4992 38.631 21.5235 42.8756 22.2707L25.7294 5.12437Z"
                fill="white"
              />
            </svg>
            <h1 className="pb-6 font-bold text-white font-quicksand">
              Sticker
            </h1>

            <svg
              width="64"
              height="66"
              viewBox="0 0 64 66"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M51.5 34C47.1922 34 43.6875 37.5888 43.6875 42V46.8H42.125C41.2962 46.8 40.5013 47.1371 39.9153 47.7373C39.3292 48.3374 39 49.1513 39 50V62.8C39 63.6487 39.3292 64.4626 39.9153 65.0627C40.5013 65.6629 41.2962 66 42.125 66H60.875C61.7038 66 62.4987 65.6629 63.0847 65.0627C63.6708 64.4626 64 63.6487 64 62.8V50C64 49.1513 63.6708 48.3374 63.0847 47.7373C62.4987 47.1371 61.7038 46.8 60.875 46.8H59.3125V42C59.3125 37.5888 55.8078 34 51.5 34ZM46.8125 42C46.8125 39.3536 48.9156 37.2 51.5 37.2C54.0844 37.2 56.1875 39.3536 56.1875 42V46.8H46.8125V42ZM53.0625 59.1568V62.8H49.9375V59.1568C49.3912 58.8365 48.9526 58.3541 48.6794 57.7734C48.4063 57.1926 48.3114 56.5407 48.4073 55.9036C48.5033 55.2666 48.7855 54.6742 49.2168 54.2047C49.6481 53.7352 50.2083 53.4105 50.8234 53.2736C51.2803 53.1702 51.7541 53.173 52.2098 53.2821C52.6654 53.3911 53.0914 53.6034 53.4562 53.9035C53.8211 54.2035 54.1155 54.5836 54.3178 55.0157C54.5201 55.4478 54.625 55.9208 54.625 56.4C54.6241 56.9596 54.4792 57.5091 54.2049 57.993C53.9306 58.477 53.5365 58.8784 53.0625 59.1568Z"
                fill="white"
              />
              <path
                d="M60 30C60 30.0114 59.9996 30.0226 59.9995 30.0339C59.9995 30.0363 59.9995 30.0388 59.9994 30.0413C59.9888 38.0391 56.8696 45.5566 51.2132 51.2132C45.5469 56.8794 38.0133 60 30 60C21.9867 60 14.4531 56.8794 8.78672 51.2133C3.12059 45.5469 0 38.0133 0 30C0 21.9867 3.12059 14.4531 8.78672 8.78672C14.4529 3.12059 21.9864 0.000118256 29.9994 0H29.9995H29.9996H30C30.4574 0.000118256 30.9068 0.178593 31.2429 0.514805L59.4851 28.757C59.8213 29.0932 59.9989 29.5426 59.9991 29.9999H60V30ZM3.51562 30C3.51562 37.0743 6.27047 43.725 11.2727 48.7273C16.275 53.7295 22.9257 56.4844 30 56.4844C37.0743 56.4844 43.725 53.7295 48.7273 48.7273C53.3262 44.1284 56.0235 38.1359 56.4289 31.7021C55.2488 31.6323 54.0814 31.4951 52.9317 31.2908C52.26 43.3576 42.2318 52.9688 30 52.9688C17.335 52.9688 7.03125 42.665 7.03125 30C7.03125 17.7682 16.6424 7.74 28.7092 7.06816C28.5049 5.91844 28.3678 4.75113 28.298 3.57093C21.8643 3.97629 15.8716 6.67371 11.2727 11.2726C6.27047 16.275 3.51562 22.9257 3.51562 30ZM24.1957 28.734L19.7149 33.1017L25.9072 34.0016C26.4797 34.0848 26.9747 34.4443 27.2307 34.9631L30 40.5742L32.7693 34.963C33.0253 34.4442 33.5203 34.0847 34.0928 34.0015L40.2851 33.1016L35.8043 28.7339C35.39 28.3301 35.201 27.7482 35.2988 27.178L36.1736 22.0774C35.9729 21.86 35.7752 21.6405 35.5818 21.4182L30.818 23.9227C30.5619 24.0572 30.2809 24.1246 30 24.1246C29.7191 24.1246 29.4381 24.0573 29.182 23.9227L23.6435 21.0108L24.7013 27.178C24.7991 27.7484 24.61 28.3302 24.1957 28.734ZM39.2429 24.9789L38.92 26.8617L45.2895 33.0703C45.7685 33.5373 45.941 34.2359 45.7342 34.8723C45.5275 35.5086 44.9774 35.9725 44.3153 36.0686L35.5129 37.3477L31.5763 45.324C31.2802 45.924 30.669 46.3038 30 46.3038C29.331 46.3038 28.7198 45.924 28.4237 45.324L24.4871 37.3477L15.6847 36.0686C15.0226 35.9725 14.4725 35.5086 14.2658 34.8723C14.059 34.2359 14.2315 33.5373 14.7105 33.0703L21.08 26.8617L19.5764 18.0948C19.4633 17.4353 19.7344 16.7688 20.2757 16.3755C20.582 16.153 20.9446 16.0398 21.309 16.0398C21.5888 16.0398 21.8696 16.1065 22.1269 16.2417L30 20.3809L33.4024 18.5922C31.7133 16.1109 30.4164 13.4058 29.5459 10.5527C19.0283 10.7948 10.5469 19.4252 10.5469 30C10.5469 40.7265 19.2735 49.4531 30 49.4531C40.5746 49.4531 49.2052 40.9717 49.4474 30.4541C45.7409 29.3232 42.2824 27.475 39.2429 24.9789ZM32.1618 6.40547C33.0956 11.7113 35.6262 16.5963 39.5149 20.4851C43.4037 24.3739 48.2887 26.9044 53.5945 27.8384L32.1618 6.40547Z"
                fill="white"
                fill-opacity="0.5"
              />
            </svg>
          </div>
        </div>
      </div>

      <div className="flex flex-row col-span-7 col-end-13 row-span-2 row-end-6 overflow-hidden frosted-green">
        <div>
          <PlayerFace
            canvasRef={props.canvasRightRef}
            expression={props.players[1]}
            faceBox={props.faceBoxes[1]}
            constrainTo="height"
            player={2}
            border="none"
          />
        </div>

        <div className="relative flex flex-row items-center w-full p-6 justify-evenly">
          <div
            style={{
              left: "-1.5rem",
            }}
            className="absolute flex flex-col items-center justify-around w-12 h-full"
          >
            <FinalScreenEmoji
              emoji="happy"
              progress={
                props.players[1] === "happy"
                  ? activeExpression[1].timer.seconds
                  : 0
              }
              completed={activeExpression[1].selectedExpression == "happy"}
              maxCount={maxCount}
            />

            <FinalScreenEmoji
              emoji="angry"
              progress={
                props.players[1] === "angry"
                  ? activeExpression[1].timer.seconds
                  : 0
              }
              completed={activeExpression[1].selectedExpression == "angry"}
              maxCount={maxCount}
            />

            <FinalScreenEmoji
              emoji="surprised"
              progress={
                props.players[1] === "surprised"
                  ? activeExpression[1].timer.seconds
                  : 0
              }
              completed={activeExpression[1].selectedExpression == "surprised"}
              maxCount={maxCount}
            />

            <FinalScreenEmoji
              emoji="sad"
              progress={
                props.players[1] === "sad"
                  ? activeExpression[1].timer.seconds
                  : 0
              }
              completed={activeExpression[1].selectedExpression == "sad"}
              maxCount={maxCount}
            />

            <FinalScreenEmoji
              emoji="neutral"
              progress={
                props.players[1] === "neutral"
                  ? activeExpression[1].timer.seconds
                  : 0
              }
              completed={activeExpression[1].selectedExpression == "neutral"}
              maxCount={maxCount}
            />
          </div>
          <div className="text-center">
            <svg
              className="pb-2 mx-auto"
              width="48"
              height="48"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0)">
                <path
                  d="M31.2326 10.91V10.2014C29.0611 9.08704 26.6677 8.43848 24.1876 8.43848C15.6419 8.43848 8.68896 15.3774 8.68896 23.9069C8.68896 32.4359 15.6419 39.3753 24.1876 39.3753C32.7337 39.3753 39.6863 32.4359 39.6863 23.9069C39.6863 21.4317 39.0364 19.0429 37.9199 16.8756H37.2095L35.5976 18.4844C36.3887 20.1342 36.8683 21.959 36.8683 23.9069C36.8683 30.8858 31.1802 36.5628 24.1876 36.5628C17.1951 36.5628 11.507 30.8858 11.507 23.9069C11.507 16.928 17.1951 11.2506 24.1876 11.2506C26.1397 11.2506 27.9677 11.7296 29.6207 12.5192L31.2326 10.91Z"
                  fill="white"
                />
                <path
                  d="M24.1874 16.8756C24.5194 16.8756 24.8372 16.9291 25.1571 16.9734L27.4688 14.6663C26.437 14.2997 25.3435 14.0635 24.1874 14.0635C18.7495 14.0635 14.3247 18.4796 14.3247 23.9069C14.3247 29.3341 18.7495 33.7503 24.1874 33.7503C29.6252 33.7503 34.05 29.3341 34.05 23.9069C34.05 22.7529 33.813 21.6616 33.446 20.6318L31.1344 22.939C31.1788 23.2583 31.2324 23.5754 31.2324 23.9069C31.2324 27.7836 28.0716 30.9378 24.1874 30.9378C20.3031 30.9378 17.1427 27.7836 17.1427 23.9069C17.1427 20.0302 20.3031 16.8756 24.1874 16.8756Z"
                  fill="white"
                />
                <path
                  d="M24.187 47.9999C37.395 47.9999 48.1397 37.0886 48.1397 23.9069C48.1397 20.3869 47.3486 16.9767 45.8853 13.8412L44.0833 15.6397C43.2853 16.4362 42.223 16.8756 41.0947 16.8756H41.0466C41.9757 19.0894 42.5037 21.4642 42.5037 23.9069C42.5037 33.9865 34.2867 42.1874 24.187 42.1874C14.0877 42.1874 5.87075 33.9865 5.87075 23.9069C5.87075 13.8269 14.0877 5.62598 24.187 5.62598C26.6344 5.62598 29.014 6.15296 31.232 7.0802V7.03223C31.232 5.90613 31.6724 4.84595 32.4704 4.04944L34.2724 2.25098C31.1308 0.790528 27.7139 0.000976562 24.187 0.000976562C10.9795 0.000976562 0.046875 10.7247 0.046875 23.9069C0.046875 37.0886 10.9795 47.9999 24.187 47.9999Z"
                  fill="white"
                />
                <path
                  d="M42.0913 13.6512L47.7274 8.02656C48.1302 7.6241 48.2513 7.01985 48.0326 6.49397C47.8154 5.96809 47.3006 5.62605 46.7311 5.62605H42.5041V1.4073C42.5041 0.838937 42.1614 0.325143 41.6345 0.108346C41.1076 -0.111381 40.5022 0.00946905 40.0989 0.413034L34.4629 6.03804C34.1987 6.30171 34.0501 6.65876 34.0501 7.0323V12.0747L25.9982 20.1108C25.4471 19.8479 24.838 19.6882 24.1875 19.6882C21.8567 19.6882 19.9604 21.5804 19.9604 23.9069C19.9604 26.2331 21.8567 28.1253 24.1875 28.1253C26.5182 28.1253 28.4145 26.2331 28.4145 23.9069C28.4145 23.2573 28.2545 22.6494 27.9907 22.0993L36.0425 14.0632H41.0951C41.4694 14.0632 41.8272 13.9149 42.0913 13.6512Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0">
                  <rect width="48" height="48" fill="white" />
                </clipPath>
              </defs>
            </svg>

            <h1 className="font-bold text-white font-quicksand">Accuracy</h1>

            <h1 className="pt-6 text-5xl text-white" style={textGlowGreen}>
              {Math.round(
                props.stats.accuracy[1][
                  activeExpression[1].selectedExpression
                ] * 100
              )}
              <span className="text-3xl">%</span>
            </h1>
          </div>

          <div className="text-center ">
            <svg
              className="pb-2 mx-auto"
              width="48"
              height="55"
              viewBox="0 0 48 55"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M24 51.3751C29.4559 51.3751 34.6883 49.2078 38.5462 45.3499C42.4041 41.492 44.5714 36.2596 44.5714 30.8037C44.5714 25.3478 42.4041 20.1154 38.5462 16.2575C34.6883 12.3996 29.4559 10.2323 24 10.2323C18.5441 10.2323 13.3117 12.3996 9.4538 16.2575C5.59591 20.1154 3.42857 25.3478 3.42857 30.8037C3.42857 36.2596 5.59591 41.492 9.4538 45.3499C13.3117 49.2078 18.5441 51.3751 24 51.3751ZM24 54.8037C30.3652 54.8037 36.4697 52.2751 40.9706 47.7743C45.4714 43.2734 48 37.1689 48 30.8037C48 24.4385 45.4714 18.334 40.9706 13.8331C36.4697 9.33227 30.3652 6.80371 24 6.80371C17.6348 6.80371 11.5303 9.33227 7.02944 13.8331C2.52856 18.334 0 24.4385 0 30.8037C0 37.1689 2.52856 43.2734 7.02944 47.7743C11.5303 52.2751 17.6348 54.8037 24 54.8037Z"
                fill="white"
              />
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15.4282 1.71429C15.4282 1.25963 15.6088 0.823594 15.9303 0.502103C16.2518 0.180612 16.6879 0 17.1425 0L30.8568 0C31.3114 0 31.7475 0.180612 32.069 0.502103C32.3905 0.823594 32.5711 1.25963 32.5711 1.71429C32.5711 2.16894 32.3905 2.60498 32.069 2.92647C31.7475 3.24796 31.3114 3.42857 30.8568 3.42857H17.1425C16.6879 3.42857 16.2518 3.24796 15.9303 2.92647C15.6088 2.60498 15.4282 2.16894 15.4282 1.71429Z"
                fill="white"
              />
              <path
                d="M20.5718 3.42822H27.4289V10.2854H20.5718V3.42822Z"
                fill="white"
              />
              <rect
                x="22.4707"
                y="17.3633"
                width="3.19114"
                height="17.0194"
                rx="1.59557"
                fill="white"
              />
              <rect
                x="35.2354"
                y="30.1279"
                width="4.25486"
                height="12.7646"
                rx="2.12743"
                transform="rotate(90 35.2354 30.1279)"
                fill="white"
              />
            </svg>
            <h1 className="font-bold text-white font-quicksand">Time</h1>

            <h1 className="pt-6 text-5xl text-white" style={textGlowGreen}>
              {
                props.stats.timePerExpression[1][
                  activeExpression[1].selectedExpression
                ]
              }
              <span className="text-3xl">s</span>
            </h1>
          </div>

          <div className="text-center">
            <svg
              className="pb-2 mx-auto"
              width="48"
              height="55"
              viewBox="0 0 48 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M48 24C48 24.0091 47.9997 24.0181 47.9996 24.0271C47.9996 24.0291 47.9996 24.031 47.9995 24.033C47.991 30.4313 45.4957 36.4453 40.9705 40.9705C36.4375 45.5035 30.4106 48 24 48C17.5894 48 11.5625 45.5035 7.02938 40.9706C2.49647 36.4375 0 30.4106 0 24C0 17.5894 2.49647 11.5625 7.02938 7.02938C11.5623 2.49647 17.5891 9.53674e-05 23.9995 0H23.9996H23.9997H24C24.3659 9.53674e-05 24.7254 0.142876 24.9943 0.411842L47.5881 23.0056C47.857 23.2746 47.9992 23.6341 47.9993 23.9999H48V24ZM2.8125 24C2.8125 29.6594 5.01638 34.98 9.01819 38.9818C13.02 42.9836 18.3406 45.1875 24 45.1875C29.6594 45.1875 34.98 42.9836 38.9818 38.9818C42.6609 35.3027 44.8188 30.5087 45.1432 25.3617C44.199 25.3058 43.2652 25.1961 42.3454 25.0327C41.808 34.6861 33.7854 42.375 24 42.375C13.868 42.375 5.625 34.132 5.625 24C5.625 14.2146 13.3139 6.192 22.9673 5.65453C22.8039 4.73475 22.6943 3.8009 22.6384 2.85675C17.4914 3.18103 12.6973 5.33897 9.01819 9.01809C5.01638 13.02 2.8125 18.3406 2.8125 24ZM19.3566 22.9872L15.7719 26.4814L20.7258 27.2013C21.1838 27.2678 21.5798 27.5555 21.7846 27.9705L24 32.4593L26.2154 27.9704C26.4203 27.5554 26.8162 27.2677 27.2742 27.2012L32.2281 26.4813L28.6434 22.9871C28.312 22.6641 28.1608 22.1986 28.239 21.7424L28.9388 17.6619C28.7783 17.488 28.6202 17.3124 28.4654 17.1346L24.6544 19.1381C24.4495 19.2458 24.2247 19.2997 24 19.2997C23.7753 19.2997 23.5505 19.2458 23.3456 19.1381L18.9148 16.8086L19.761 21.7424C19.8393 22.1987 19.688 22.6642 19.3566 22.9872ZM31.3943 19.9831L31.136 21.4894L36.2316 26.4562C36.6148 26.8298 36.7528 27.3887 36.5873 27.8978C36.422 28.4069 35.9819 28.778 35.4522 28.8548L28.4103 29.8781L25.261 36.2592C25.0241 36.7392 24.5352 37.0431 24 37.0431C23.4648 37.0431 22.9759 36.7392 22.739 36.2592L19.5897 29.8781L12.5478 28.8548C12.0181 28.778 11.578 28.4069 11.4127 27.8978C11.2472 27.3887 11.3852 26.8298 11.7684 26.4562L16.864 21.4894L15.6611 14.4758C15.5707 13.9482 15.7875 13.4151 16.2205 13.1004C16.4656 12.9224 16.7557 12.8318 17.0472 12.8318C17.271 12.8318 17.4957 12.8852 17.7015 12.9934L24 16.3047L26.7219 14.8737C25.3706 12.8888 24.3331 10.7246 23.6367 8.44218C15.2227 8.63588 8.4375 15.5402 8.4375 24C8.4375 32.5812 15.4188 39.5625 24 39.5625C32.4597 39.5625 39.3641 32.7773 39.5579 24.3633C36.5927 23.4586 33.8259 21.98 31.3943 19.9831ZM25.7294 5.12437C26.4765 9.369 28.5009 13.2771 31.6119 16.3881C34.7229 19.4992 38.631 21.5235 42.8756 22.2707L25.7294 5.12437Z"
                fill="white"
              />
            </svg>

            <h1 className="pb-6 font-bold text-white font-quicksand">
              Sticker
            </h1>

            <svg
              className=""
              width="64"
              height="66"
              viewBox="0 0 64 66"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M51.5 34C47.1922 34 43.6875 37.5888 43.6875 42V46.8H42.125C41.2962 46.8 40.5013 47.1371 39.9153 47.7373C39.3292 48.3374 39 49.1513 39 50V62.8C39 63.6487 39.3292 64.4626 39.9153 65.0627C40.5013 65.6629 41.2962 66 42.125 66H60.875C61.7038 66 62.4987 65.6629 63.0847 65.0627C63.6708 64.4626 64 63.6487 64 62.8V50C64 49.1513 63.6708 48.3374 63.0847 47.7373C62.4987 47.1371 61.7038 46.8 60.875 46.8H59.3125V42C59.3125 37.5888 55.8078 34 51.5 34ZM46.8125 42C46.8125 39.3536 48.9156 37.2 51.5 37.2C54.0844 37.2 56.1875 39.3536 56.1875 42V46.8H46.8125V42ZM53.0625 59.1568V62.8H49.9375V59.1568C49.3912 58.8365 48.9526 58.3541 48.6794 57.7734C48.4063 57.1926 48.3114 56.5407 48.4073 55.9036C48.5033 55.2666 48.7855 54.6742 49.2168 54.2047C49.6481 53.7352 50.2083 53.4105 50.8234 53.2736C51.2803 53.1702 51.7541 53.173 52.2098 53.2821C52.6654 53.3911 53.0914 53.6034 53.4562 53.9035C53.8211 54.2035 54.1155 54.5836 54.3178 55.0157C54.5201 55.4478 54.625 55.9208 54.625 56.4C54.6241 56.9596 54.4792 57.5091 54.2049 57.993C53.9306 58.477 53.5365 58.8784 53.0625 59.1568Z"
                fill="white"
              />
              <path
                d="M60 30C60 30.0114 59.9996 30.0226 59.9995 30.0339C59.9995 30.0363 59.9995 30.0388 59.9994 30.0413C59.9888 38.0391 56.8696 45.5566 51.2132 51.2132C45.5469 56.8794 38.0133 60 30 60C21.9867 60 14.4531 56.8794 8.78672 51.2133C3.12059 45.5469 0 38.0133 0 30C0 21.9867 3.12059 14.4531 8.78672 8.78672C14.4529 3.12059 21.9864 0.000118256 29.9994 0H29.9995H29.9996H30C30.4574 0.000118256 30.9068 0.178593 31.2429 0.514805L59.4851 28.757C59.8213 29.0932 59.9989 29.5426 59.9991 29.9999H60V30ZM3.51562 30C3.51562 37.0743 6.27047 43.725 11.2727 48.7273C16.275 53.7295 22.9257 56.4844 30 56.4844C37.0743 56.4844 43.725 53.7295 48.7273 48.7273C53.3262 44.1284 56.0235 38.1359 56.4289 31.7021C55.2488 31.6323 54.0814 31.4951 52.9317 31.2908C52.26 43.3576 42.2318 52.9688 30 52.9688C17.335 52.9688 7.03125 42.665 7.03125 30C7.03125 17.7682 16.6424 7.74 28.7092 7.06816C28.5049 5.91844 28.3678 4.75113 28.298 3.57093C21.8643 3.97629 15.8716 6.67371 11.2727 11.2726C6.27047 16.275 3.51562 22.9257 3.51562 30ZM24.1957 28.734L19.7149 33.1017L25.9072 34.0016C26.4797 34.0848 26.9747 34.4443 27.2307 34.9631L30 40.5742L32.7693 34.963C33.0253 34.4442 33.5203 34.0847 34.0928 34.0015L40.2851 33.1016L35.8043 28.7339C35.39 28.3301 35.201 27.7482 35.2988 27.178L36.1736 22.0774C35.9729 21.86 35.7752 21.6405 35.5818 21.4182L30.818 23.9227C30.5619 24.0572 30.2809 24.1246 30 24.1246C29.7191 24.1246 29.4381 24.0573 29.182 23.9227L23.6435 21.0108L24.7013 27.178C24.7991 27.7484 24.61 28.3302 24.1957 28.734ZM39.2429 24.9789L38.92 26.8617L45.2895 33.0703C45.7685 33.5373 45.941 34.2359 45.7342 34.8723C45.5275 35.5086 44.9774 35.9725 44.3153 36.0686L35.5129 37.3477L31.5763 45.324C31.2802 45.924 30.669 46.3038 30 46.3038C29.331 46.3038 28.7198 45.924 28.4237 45.324L24.4871 37.3477L15.6847 36.0686C15.0226 35.9725 14.4725 35.5086 14.2658 34.8723C14.059 34.2359 14.2315 33.5373 14.7105 33.0703L21.08 26.8617L19.5764 18.0948C19.4633 17.4353 19.7344 16.7688 20.2757 16.3755C20.582 16.153 20.9446 16.0398 21.309 16.0398C21.5888 16.0398 21.8696 16.1065 22.1269 16.2417L30 20.3809L33.4024 18.5922C31.7133 16.1109 30.4164 13.4058 29.5459 10.5527C19.0283 10.7948 10.5469 19.4252 10.5469 30C10.5469 40.7265 19.2735 49.4531 30 49.4531C40.5746 49.4531 49.2052 40.9717 49.4474 30.4541C45.7409 29.3232 42.2824 27.475 39.2429 24.9789ZM32.1618 6.40547C33.0956 11.7113 35.6262 16.5963 39.5149 20.4851C43.4037 24.3739 48.2887 26.9044 53.5945 27.8384L32.1618 6.40547Z"
                fill="white"
                fill-opacity="0.5"
              />
            </svg>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
