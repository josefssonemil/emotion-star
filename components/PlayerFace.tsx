import { MutableRefObject } from "react";
import { emojis } from "../config";
import { Expression } from "../types/Expressions";

interface Props {
  canvasRef: MutableRefObject<HTMLCanvasElement>;
  expression?: Expression;
  faceBox?: any;
}

export default function PlayerFace(props: Props) {
  return (
    <div className="relative" style={{ width: 640 / 2 }}>
      {!!props.faceBox && (
        <div
          className="absolute border-yellow-400 border-2 z-10 rounded-full border-dashed transition-all duration-75 -mt-2"
          style={{
            transform: `translate(${props.faceBox.left / 2}px, ${
              props.faceBox.top / 2
            }px)`,
            width: props.faceBox.width / 2,
            height: props.faceBox.height / 2,
          }}
        />
      )}
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
      <div className="text-6xl absolute shadow-xl bg-white w-24 h-24 rounded-lg flex items-center justify-center right-0 bottom-0 -mb-4 -mr-4">
        {emojis[props.expression] || "?"}
      </div>
    </div>
  );
}
