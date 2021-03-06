import classnames from "classnames";
import { motion } from "framer-motion";
import { allowedExpressions, gameConstants } from "../config";
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
          <div
            className={`absolute w-12 h-12 bg-black rounded-full ${
              props.state.isPerfect && props.isPast ? "" : "hidden"
            }`}
            style={{
              right: "-4rem",
              boxShadow: "0px 0px 15px #FCD932",
            }}
          >
            <img src="/img/nice.png" />
          </div>
          <div className="absolute z-30 my-1 ml-1 mr-4 text-4xl"></div>
          <div className="relative h-4 my-4 bg-black">
            {props.state.isPerfect && props.isPast ? (
              <div
                className="absolute top-0 bottom-0 left-0 right-0 rounded-full"
                style={{
                  backgroundColor: playerColor,
                  boxShadow:
                    props.state.isPerfect && props.isPast
                      ? `0px 0px 20px 0px ${playerColor}`
                      : "none",
                }}
              />
            ) : (
              props.state.intervals.map((interval, i) => {
                const left = interval.start * gameConstants.pixelsPerSecond;
                let stopTime = interval.stop;
                if (!stopTime && props.isCurrent) {
                  stopTime = Math.min(
                    props.gameTime +
                      gameConstants.historyDuration -
                      props.note.start,
                    props.note.duration
                  );
                }

                const width =
                  (stopTime - interval.start) * gameConstants.pixelsPerSecond;

                return (
                  <motion.div
                    key={i}
                    className="absolute top-0 bottom-0 rounded-full"
                    style={{
                      left,
                      backgroundColor: playerColor,
                      boxShadow: props.state.isPerfect
                        ? `0px 0px 20px 10px ${playerColor}`
                        : "none",
                    }}
                    animate={
                      props.isPast && props.state.isPerfect
                        ? {
                            width:
                              interval.stop * gameConstants.pixelsPerSecond,
                          }
                        : { width: width }
                    }
                    transition={{
                      ease: "linear",
                      //duration:
                    }}
                  />
                );
              })
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
