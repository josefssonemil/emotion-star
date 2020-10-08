import { useMemo } from "react";
import { Expression } from "../types/Expressions";
import { Note } from "../types/Level";
import useTimer from "./useTimer";

export default function useGameLoop(
  duration: number,
  notes: [Note[], Note[]],
  players: [Expression, Expression]
) {
  const notesWithStartValues = useMemo(
    () => [calculateStartValues(notes[0]), calculateStartValues(notes[1])],
    [notes]
  );

  const timer = useTimer(duration);
  const progress = timer.seconds / duration;

  return {
    start: timer.start,
    offset: [0, 0],
    notes: notesWithStartValues,
    time: timer.seconds,
    progress,
  };
}

function calculateStartValues(notes: Note[]) {
  let sum = 0;

  return notes.map((note) => {
    sum += note.duration;

    return {
      ...note,
      start: sum - note.duration,
    };
  });
}
