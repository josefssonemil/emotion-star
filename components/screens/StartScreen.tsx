import { MutableRefObject, useEffect } from "react";
import { Expression } from "../../types/Expressions";
import HighScore from "../HighScore";
import PlayerFace from "../PlayerFace";

interface Props {
  canvasLeftRef: MutableRefObject<HTMLCanvasElement>;
  canvasRightRef: MutableRefObject<HTMLCanvasElement>;
  players: Expression[];
  faceBoxes: any[];
  onStart: () => void;
}
export default function StartScreen(props: Props) {
  const playerCount = props.players.filter((expression) => expression).length;

  useEffect(() => {
    const surprisedCount = props.players.filter(
      (expression) => expression === "surprised"
    ).length;

    if (surprisedCount === 2) {
      props.onStart();
    }
  }, [props.players]);

  return (
    <div
      style={{ backgroundImage: "url('/img/startscreen-bg.jpg')" }}
      className="h-full w-full bg-center bg-cover justify-between items-center grid grid-cols-12 grid-rows-6"
    >
      <h1
        style={{ textShadow: "0 0 35px rgb(255, 0, 255)" }}
        className="text-5xl text-center text-white font-luckiest col-start-3 col-span-8 row-span-1 row-start-1 self-end"
      >
        Recognized {playerCount} out of 2 players
      </h1>

      <div className="w-64 justify-self-center col-span-3 col-end-7 row-span-3 row-start-2">
        <PlayerFace
          canvasRef={props.canvasLeftRef}
          expression={props.players[0]}
          faceBox={props.faceBoxes[0]}
          constrainTo="width"
        />
      </div>
      <div className="w-64 justify-self-center col-span-3 col-start-7 row-span-3 row-start-2">
        <PlayerFace
          canvasRef={props.canvasRightRef}
          expression={props.players[1]}
          faceBox={props.faceBoxes[1]}
          constrainTo="width"
        />
      </div>

      <h1
        style={{ textShadow: "0 0 35px rgb(255, 0, 255)" }}
        className="text-3xl font-luckiest text-white tracking-wider text-center col-start-3 col-span-8 row-end-6 row-span-1"
      >
        Both of you, make surprised faces to start the game: 😯
      </h1>

      <div className="place-self-center col-span-3 col-end-13 row-span-4 row-start-1">
        <HighScore />
      </div>
    </div>
  );
}
