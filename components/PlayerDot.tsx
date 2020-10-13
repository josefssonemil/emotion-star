import { allowedExpressions, gameConstants } from "../config";
import { FieldState } from "../hooks/useFieldState";
import { Expression } from "../types/Expressions";

interface Props {
  expression?: Expression;
  player: number;
  fieldState: FieldState;
}

export default function PlayerDot(props: Props) {
  const row = props.expression
    ? allowedExpressions.indexOf(props.expression) + 1
    : 0;

  if (!props.expression) {
    return <div />;
  }

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
          boxShadow: `0 0 15px 3px ${
            props.player == 2 ? "#86E409" : "#5EFFF5"
          }`,
          opacity: props.expression ? 1 : 0,

          /*props.expression === props.fieldState.currentNote.expression
              ? `0 0 15px 10px ${props.player == 2 ? "#86E409" : "#5EFFF5"}`
              : `0 0 15px 0px ${props.player == 2 ? "#86E409" : "#5EFFF5"}`,
          */
        }}
        className={`${
          "row-start-" + row
        } justify-self-center self-center h-4 w-4 -ml-2 border-2 rounded-full ${
          props.player == 1 ? "border-player1" : "border-player2"
        } border-opacity-75 bg-blue-100 z-10`}
      />
    </div>
  );
}
