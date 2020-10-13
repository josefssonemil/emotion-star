import { useEffect, useMemo, useState } from "react";
import { gameConstants } from "../config";
import { Note } from "../types/Level";

export interface FieldState {
  notes: Note[];
  currentIndex: number;
  currentNote: Note;
}

export default function useFieldState(
  gameTime: number,
  notes: Note[]
): FieldState {
  const [currentIndex, setCurrentIndex] = useState(0);
  const notesWithStartValues = useMemo(() => calculateStartValues(notes), [
    notes,
  ]);

  useEffect(() => {
    if (currentIndex > notesWithStartValues.length - 1) {
      return;
    }

    const currentNote = notesWithStartValues[currentIndex];

    if (
      gameTime + gameConstants.historyDuration >=
      currentNote.start + currentNote.duration
    ) {
      setCurrentIndex((previousIndex) => {
        if (previousIndex <= notesWithStartValues.length - 1) {
          return previousIndex + 1;
        }

        return previousIndex;
      });
    }
  }, [gameTime, currentIndex, notesWithStartValues]);

  return {
    notes: notesWithStartValues,
    currentIndex,
    currentNote:
      currentIndex <= notesWithStartValues.length - 1
        ? notesWithStartValues[currentIndex]
        : undefined,
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
