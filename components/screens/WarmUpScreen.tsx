import { motion } from "framer-motion";
import { MutableRefObject, useEffect, useState } from "react";
import useSound from "use-sound";
import useTimer from "../../hooks/useTimer";
import { Expression } from "../../types/Expressions";
import PlayerFace from "../PlayerFace";
import WarmUp from "../WarmUp";
import ScoreScreen from "./ScoreScreen";

interface Props {
  canvasLeftRef: MutableRefObject<HTMLCanvasElement>;
  canvasRightRef: MutableRefObject<HTMLCanvasElement>;
  players: [Expression, Expression];
  faceBoxes: any[];
  onStart: () => void;
  teamName: string;
}

export default function WarmUpScreen(props: Props) {
  const [playersDone, setPlayersDone] = useState([false, false]);
  const [x, setX] = useState(0);
  const [warmup, setWarmup] = useState(false);
  const [connected, setConnected] = useState(true);
  const [idle, setIdle] = useState(true);
  const timer = useTimer(3);
  const delay = 3;
  const [play] = useSound("/sound/bye.mp3", {
      volume: 1,
      playbackRate: 1,
  });
  
  useEffect(() => {
    if (playersDone[0] && playersDone[1]) {
      props.onStart();
    }
  }, [playersDone]);
  
  useEffect(() => {
    if (!props.players.includes(undefined) && connected) {
      setX(250);
      setWarmup(true);
      setConnected(false);
    }
  }, [props.players, connected]);

  useEffect(() => {
    props.players[0] == undefined && props.players[1] == undefined
      ? setIdle(true)
      : setIdle(false);
  }, [props.players]);

  useEffect(() => {
    if (idle && warmup && timer.seconds == 0) {
      timer.start();
    }
    if (!idle) {
      timer.reset();
    }
    if (idle && warmup && timer.seconds >= delay) {
      setX(0);
      setWarmup(false);
      timer.reset();
      play();
    }
  }, [props.players, idle, warmup, timer.seconds]);

  const onCamStart = () => x == 500 && setWarmup(true);
  const onCamComplete = () => x == 0 && setConnected(true);

  const duration = x != 0 ? 1 : 1;
  // CAM ANIMATION
  const camTransition =
    x != 0
      ? { duration: duration, ease: "easeOut" }
      : { duration: duration, ease: "easeIn" };

  // H1 ANIMATION
  const h1Variants = {
    active: {
      opacity: 1,
    },
    inactive: {
      opacity: 0,
    },
  };
  const h1Transition = {
    duration: 0.3,
    ease: "easeInOut",
  };

  return (
    <div
      style={{ backgroundImage: "url('/img/startscreen-bg.jpg')" }}
      className="grid items-center justify-between w-full h-full grid-cols-12 grid-rows-6 p-10 bg-center bg-cover"
    > 
      
      <motion.h1
        variants={h1Variants}
        animate={!warmup ? "active" : "inactive"}
        transition={h1Transition}
        style={{ textShadow: "0 0 35px rgb(255, 0, 255)" }}
        className="self-center col-span-8 col-start-3 row-span-1 row-start-1 text-5xl text-center text-white"
      >
        Enter Play Area
      </motion.h1>
      <motion.h1
        variants={h1Variants}
        animate={warmup ? "active" : "inactive"}
        transition={h1Transition}
        style={{ textShadow: "0 0 35px rgb(255, 0, 255)" }}
        className="self-center col-span-10 col-end-12 row-span-1 row-start-1 text-4xl text-center text-white"
      >
        Welcome team: <span className="text-5xl">{props.teamName}</span>  <br/> Practice your expressions
      </motion.h1>

      {!connected && (
        <div className="self-center col-span-1 col-end-7 row-span-4 row-end-6 justify-self-start">
          <WarmUp
            expression={props.players[0]}
            onComplete={() =>
              setPlayersDone((prevState) => [true, prevState[1]])
            }
          />
        </div>
      )}
      {!connected && (
        <div className="self-center col-span-1 col-start-7 row-span-4 row-end-6 justify-self-end">
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
          paddingRight: "0",
        }}
        animate={{
          paddingRight: x,
        }}
        transition={camTransition}
        onAnimationStart={onCamStart}
        onAnimationComplete={onCamComplete}
        className="relative flex w-full h-full col-span-6 col-end-7 row-span-4 row-end-6"
      >
        <div className="ml-auto">
          <PlayerFace
            canvasRef={props.canvasLeftRef}
            expression={props.players[0]}
            faceBox={props.faceBoxes[0]}
            constrainTo="height"
            player={1}
            border={!connected ? "regular" : "connected"}
          />
        </div>
      </motion.div>

      <motion.div
        initial={{
          paddingLeft: "0",
        }}
        animate={{
          paddingLeft: x,
        }}
        transition={camTransition}
        className="relative flex w-full h-full col-span-5 col-start-7 row-span-4 row-end-6"
      >
        <div className="mr-auto">
          <PlayerFace
            canvasRef={props.canvasRightRef}
            expression={props.players[1]}
            faceBox={props.faceBoxes[1]}
            constrainTo="height"
            player={2}
            border={!connected ? "regular" : "connected"}
          />
        </div>
      </motion.div>
    </div>
  );
}
