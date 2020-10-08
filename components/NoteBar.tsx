import classnames from "classnames";
import { allowedExpressions, emojis, gameConstants } from "../config";
import { Note } from "../types/Level";

interface Props {
  note: Note;
  isPast: boolean;
  isCurrent: boolean;
}

export default function NoteBar(props: Props) {
  const { expression } = props.note;
  const row = expression ? allowedExpressions.indexOf(expression) + 1 : 0;

  const left = gameConstants.pixelsPerSecond * props.note.start;
  const width = gameConstants.pixelsPerSecond * props.note.duration;

  return (
    <div
      className={classnames(
        "self-center col-span-1 col-start-1 row-span-1 relative transition-all duration-500",
        `row-start-${row}`,
        {
          "opacity-0": props.isPast,
        }
      )}
    >
      <div
        className="absolute top-0 bottom-0 flex items-center"
        style={{
          left,
        }}
      >
        <div className="h-12 bg-white" style={{ width }}>
          <div className="text-4xl">{emojis[expression]}</div>
        </div>
      </div>
    </div>
  );
}
