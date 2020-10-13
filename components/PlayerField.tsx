import { motion } from "framer-motion";
import { gameConstants } from "../config";
import { FieldState } from "../hooks/useFieldState";
import { NoteState } from "../hooks/useNoteState";
import NoteBar from "./NoteBar";

interface Props {
  fieldState: FieldState;
  noteState: NoteState[];
  gameTime: number;
  player: number;
}

export default function PlayerField(props: Props) {
  const offset = -props.gameTime * gameConstants.pixelsPerSecond;

  return (
    <motion.div
      className="h-full"
      animate={{ x: offset }}
      transition={{
        ease: "linear",
      }}
      style={{ width: gameConstants.pixelsPerSecond * 60 }}
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
