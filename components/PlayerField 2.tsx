import { animate, motion, useMotionValue } from "framer-motion";
import { useEffect } from "react";
import { gameConstants } from "../config";
import { FieldState } from "../hooks/useFieldState";
import { NoteState } from "../hooks/useNoteState";
import NoteBar from "./NoteBar";

interface Props {
  fieldState: FieldState;
  noteState: NoteState[];
  gameTime: number;
  player: number;
  duration: number;
}

export default function PlayerField(props: Props) {
  const x = useMotionValue(0);

  useEffect(() => {
    const controls = animate(
      x,
      -props.duration * gameConstants.pixelsPerSecond,
      {
        type: "tween",
        ease: "linear",
        duration: props.duration,
      }
    );

    return controls.stop;
  }, []);

  const offset = x.get();

  return (
    <motion.div
      className="h-full"
      style={{ x, width: gameConstants.pixelsPerSecond * props.duration }}
    >
      <div className="grid h-full grid-rows-5">
        {props.fieldState.notes.map((note, i) => {
          const left = gameConstants.pixelsPerSecond * note.start;
          const width = gameConstants.pixelsPerSecond * note.duration;

          // If outside of the game area (with some margin)
          if (
            left + width + offset < -300 ||
            left + offset > window.innerWidth
          ) {
            // Return empty fragment
            return;
          }

          return (
            <NoteBar
              key={i}
              width={width}
              left={left}
              note={note}
              gameTime={props.gameTime}
              player={props.player}
              expression={note.expression}
              isPast={i < props.fieldState.currentIndex}
              isCurrent={props.fieldState.currentIndex === i}
              state={
                props.noteState[i] || {
                  isPerfect: false,
                  intervals: [],
                }
              }
            />
          );
        })}
      </div>
    </motion.div>
  );
}
