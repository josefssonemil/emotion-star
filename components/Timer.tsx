import React, { useState, useEffect } from "react";

const Timer = (props) => {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="">
      <header className="">
        {seconds} seconds have elapsed since mounting.
      </header>
    </div>
  );
};

export default Timer;
