import { MutableRefObject } from "react";
import { Expression } from "../../types/Expressions";
import PlayerFace from "../PlayerFace";
import ProgressBar from "../ProgressBar";
import PlayField from "../PlayField";
import VerticalLine from "../VerticalLine";

interface Props {
  canvasLeftRef: MutableRefObject<HTMLCanvasElement>;
  canvasRightRef: MutableRefObject<HTMLCanvasElement>;
  players: Expression[];
  faceBoxes: any[];
}

export default function GameScreen(props: Props) {
  return (
    <div
      style={{ backgroundImage: "url('/img/startscreen-bg.jpg')" }}
      className="flex flex-col h-full justify-around bg-gray-700"
    >
      <VerticalLine player1={"26%"} player2={"23%"} />

      <div className="w-52 flex flex-row justify-start pl-1">
        <PlayerFace
          canvasRef={props.canvasLeftRef}
          expression={props.players[0]}
          faceBox={props.faceBoxes[0]}
        />
        <PlayField />
      </div>
      <ProgressBar position={60} />
      <div className="w-52 flex flex-row justify-start pl-1">
        <PlayerFace
          canvasRef={props.canvasRightRef}
          expression={props.players[1]}
          faceBox={props.faceBoxes[1]}
        />

        <PlayField />
      </div>
    </div>
  );
}
