import classnames from "classnames";
import { allowedExpressions, emojis } from "../config";
import { Expression } from "../types/Expressions";

interface Props {
  expression: Expression;
  left: number;
  width: number;
  isPast: boolean;
  isCurrent: boolean;
}

export default function NoteBar(props: Props) {
  const row = props.expression
    ? allowedExpressions.indexOf(props.expression) + 1
    : 0;

  if (!props.expression) {
    return <div />;
  }

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
        <div className="h-12 bg-white" style={{ width: props.width }}>
          <div className="text-4xl">{emojis[props.expression]}</div>
        </div>
      </div>
    </div>
  );
}
