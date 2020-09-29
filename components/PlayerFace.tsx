import { MutableRefObject } from "react";
import { Expression } from "../types/Expressions";

const emojis = {
  happy: "😁",
  angry: "😡",
  surprised: "😯",
  sad: "😢",
  neutral: "😐",
};

interface Props {
  canvasRef: MutableRefObject<HTMLCanvasElement>;
  expression: Expression;
}

export default function PlayerFace(props: Props) {
  return (
    <div style={{ position: "relative", width: 640 / 2 }}>
      <canvas
        ref={props.canvasRef}
        width="640"
        height="720"
        style={{
          transform: "scaleX(-1)",
          width: 640 / 2,
          height: 720 / 2,
        }}
      />
      <div
        style={{
          fontSize: 72,
          position: "absolute",
          bottom: -10,
          right: -10,
          boxShadow: "0 5px 15px rgba(0,0,0,.2)",
          backgroundColor: "#fff",
          width: 100,
          height: 100,
          borderRadius: 20,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {emojis[props.expression] || "?"}
      </div>
    </div>
  );
}
