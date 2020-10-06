import { MutableRefObject, useEffect, useState } from "react";
import { Expression } from "../../types/Expressions";
import PlayerFace from "../PlayerFace";
import WarmUp from "../WarmUp";
import { motion } from "framer-motion";
import EmptyCamPlaceholder from "../EmptyCamPlaceholder";

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

  useEffect(() => {
    if (playersDone[0] && playersDone[1]) {
      props.onStart();
    }
  }, [playersDone]);

  useEffect(() => {
    if (!props.players.includes(undefined)) {
      setX(200);
    }
    if (props.players === [undefined, undefined]) {
      setX(0);
    }
  }, [props.players]);
  return (
    <div
      style={{ backgroundImage: "url('/img/startscreen-bg.jpg')" }}
      className="h-full w-full bg-center bg-cover justify-between items-center grid grid-cols-12 grid-rows-6"
    >
      <h1
        style={{ textShadow: "0 0 35px rgb(255, 0, 255)" }}
        className="text-5xl text-center text-white col-start-3 col-span-8 row-span-1 row-start-1 self-end"
      >
        Practice your face expressions
      </h1>

      <h1 className="text-2xl text-white text-right col-span-2 col-end-12 row-span-1 row-start-1">
        Team name: {props.teamName}
      </h1>

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
        className="w-64 justify-self-end col-span-3 col-end-7 row-span-3 row-start-2 relative"
      >
        <PlayerFace
          canvasRef={props.canvasLeftRef}
          expression={props.players[0]}
          faceBox={props.faceBoxes[0]}
          constrainTo="width"
          player={1}
          noBorder={true}
        />
        {props.players[0] === undefined && <EmptyCamPlaceholder player="1" />}
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
        className="w-64 justify-self-start col-span-3 col-start-7 row-span-3 row-start-2 relative"
      >
        <PlayerFace
          canvasRef={props.canvasRightRef}
          expression={props.players[1]}
          faceBox={props.faceBoxes[1]}
          constrainTo="width"
          player={2}
          noBorder={true}
        />
        {props.players[1] === undefined && <EmptyCamPlaceholder player="2" />}
      </motion.div>
      <div className="col-span-4 col-start-2 row-span-1 row-start-5">
        <WarmUp
          expression={props.players[0]}
          onComplete={() => setPlayersDone((prevState) => [true, prevState[1]])}
        />
      </div>
      <div className="col-span-4 col-end-12 row-span-1 row-start-5">
        <WarmUp
          expression={props.players[1]}
          onComplete={() => setPlayersDone((prevState) => [prevState[0], true])}
        />
      </div>

      <div
        className="text-center col-start-1 col-span-12 row-start-6 row-span-1 text-2xl text-white"
        style={{
          textShadow: "rgb(255, 0, 255) 0px 0px 35px",
        }}
      >
        Complete all emojis to continue...
      </div>
    </div>
  );
}
