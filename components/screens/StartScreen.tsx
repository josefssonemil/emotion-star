import { MutableRefObject, useEffect } from "react";
import { Expression } from "../../types/Expressions";
import HighScore from "../HighScore";
import PlayerFace from "../PlayerFace";
import EmptyCamPlaceholder from "../EmptyCamPlaceholder";

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

    if (!props.players.includes(undefined)) {
      props.onStart();
    }
  }, [props.players]);
  console.log(props.players);
  return (
    <div
      style={{ backgroundImage: "url('/img/startscreen-bg.jpg')" }}
      className="h-full w-full bg-center bg-cover justify-between items-center grid grid-cols-12 grid-rows-6"
    >
      <h1
        style={{ textShadow: "0 0 35px rgb(255, 0, 255)" }}
        className="text-5xl text-center text-white font-luckiest col-start-3 col-span-8 row-span-1 row-start-1 self-end"
      >
        Enter play area!
      </h1>

      <div className="w-64 justify-self-end col-span-3 col-end-7 row-span-3 row-start-2 relative">
        <PlayerFace
          canvasRef={props.canvasLeftRef}
          expression={props.players[0]}
          faceBox={props.faceBoxes[0]}
          constrainTo="width"
          player={1}
          noBorder={true}
        />
        {props.players[0] === undefined && <EmptyCamPlaceholder player="1" />}
      </div>
      <div className="w-64 justify-self-start col-span-3 col-start-7 row-span-3 row-start-2 relative">
        <PlayerFace
          canvasRef={props.canvasRightRef}
          expression={props.players[1]}
          faceBox={props.faceBoxes[1]}
          constrainTo="width"
          player={2}
          noBorder={true}
        />
        {props.players[1] === undefined && <EmptyCamPlaceholder player="2" />}
      </div>
    </div>
  );
}
/* Vector 5 (Stroke) */
//box-shadow: 0px 0px 15px #4BFAF0, inset 0px 0px 5px rgba(75, 250, 240, 0.25);
