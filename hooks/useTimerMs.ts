import { useState, useEffect } from "react";

export default function useTimer(maxCount: number) {
  const [milliSeconds, setMilliSeconds] = useState(0);
  const [isActive, setActive] = useState(false);

  function start() {
    setActive(true);
  }

  function reset() {
    setMilliSeconds(0);
    setActive(false);
  }

  useEffect(() => {
    let interval = null;

    if (isActive && milliSeconds <= maxCount) {
      interval = setTimeout(() => {
        setMilliSeconds((milliSeconds) => milliSeconds + 1);
      }, 1);
    }

    return () => clearTimeout(interval);
  }, [isActive, milliSeconds, maxCount]);

  return { milliSeconds, start, reset };
}
