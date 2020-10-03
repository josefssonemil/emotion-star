import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import { emojis } from "../config";
import { Expression } from "../types/Expressions";

interface Props {
  emoji?: Expression;
}

export default function EmojiProgress(props) {
  return (
    <div className="w-full h-full relative flex justify-center items-center">
      <div className="absolute inset-0 flex justify-center items-center text-6xl">
        <div>{emojis[props.emoji]}</div>
      </div>
      <div className="w-20 h-20 rounded-full shadow-pinkBlur">
        <CircularProgressbar
          value={props.expression ? 100 : (props.timer * 100) / 3}
          styles={buildStyles({
            // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
            strokeLinecap: "but",

            // How long animation takes to go from one percentage to another, in seconds
            //pathTransitionDuration: 1,
            pathTransition: "stroke-dashoffset 0.1s linear 0s",

            // Colors
            pathColor: `hsl(${
              props.expression ? 125 : (props.timer / 3) * 75
            }, 100%, 50%)`,
            trailColor: "rgba(0,0,0,0)",
          })}
          strokeWidth={props.expression ? 10 : 9}
        />
      </div>
    </div>
  );
}
