import { MutableRefObject } from "react";
import useMeasure from "react-use-measure";
import { emojis } from "../config";
import { Expression } from "../types/Expressions";

interface Props {
  canvasRef: MutableRefObject<HTMLCanvasElement>;
  expression?: Expression;
  faceBox?: any;
  constrainTo?: "width" | "height";
}

export default function PlayerFace(props: Props) {
  const [ref, bounds] = useMeasure();

  const constrainTo = props.constrainTo || "height";

  let width: number, height: number;

  if (constrainTo === "height") {
    width = (640 / 720) * bounds.height;
    height = bounds.height;
  } else {
    width = bounds.width;
    height = (720 / 640) * bounds.width;
  }

  const scaleFactor = width / 640;

  const getFaceBoxStyles = (box: any) => ({
    transform: `translate(${box.left * scaleFactor}px, ${
      box.top * scaleFactor
    }px)`,
    width: box.width * scaleFactor,
    height: box.height * scaleFactor,
  });

  return (
    <div
      className="bg-black relative border-black border-box"
      ref={ref}
      style={constrainTo === "height" ? { width } : { height }}
    >
      <div className="absolute" style={{ width, height }}>
        <div className="top-0 left-0 absolute overflow-hidden">
          {!!props.faceBox && (
            <div
              className="absolute border-white border-opacity-75 shadow-pinkBlur2 border-2 rounded-lg z-10 transition-all duration-75 -mt-2"
              style={getFaceBoxStyles(props.faceBox)}
            >
              <div className="text-6xl absolute shadow-xl w-16 h-16 rounded-full flex items-center justify-center right-0 bottom-0 -mb-4 -mr-4">
                {emojis[props.expression] || "👤"}
              </div>
            </div>
          )}
          <canvas
            ref={props.canvasRef}
            className=""
            width="640"
            height="720"
            style={{
              transform: "scaleX(-1)",
              width,
              height,
            }}
          />
        </div>
      </div>
    </div>
  );
}
