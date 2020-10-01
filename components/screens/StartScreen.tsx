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
    <div className="flex justify-between items-center px-32 h-full">
      <div>
        <h1 className="font-bold text-4xl mb-8">
          Recognized {playerCount} out of 2 players
        </h1>
        <div className="flex flex-row mb-16">
          <div className="w-64">
            <PlayerFace
              canvasRef={props.canvasLeftRef}
              expression={props.players[0]}
              faceBox={props.faceBoxes[0]}
              constrainTo="width"
            />
          </div>

          <div className="w-16"></div>

          <div className="w-64">
            <PlayerFace
              canvasRef={props.canvasRightRef}
              expression={props.players[1]}
              faceBox={props.faceBoxes[1]}
              constrainTo="width"
            />
          </div>
        </div>

        <h1 className="text-2xl">
          Both of you, make surprised faces to start the game: 😯
        </h1>
      </div>
      <div className="px-4">
        <HighScore />
      </div>
    </div>
  );
}
