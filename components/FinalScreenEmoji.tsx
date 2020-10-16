import { motion } from "framer-motion";
import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { emojis } from "../config";
import { Expression } from "../types/Expressions";

interface Props {
    emoji: Expression;
    completed?: boolean;
    progress?: number;
    maxCount: number
}

export default function FinalScreenEmoji(props: Props) {
    

    return (
        <div className="relative flex items-center justify-center w-full font-sans">
            <motion.div 
                style={
                    { boxShadow: "0 0 15px 10px #FF00FF" }
                }
                animate={{
                    opacity: props.completed ? 1 : props.progress/props.maxCount
                }}
                className="w-6 h-6 rounded-full"
            />

            <motion.div 
                animate={{
                    opacity: props.completed ? 1 : 0.5 + 0.5*props.progress/props.maxCount,
                    scale: props.completed ? 1.3 : 1 + 0.3*props.progress/props.maxCount,
                }}
                style={
                    {fontSize: "1.8rem"}
                }
                className="absolute inset-0 flex items-center justify-center text-3xl rounded-full"
            >
                <div>{emojis[props.emoji]}</div>
            </motion.div>
        </div>
    );

}