import { motion } from "framer-motion";
import { gameConstants } from "../config";
import { FieldState } from "../hooks/useFieldState";
import NoteBar from "./NoteBar";

interface Props {
  state: FieldState;
  gameTime: number;
}

export default function PlayerField(props: Props) {
  return (
    <motion.div
      className="h-full"
      animate={{ x: -props.gameTime * gameConstants.pixelsPerSecond }}
    >
      <div className="grid h-full grid-rows-5">
        {props.state.notes.map((note, i) => (
          <NoteBar
            key={i}
            note={note}
            isPast={i < props.state.currentIndex}
            isCurrent={props.state.currentIndex === i}
          />
        ))}
      </div>
    </motion.div>
  );
}
