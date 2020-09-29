import { MutableRefObject } from "react";
import { Expression } from "../../types/Expressions";
import PlayerFace from "../PlayerFace";

interface Props {
  canvasLeftRef: MutableRefObject<HTMLCanvasElement>;
  canvasRightRef: MutableRefObject<HTMLCanvasElement>;
  expressionLeft: Expression;
  expressionRight: Expression;
}

export default function GameScreen(props: Props) {
  return (
    <div
      style={{
        display: "flex",
        height: "100vh",
        flexDirection: "column",
        justifyContent: "space-around",
        paddingLeft: 50,
      }}
    >
      <PlayerFace
        canvasRef={props.canvasLeftRef}
        expression={props.expressionLeft}
      />
      <PlayerFace
        canvasRef={props.canvasRightRef}
        expression={props.expressionRight}
      />
    </div>
  );
}
