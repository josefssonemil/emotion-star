import { useEffect, useRef, useState } from "react";

interface ScoreState {
  value: number;
  noteUpdate: (player: number, isOnNote: boolean) => void;
  finishNote: (
    player: number,
    isPerfect: boolean,
    duration: number,
    totalIntervalDuration: number
  ) => void;
  bothOnNote: boolean;
}

export default function useScore(gameTime: number): ScoreState {
  const [value, setValue] = useState(0);
  const [bothOnNote, setBothOnNote] = useState(false);

  const isOnNoteRef = useRef([false, false]);

  const noteUpdate = (player: number, isOnNote: boolean) => {
    isOnNoteRef.current[player] = isOnNote;
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

    let both = false;
    let nextScore = 0;

    if (isOnNote[0]) {
      nextScore += 1;
    }

    if (isOnNote[1]) {
      nextScore += 1;
    }

    if (isOnNote[0] && isOnNote[1]) {
      both = true;
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
  };
}
