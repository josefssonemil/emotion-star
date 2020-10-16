import classnames from "classnames";
import { MutableRefObject } from "react";
import useMeasure from "react-use-measure";
import { emojis } from "../config";
import { Expression } from "../types/Expressions";
import EmptyCamPlaceholder from "./EmptyCamPlaceholder";

interface Props {
  canvasRef: MutableRefObject<HTMLCanvasElement>;
  expression?: Expression;
  faceBox?: any;
  constrainTo?: "width" | "height";
  player: 1 | 2;
  border?: "none" | "connected" | "regular"
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
      className="relative font-sans border-box"
      ref={ref}
      style={
        constrainTo === "height"
          ? { width, height: "100%" }
          : { height, width: "100%" }
      }
    >
      <div className="absolute" style={{ width, height }}>
        <div
          className={`inset-0 absolute ${
            props.border === "connected" ? "" : "overflow-hidden"
          }`}
          style={props.border=="none" ? {borderRadius: 0, borderWidth: 0 } : { borderRadius: 20, borderWidth: 6 }}
        >
          {!!props.faceBox && (
            <div
              className={classnames(
                "absolute border-white border-opacity-75 border-2 rounded-lg z-10 duration-75 -mt-2",
                {
                  "shadow-blueBlur": props.player === 1,
                  "shadow-greenBlur": props.player === 2,
                }
              )}
              style={getFaceBoxStyles(props.faceBox)}
            >
              <div
                className={`${
                  props.player == 1 ? "left-0 -ml-8" : "right-0 -mr-4"
                } absolute shadow-xl w-16 h-16 rounded-full flex items-center justify-center  bottom-0 -mb-4`}
                style={{
                  fontSize: props.border == "none" ? "2rem": "4rem",
                  transformOrigin: "bottom right",
                  transform: `scale(${getScale(props.faceBox)})`,
                }}
              >
                {emojis[props.expression] || "?"}
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
            // Top right
            borderTopLeftRadius: (props.player == 1 && props.border === "connected") || props.border==="none" ? 0 : 20,
            // Top left
            borderTopRightRadius: (props.player == 2 && props.border === "connected") || props.border==="none" ? 0 : 20,
            // Bottom left
            borderBottomRightRadius:
              (props.player == 2 && props.border === "connected") || props.border==="none" ? 0 : 20,
            // Bottom right
            borderBottomLeftRadius:
              (props.player == 1 && props.border === "connected") || props.border==="none" ? 0 : 20,

            borderTopWidth: props.border==="none" ? 0 : 6,
            borderBottomWidth: props.border==="none" ? 0 : 6,
            // Border right
            borderLeftWidth: (props.border === "connected" && props.player == 1) || props.border==="none" ? 0 : 6,
            // Border left
            borderRightWidth: (props.border === "connected" && props.player == 2) || props.border==="none" ? 0 : 6,
            borderColor: playerColor,
            boxShadow: props.border === "connected" || props.border==="none" ? "" : `0 0 15px ${playerColor}`,
          }}
        />
        {props.expression === undefined && (
          <EmptyCamPlaceholder player={props.player} />
        )}
      </div>
    </div>
  );
}
