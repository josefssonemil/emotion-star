import { useState, useEffect } from 'react';

export default function useTimer(maxCount: number) {


    const [seconds, setSeconds] = useState(0);
    const [isActive, setActive] = useState(false);

    function start() {
        setActive(true);
    }

    function reset() {
        setSeconds(0);
        setActive(false);
    }

    useEffect(() => {
        let interval = null;

        if (isActive && seconds <= maxCount) {
            interval = setTimeout(() => {
                setSeconds((seconds) => seconds + 1);
            }, 1000);
        }

        return () => clearTimeout(interval);
    }, [isActive, seconds, maxCount]);

    return { seconds, start, reset };
}