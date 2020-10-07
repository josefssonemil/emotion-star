import { MutableRefObject, useEffect, useState } from "react";
import { Expression } from "../../types/Expressions";
import PlayerFace from "../PlayerFace";
import WarmUp from "../WarmUp";
import { motion } from "framer-motion";
import useTimer from "../../hooks/useTimer";

interface Props {
  canvasLeftRef: MutableRefObject<HTMLCanvasElement>;
  canvasRightRef: MutableRefObject<HTMLCanvasElement>;
  players: Expression[];
  faceBoxes: any[];
  onStart: () => void;
  teamName: string;
}

export default function WarmUpScreen(props: Props) {
  const [playersDone, setPlayersDone] = useState([false, false]);
  const [x, setX] = useState(0);
  const [warmup, setWarmup] = useState(false);
  const [test, setTest] = useState("start");

  const timer = useTimer(3);

  useEffect(() => {
    if (playersDone[0] && playersDone[1]) {
      props.onStart();
    }
  }, [playersDone]);

  useEffect(() => {
    if (!props.players.includes(undefined)) {
      setX(200);
      setWarmup(true);
      setTest("warmup");
    }
    if (props.players[0] == undefined && props.players[1] == undefined) {
      setX(0);
      setWarmup(false);

      setTest("start");
    }
  }, [props.players, timer.seconds]);
  return (
    <div
      style={{ backgroundImage: "url('/img/startscreen-bg.jpg')" }}
      className="h-full w-full bg-center bg-cover justify-between items-center grid grid-cols-12 grid-rows-6"
    >
      <h1
        style={{ textShadow: "0 0 35px rgb(255, 0, 255)" }}
        className="text-5xl text-center text-white col-start-3 col-span-8 row-span-1 row-start-1 self-center"
      >
        {warmup ? "Practice your face expressions" : "Enter Play Area"}
      </h1>
      {warmup && (
        <h1
          style={{ textShadow: "0 0 35px rgb(255, 0, 255)" }}
          className="text-4xl text-center text-white col-start-6 col-span-2 row-span-2 row-start-2 self-end p-4"
        >
          Welcome team: {props.teamName}
        </h1>
      )}
      {warmup && (
        <div className="col-span-1 col-end-7 row-span-4 row-end-7 self-center justify-self-start">
          <WarmUp
            expression={props.players[0]}
            onComplete={() =>
              setPlayersDone((prevState) => [true, prevState[1]])
            }
          />
        </div>
      )}
      {warmup && (
        <div className="col-span-1 col-start-7 row-span-4 row-end-7 self-center justify-self-end">
          <WarmUp
            expression={props.players[1]}
            onComplete={() =>
              setPlayersDone((prevState) => [prevState[0], true])
            }
          />
        </div>
      )}
      <motion.div
        initial={{
          marginRight: "0",
        }}
        animate={{
          marginRight: x,
        }}
        transition={{
          duration: 1,
          ease: "easeInOut",
        }}
        className="w-full justify-self-end self-start col-span-4 col-end-7 row-span-4 row-start-2 relative"
      >
        <div className="flex-1">
          <PlayerFace
            canvasRef={props.canvasLeftRef}
            expression={props.players[0]}
            faceBox={props.faceBoxes[0]}
            constrainTo="width"
            player={1}
            connected={warmup ? false : true}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{
          marginLeft: "0",
        }}
        animate={{
          marginLeft: x,
        }}
        transition={{
          duration: 1,
          ease: "easeInOut",
        }}
        className="w-full flex justify-self-start self-start col-span-4 col-start-7 row-span-4 row-start-2 relative"
      >
        <div className="flex-1">
          <PlayerFace
            canvasRef={props.canvasRightRef}
            expression={props.players[1]}
            faceBox={props.faceBoxes[1]}
            constrainTo="width"
            player={2}
            connected={warmup ? false : true}
          />
        </div>
      </motion.div>

      {false && (
        <div
          className="text-center col-start-1 col-span-12 row-start-5 row-span-1 text-2xl text-white"
          style={{
            textShadow: "rgb(255, 0, 255) 0px 0px 35px",
          }}
        >
          {"[" +
            props.players[0] +
            ", " +
            props.players[1] +
            "] & " +
            timer.seconds}
        </div>
      )}
    </div>
  );
}
