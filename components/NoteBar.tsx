import classnames from "classnames";
import { motion } from "framer-motion";
import { allowedExpressions, emojis, gameConstants } from "../config";
import { NoteState } from "../hooks/useNoteState";
import { Expression } from "../types/Expressions";
import { Note } from "../types/Level";
import NoteBarLeft from "./NoteBarLeft";
import NoteBarMiddle from "./NoteBarMiddle";
import NoteBarRight from "./NoteBarRight";

interface Props {
  expression: Expression;
  left: number;
  width: number;
  note: Note;
  isPast: boolean;
  isCurrent: boolean;
  state: NoteState;
  player: number;
  gameTime: number;
}

export default function NoteBar(props: Props) {
  const row = props.expression
    ? allowedExpressions.indexOf(props.expression) + 1
    : 0;

  if (!props.expression) {
    return <div />;
  }

  const playerColor = props.player === 1 ? "#4BFAF0" : "#86E409";
  const playerGradient =
    props.player === 1
      ? "linearGradient(to right, #0472A1, #4BFAF0)"
      : "linearGradient(to right, #2DA104, #86E409)";

  return (
    <div
      className={classnames(
        "self-center col-span-1 col-start-1 row-span-1 relative transition-all duration-500",
        `row-start-${row}`,
        {
          "opacity-50": props.isPast,
        }
      )}
    >
      <div
        className="absolute top-0 bottom-0 flex items-center"
        style={{
          left: props.left,
        }}
      >
        <div
          className={classnames("items-center h-12", {
            /*"shadow-blueBlur": props.state.isPerfect && props.player === 1,
            "shadow-greenBlur": props.state.isPerfect && props.player === 2,*/
          })}
          style={{ width: props.width }}
        >
          <div
            className="absolute z-40 w-12 h-12"
            style={{
              left: "-2.5rem",
            }}
          >
            <NoteBarLeft expression={props.expression} />
          </div>
          <div className="absolute z-20 flex items-center h-12 pl-2 pr-2">
            <NoteBarMiddle />
          </div>
          <div
            className="absolute z-40 flex items-center w-6 h-12"
            style={{
              right: "-1rem",
            }}
          >
            <NoteBarRight />
          </div>
          <div className="absolute z-30 my-1 ml-1 mr-4 text-4xl text-pink-600">
            {props.state.isPerfect && "(Perfect)"} {"" + width}
          </div>
          <div className="relative h-4 my-4 bg-black">
            {props.state.intervals.map((interval, i) => {
              const left = interval.start * gameConstants.pixelsPerSecond;

              let stopTime = interval.stop;

              if (!stopTime && props.isPast) {
                stopTime = props.note.duration - interval.start;
              } else if (!stopTime && props.isCurrent) {
                stopTime =
                  props.gameTime +
                  gameConstants.historyDuration -
                  (props.note.start + interval.start);
              }

              const width = stopTime * gameConstants.pixelsPerSecond;

              return (
                <motion.div
                  key={i}
                  className="absolute top-0 bottom-0 rounded-full"
                  style={{ left, backgroundColor: playerColor }}
                  animate={{ width }}
                  transition={{
                    ease: "linear",
                  }}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
