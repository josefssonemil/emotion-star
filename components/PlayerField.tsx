import { motion } from "framer-motion";
import { gameConstants } from "../config";
import { Note } from "../types/Level";
import NoteBar from "./NoteBar";

interface Props {
  notes: Note[];
  offset: number;
  gameTime: number;
}

export default function PlayerField(props: Props) {
  return (
    <motion.div
      className="h-full"
      animate={{ x: -props.gameTime * gameConstants.pixelsPerSecond }}
    >
      <div className="grid h-full grid-rows-5">
        {props.notes.map((note, i) => (
          <NoteBar key={props.offset + i} note={note} />
        ))}
      </div>
    </motion.div>
  );
}
