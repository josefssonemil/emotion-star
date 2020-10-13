import { useEffect, useState } from "react";

export default function useTimer(maxCount: number) {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setActive] = useState(false);

  function start() {
    setSeconds(0);
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
        setSeconds((seconds) => {
          const result = seconds + 0.1;
          return result >= maxCount ? maxCount : result;
        });
      }, 100);
    }

    return () => clearTimeout(interval);
  }, [isActive, seconds, maxCount]);

  return { seconds, start, reset };
}
