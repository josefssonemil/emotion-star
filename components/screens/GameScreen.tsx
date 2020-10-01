import { MutableRefObject } from "react";
import { Expression } from "../../types/Expressions";
import PlayerFace from "../PlayerFace";
import ProgressBar from "../ProgressBar";

interface Props {
  canvasLeftRef: MutableRefObject<HTMLCanvasElement>;
  canvasRightRef: MutableRefObject<HTMLCanvasElement>;
  players: Expression[];
  faceBoxes: any[];
}

export default function GameScreen(props: Props) {
  return (
    <div className="flex flex-col h-full justify-around">
      <div className="flex flex-row justify-start pl-24">
        <PlayerFace
          canvasRef={props.canvasLeftRef}
          expression={props.players[0]}
          faceBox={props.faceBoxes[0]}
        />
        <div>Playfield: Player 1</div>
      </div>
      <ProgressBar />
      <div className="flex flex-row justify-start pl-24">
        <PlayerFace
          canvasRef={props.canvasRightRef}
          expression={props.players[1]}
          faceBox={props.faceBoxes[1]}
        />
        <div>Playfield: Player 2</div>
      </div>
    </div>
  );
}
