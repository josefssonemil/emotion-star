import { useEffect, useState } from "react";
import useSound from "use-sound";
import { Expression } from "../types/Expressions";
import useTimer from "./useTimer";

export default function useIdle(
    action: () => void, 
    //delay: number, 
    players: [Expression, Expression]
) {
    const delay = 5
    const timer = useTimer(delay);
    const [idle, setIdle] = useState(false);

    const [play] = useSound("/sound/bye.mp3", {
        volume: 1,
        playbackRate: 1,
    });

    useEffect(() => {
        players[0] == undefined && players[1] == undefined
            ? setIdle(true)
            : setIdle(false);
    }, [players]);

    useEffect(() => {
        if (idle && timer.seconds == 0) {
            timer.start();
        }
        if (!idle) {
            timer.reset();
        }
        if (idle && timer.seconds >= delay) {
            timer.reset();
            action();
            play();
        }
    }, [players, idle, delay, timer.seconds]);
}
