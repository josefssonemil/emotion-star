import { allowedExpressions, emojis, gameConstants } from "../config";
import { Note } from "../types/Level";

interface Props {
  note: Note;
}

export default function NoteBar(props: Props) {
  const { expression } = props.note;
  const row = expression ? allowedExpressions.indexOf(expression) + 1 : 0;

  const left = gameConstants.pixelsPerSecond * props.note.start;
  const width = gameConstants.pixelsPerSecond * props.note.duration;

  return (
    <div
      className={`${
        "row-start-" + row
      } self-center col-span-1 col-start-1 row-span-1 relative`}
    >
      <div
        className="absolute top-0 bottom-0 flex items-center"
        style={{
          left,
        }}
      >
        <div className="h-12 bg-red-500" style={{ width }}>
          <div>{emojis[expression]}</div>
        </div>
      </div>
    </div>
  );
}
