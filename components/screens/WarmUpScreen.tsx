import { MutableRefObject, useEffect, useState } from "react";
import { Expression } from "../../types/Expressions";
import PlayerFace from "../PlayerFace";
import WarmUp from "../WarmUp";

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

  useEffect(() => {
    if (playersDone[0] && playersDone[1]) {
      props.onStart();
    }
  }, [playersDone]);

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

      <div className="place-self-middle col-span-3 col-end-6 row-span-4 row-start-2">
        <div className="w-64 mx-auto mb-6">
          <PlayerFace
            canvasRef={props.canvasLeftRef}
            expression={props.players[0]}
            faceBox={props.faceBoxes[0]}
            constrainTo="width"
            player={1}
          />
        </div>

        <WarmUp
          expression={props.players[0]}
          onComplete={() => setPlayersDone((prevState) => [true, prevState[1]])}
        />
      </div>

      <div className="place-self-middle col-span-3 col-start-8 row-span-4 row-start-2">
        <div className="w-64 mx-auto mb-6">
          <PlayerFace
            canvasRef={props.canvasRightRef}
            expression={props.players[1]}
            faceBox={props.faceBoxes[1]}
            constrainTo="width"
            player={2}
          />
        </div>

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
