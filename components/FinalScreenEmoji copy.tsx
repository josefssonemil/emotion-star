import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { emojis } from "../config";
import { Expression } from "../types/Expressions";

interface Props {
    emoji: Expression;
    completed?: boolean;
    progress?: number;
}

export default function FinalScreenEmoji(props: Props) {

    return (
        <div className="relative flex items-center justify-center w-full h-full font-sans">
            <div className="absolute inset-0 flex items-center justify-center text-3xl">
                <div>{emojis[props.emoji]}</div>
            </div>
            <div
                className="w-10 h-10 rounded-full"
                style={props.completed ? { boxShadow: "0 0 15px #86e409" } : {}}
            >
                <CircularProgressbar
                    value={props.completed ? 100 : props.progress * 100}
                    styles={buildStyles({
                        // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
                        strokeLinecap: "round",

                        // How long animation takes to go from one percentage to another, in seconds
                        //pathTransitionDuration: 1,
                        pathTransition: "stroke-dashoffset 0.1s linear 0s",

                        // Colors
                        pathColor: `hsl(${props.completed ? 125 : props.progress * 86
                            }, 92%, 46%)`,
                        trailColor: "rgba(0,0,0,0)",
                    })}
                    strokeWidth={props.completed ? 15 : 8}
                />
            </div>
        </div>
    );

}