import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { emojis } from "../config";
import { Expression } from "../types/Expressions";

interface Props {
  emoji?: Expression;
  completed?: boolean;
  progress?: number;
}

export default function EmojiProgress(props: Props) {
  return (
    <div className="w-full h-full relative flex justify-center items-center font-sans">
      <div className="absolute inset-0 flex justify-center items-center text-6xl">
        <div>{emojis[props.emoji]}</div>
      </div>
      <div className="w-20 h-20">
        <CircularProgressbar
          value={props.completed ? 100 : props.progress * 100}
          styles={buildStyles({
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: "but",

            // How long animation takes to go from one percentage to another, in seconds
            //pathTransitionDuration: 1,
            pathTransition: "stroke-dashoffset 0.1s linear 0s",

            // Colors
            pathColor: `hsl(${
              props.completed ? 125 : props.progress * 75
            }, 100%, 50%)`,
            trailColor: "rgba(0,0,0,0)",
          })}
          strokeWidth={props.completed ? 10 : 7}
        />
      </div>
    </div>
  );
}
