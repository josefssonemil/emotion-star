import { useEffect, useRef, useState } from "react";

const ROLLING_SUCCESS_EFFECT = 0.05;

interface ScoreState {
  value: number;
  noteUpdate: (player: number, isOnNote: boolean, hasNote: boolean) => void;
  finishNote: (
    player: number,
    isPerfect: boolean,
    duration: number,
    totalIntervalDuration: number
  ) => void;
  bothOnNote: boolean;
  rollingSuccessRate: number;
}

export default function useScore(gameTime: number): ScoreState {
  const [value, setValue] = useState(0);
  const [bothOnNote, setBothOnNote] = useState(false);
  const [rollingSuccessRate, setRollingSuccessRate] = useState(1);

  const isOnNoteRef = useRef([false, false]);
  const hasNoteRef = useRef([false, false]);

  const noteUpdate = (player: number, isOnNote: boolean, hasNote: boolean) => {
    isOnNoteRef.current[player] = isOnNote;
    hasNoteRef.current[player] = hasNote;
  };

  const finishNote = (
    player: number,
    isPerfect: boolean,
    duration: number,
    totalIntervalDuration: number
  ) => {
    if (isPerfect) {
      setValue((v) => v + duration * 10);
    }
  };

  useEffect(() => {
    const isOnNote = isOnNoteRef.current;
    const hasNote = hasNoteRef.current;
    let both = isOnNote[0] && isOnNote[1];

    // Rolling success rate
    let nextRollingSuccessRate = 0;

    if (hasNote[0]) {
      if (isOnNote[0]) {
        nextRollingSuccessRate += 4 * ROLLING_SUCCESS_EFFECT;
      } else {
        nextRollingSuccessRate -= ROLLING_SUCCESS_EFFECT;
      }
    }

    if (hasNote[1]) {
      if (isOnNote[1]) {
        nextRollingSuccessRate += 4 * ROLLING_SUCCESS_EFFECT;
      } else {
        nextRollingSuccessRate -= ROLLING_SUCCESS_EFFECT;
      }
    }

    setRollingSuccessRate((r) => {
      let newValue = r + nextRollingSuccessRate;

      if (newValue > 1) {
        return 1;
      }

      if (newValue < 0) {
        return 0;
      }

      return newValue;
    });

    // Update score
    let nextScore = 0;

    if (isOnNote[0]) {
      nextScore += 1;
    }

    if (isOnNote[1]) {
      nextScore += 1;
    }

    if (both) {
      nextScore *= 2;
    }

    setValue((v) => v + nextScore);
    setBothOnNote(both);
  }, [gameTime]);

  return {
    value,
    noteUpdate,
    finishNote,
    bothOnNote,
    rollingSuccessRate,
  };
}
