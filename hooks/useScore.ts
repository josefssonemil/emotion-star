import { useEffect, useRef, useState } from "react";
import { Note } from "../types/Level";
import useExpressionAccuracy from "./useExpressionAccuracy";

const ROLLING_SUCCESS_EFFECT = 0.01;

export default function useScore(gameTime: number) {
  const [value, setValue] = useState(0);
  const [bothOnNote, setBothOnNote] = useState(false);
  const [rollingSuccessRate, setRollingSuccessRate] = useState(1);
  const accuracy = [useExpressionAccuracy(), useExpressionAccuracy()];

  const isOnNoteRef = useRef([false, false]);
  const hasNoteRef = useRef([false, false]);

  const noteUpdate = (player: number, isOnNote: boolean, hasNote: boolean) => {
    isOnNoteRef.current[player] = isOnNote;
    hasNoteRef.current[player] = hasNote;
  };

  const finishNote = (
    player: number,
    isPerfect: boolean,
    note: Note,
    totalIntervalDuration: number
  ) => {
    if (isPerfect) {
      setValue((v) => v + note.duration * 10);
    }

    accuracy[player].addNote(
      note.expression,
      note.duration,
      totalIntervalDuration
    );
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

    if (hasNote[0] && isOnNote[0]) {
      nextScore += 1;
    }

    if (hasNote[1] && isOnNote[1]) {
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
    accuracy: accuracy.map((item) => item.accuracy),
  };
}
