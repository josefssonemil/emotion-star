import { MutableRefObject } from "react";
import useMeasure from "react-use-measure";
import { emojis } from "../config";
import { Expression } from "../types/Expressions";

interface Props {
  canvasRef: MutableRefObject<HTMLCanvasElement>;
  expression?: Expression;
  faceBox?: any;
  constrainTo?: "width" | "height";
  player: 1 | 2;
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

  const getScale = (box: any) => {
    if (box) {
      return box.width / 400;
    }

    return 1;
  };

  const playerColor = props.player === 1 ? "#4BFAF0" : "#86E409";

  return (
    <div
      className="relative border-black border-box font-sans"
      ref={ref}
      style={
        constrainTo === "height"
          ? { width, height: "100%" }
          : { height, width: "100%" }
      }
    >
      <div className="absolute" style={{ width, height }}>
        <div
          className="inset-0 absolute overflow-hidden"
          style={{ borderRadius: 20, borderWidth: 6 }}
        >
          {!!props.faceBox && (
            <div
              className="absolute border-white border-opacity-75 shadow-pinkBlur2 border-2 rounded-lg z-10 duration-75 -mt-2"
              style={getFaceBoxStyles(props.faceBox)}
            >
              <div
                className="text-6xl absolute shadow-xl w-16 h-16 rounded-full flex items-center justify-center right-0 bottom-0 -mb-4 -mr-4"
                style={{
                  transformOrigin: "bottom right",
                  transform: `scale(${getScale(props.faceBox)})`,
                }}
              >
                {emojis[props.expression] || "👤"}
              </div>
            </div>
          )}
        </div>

        <canvas
          className="bg-black"
          ref={props.canvasRef}
          width="640"
          height="720"
          style={{
            transform: "scaleX(-1)",
            width,
            height,
            borderRadius: 20,
            borderWidth: 6,
            borderColor: playerColor,
            boxShadow: `0 0 15px ${playerColor}`,
          }}
        />
      </div>
    </div>
  );
}
