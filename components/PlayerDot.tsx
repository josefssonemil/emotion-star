import { allowedExpressions, gameConstants } from "../config";
import { Expression } from "../types/Expressions";

interface Props {
  expression?: Expression;
}

export default function PlayerDot(props: Props) {
  const row = props.expression
    ? allowedExpressions.indexOf(props.expression) + 1
    : 0;

  const left = gameConstants.historyDuration * gameConstants.pixelsPerSecond;

  return (
    <div
      className="absolute top-0 bottom-0 z-10 grid h-full grid-rows-5"
      style={{
        left,
      }}
    >
      <div
        style={{
          boxShadow: "0 0 25px 2px #5EFFF5",
          opacity: props.expression ? 1 : 0,
        }}
        className={`${
          "row-start-" + row
        } justify-self-center self-center h-4 w-4 -ml-2 border-2 rounded-full border-player1 border-opacity-25 bg-blue-100 z-10`}
      />
    </div>
  );
}
