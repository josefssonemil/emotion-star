import { motion } from "framer-motion";
import { gameConstants } from "../config";
import { FieldState } from "../hooks/useFieldState";
import NoteBar from "./NoteBar";

interface Props {
  state: FieldState;
  gameTime: number;
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
        {props.state.notes.map((note, i) => {
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
              expression={note.expression}
              isPast={i < props.state.currentIndex}
              isCurrent={props.state.currentIndex === i}
            />
          );
        })}
      </div>
    </motion.div>
  );
}
