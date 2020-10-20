import { useCollection } from "@nandorojo/swr-firestore";
import { motion } from "framer-motion";
import React, { MutableRefObject, useMemo } from "react";
import useActiveExpression from "../../hooks/useActiveExpression";
import { FinalStats } from "../../hooks/useFinalStats";
import useIdle from "../../hooks/useIdle";
import { HighscoreEntry } from "../../types/Database";
import { Expression } from "../../types/Expressions";
import { Level } from "../../types/Level";
import Badge from "../Badge";
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
          <div className="flex flex-col items-center w-1/3 text-center">
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

            {activeExpression[0].currentExpression == undefined ||
            activeExpression[0].selectedExpression == undefined ? (
              <div className="w-16 h-16 my-4"></div>
            ) : (
              <h1 className="pt-6 text-5xl text-white" style={textGlowBlue}>
                {Math.round(
                  props.stats.accuracy[0][
                    activeExpression[0].selectedExpression
                  ] * 100
                )}
                <span className="text-3xl">%</span>
              </h1>
            )}
          </div>

          <div className="flex flex-col items-center w-1/3 text-center">
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
            {activeExpression[0].currentExpression == undefined ||
            activeExpression[0].selectedExpression == undefined ? (
              <div className="w-16 h-16 my-4"></div>
            ) : (
              <h1 className="pt-6 text-5xl text-white" style={textGlowBlue}>
                {
                  props.stats.timePerExpression[0][
                    activeExpression[0].selectedExpression
                  ]
                }
                <span className="text-3xl">s</span>
              </h1>
            )}
          </div>

          <div className="flex flex-col items-center w-1/3 text-center">
            <svg
              width="34"
              height="48"
              viewBox="0 0 34 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23 36.6C22.1 36.6 21.5 36.3 20.6 36L17 34.5L13.4 36C12.8 36.3 11.9 36.6 11 36.6C10.4 36.6 10.1 36.6 9.5 36.3L8 48L17 42L26 48L24.2 36.3C23.9 36.6 23.3 36.6 23 36.6Z"
                fill="white"
              />
              <path
                d="M31.7 17.7C31.4 17.1 31.4 16.2 31.7 15.6L33.5 12C34.1 10.8 33.5 9.3 32 8.7L28.1 7.2C27.5 6.9 26.9 6.3 26.6 5.7L25.1 1.8C24.8 0.6 23.9 0 23 0C22.7 0 22.1 0 21.8 0.3L17.9 2.1H17C16.7 2.1 16.4 2.1 16.1 1.8L12.2 0.3C11.9 0 11.3 0 11 0C10.1 0 9.20003 0.6 8.60003 1.5L7.10003 5.7C7.10003 6.3 6.50003 6.9 5.90003 7.2L1.70003 8.7C0.500032 9 -0.0999687 10.5 0.500031 12L2.30003 15.9C2.60003 16.5 2.60003 17.4 2.30003 18L0.500031 21.6C-0.0999687 22.8 0.500031 24.3 2.00003 24.9L5.90003 26.4C6.50003 26.7 7.10003 27.3 7.40003 27.9L8.90003 31.8C9.20003 33 10.1 33.6 11 33.6C11.3 33.6 11.6 33.6 11.9 33.3L15.8 31.5C16.1 31.5 16.4 31.2 16.7 31.2C17 31.2 17.3 31.2 17.6 31.5L21.5 33.3C21.8 33.6 22.1 33.6 22.4 33.6C23.3 33.6 24.2 33 24.8 32.1L26.3 28.2C26.6 27.6 27.2 27 27.8 26.7L31.7 25.2C32.9 24.6 33.8 23.1 33.2 21.9L31.7 17.7V17.7ZM17 28.8C10.4 28.8 5.00003 23.4 5.00003 16.8C5.00003 10.2 10.4 4.8 17 4.8C23.6 4.8 29 10.2 29 16.8C29 23.4 23.6 28.8 17 28.8Z"
                fill="white"
              />
              <path
                d="M26 16.7998C26 19.1868 25.0518 21.4759 23.364 23.1638C21.6761 24.8516 19.3869 25.7998 17 25.7998C14.6131 25.7998 12.3239 24.8516 10.636 23.1638C8.94821 21.4759 8 19.1868 8 16.7998C8 14.4129 8.94821 12.1237 10.636 10.4358C12.3239 8.74802 14.6131 7.7998 17 7.7998C19.3869 7.7998 21.6761 8.74802 23.364 10.4358C25.0518 12.1237 26 14.4129 26 16.7998V16.7998Z"
                fill="white"
              />
            </svg>

            <h1 className="pt-2 font-bold text-white font-quicksand">Badge</h1>
            {activeExpression[0].currentExpression == undefined ||
            activeExpression[0].selectedExpression == undefined ||
            props.stats.accuracy[0][activeExpression[0].selectedExpression] <
              0.5 ? (
              <div className="w-16 h-16 my-4"></div>
            ) : (
              <Badge
                accuracy={
                  props.stats.accuracy[0][
                    activeExpression[0].selectedExpression
                  ]
                }
                expression={activeExpression[0].selectedExpression}
              />
            )}
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

        <div className="relative flex flex-row items-center justify-around w-full p-6">
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
          <div className="flex flex-col items-center w-1/3 text-center">
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

            {activeExpression[1].currentExpression == undefined ||
            activeExpression[1].selectedExpression == undefined ? (
              <div className="w-16 h-16 my-4"></div>
            ) : (
              <h1 className="pt-6 text-5xl text-white" style={textGlowBlue}>
                {Math.round(
                  props.stats.accuracy[1][
                    activeExpression[1].selectedExpression
                  ] * 100
                )}
                <span className="text-3xl">%</span>
              </h1>
            )}
          </div>

          <div className="flex flex-col items-center w-1/3 text-center">
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

            {activeExpression[1].currentExpression == undefined ||
            activeExpression[1].selectedExpression == undefined ? (
              <div className="w-16 h-16 my-4"></div>
            ) : (
              <h1 className="pt-6 text-5xl text-white" style={textGlowBlue}>
                {
                  props.stats.timePerExpression[1][
                    activeExpression[1].selectedExpression
                  ]
                }
                <span className="text-3xl">s</span>
              </h1>
            )}
          </div>

          <div className="flex flex-col items-center w-1/3 text-center">
            <svg
              width="34"
              height="48"
              viewBox="0 0 34 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M23 36.6C22.1 36.6 21.5 36.3 20.6 36L17 34.5L13.4 36C12.8 36.3 11.9 36.6 11 36.6C10.4 36.6 10.1 36.6 9.5 36.3L8 48L17 42L26 48L24.2 36.3C23.9 36.6 23.3 36.6 23 36.6Z"
                fill="white"
              />
              <path
                d="M31.7 17.7C31.4 17.1 31.4 16.2 31.7 15.6L33.5 12C34.1 10.8 33.5 9.3 32 8.7L28.1 7.2C27.5 6.9 26.9 6.3 26.6 5.7L25.1 1.8C24.8 0.6 23.9 0 23 0C22.7 0 22.1 0 21.8 0.3L17.9 2.1H17C16.7 2.1 16.4 2.1 16.1 1.8L12.2 0.3C11.9 0 11.3 0 11 0C10.1 0 9.20003 0.6 8.60003 1.5L7.10003 5.7C7.10003 6.3 6.50003 6.9 5.90003 7.2L1.70003 8.7C0.500032 9 -0.0999687 10.5 0.500031 12L2.30003 15.9C2.60003 16.5 2.60003 17.4 2.30003 18L0.500031 21.6C-0.0999687 22.8 0.500031 24.3 2.00003 24.9L5.90003 26.4C6.50003 26.7 7.10003 27.3 7.40003 27.9L8.90003 31.8C9.20003 33 10.1 33.6 11 33.6C11.3 33.6 11.6 33.6 11.9 33.3L15.8 31.5C16.1 31.5 16.4 31.2 16.7 31.2C17 31.2 17.3 31.2 17.6 31.5L21.5 33.3C21.8 33.6 22.1 33.6 22.4 33.6C23.3 33.6 24.2 33 24.8 32.1L26.3 28.2C26.6 27.6 27.2 27 27.8 26.7L31.7 25.2C32.9 24.6 33.8 23.1 33.2 21.9L31.7 17.7V17.7ZM17 28.8C10.4 28.8 5.00003 23.4 5.00003 16.8C5.00003 10.2 10.4 4.8 17 4.8C23.6 4.8 29 10.2 29 16.8C29 23.4 23.6 28.8 17 28.8Z"
                fill="white"
              />
              <path
                d="M26 16.7998C26 19.1868 25.0518 21.4759 23.364 23.1638C21.6761 24.8516 19.3869 25.7998 17 25.7998C14.6131 25.7998 12.3239 24.8516 10.636 23.1638C8.94821 21.4759 8 19.1868 8 16.7998C8 14.4129 8.94821 12.1237 10.636 10.4358C12.3239 8.74802 14.6131 7.7998 17 7.7998C19.3869 7.7998 21.6761 8.74802 23.364 10.4358C25.0518 12.1237 26 14.4129 26 16.7998V16.7998Z"
                fill="white"
              />
            </svg>

            <h1 className="pt-2 font-bold text-white font-quicksand">Badge</h1>

            {activeExpression[1].currentExpression == undefined ||
            activeExpression[1].selectedExpression == undefined ||
            props.stats.accuracy[1][activeExpression[1].selectedExpression] <
              0.5 ? (
              <div className="w-16 h-16 my-4"></div>
            ) : (
              <Badge
                accuracy={
                  props.stats.accuracy[1][
                    activeExpression[1].selectedExpression
                  ]
                }
                expression={activeExpression[1].selectedExpression}
              />
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
