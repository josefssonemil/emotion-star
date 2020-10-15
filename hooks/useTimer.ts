import { useEffect, useRef, useState } from "react";

export default function useTimer(maxCount: number) {
  const startTimeRef = useRef<number>();
  const [seconds, setSeconds] = useState(0);
  const [isActive, setActive] = useState(false);

  function start() {
    setSeconds(0);
    setActive(true);
    startTimeRef.current = new Date().getTime();
  }

  function reset() {
    setSeconds(0);
    setActive(false);
    startTimeRef.current = undefined;
  }

  useEffect(() => {
    let interval = null;

    if (isActive && seconds <= maxCount) {
      interval = setTimeout(() => {
        setSeconds((seconds) => {
          const diff = startTimeRef.current
            ? new Date().getTime() - startTimeRef.current
            : 0;
          const result = diff / 1000;
          return result >= maxCount ? maxCount : result;
        });
      }, 100);
    }

    return () => clearTimeout(interval);
  }, [isActive, seconds, maxCount]);

  return { seconds, start, reset };
}
