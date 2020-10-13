import { useEffect, useRef, useState } from "react";
import { gameConstants } from "../config";
import { Expression } from "../types/Expressions";
import { Note } from "../types/Level";

export interface NoteState {
  isPerfect: boolean;
  intervals: Array<{
    start: number;
    stop?: number;
  }>;
}

export default function useNoteState(
  gameTime: number,
  expression: Expression,
  currentIndex: number,
  currentNote: Note,
  noteUpdate: (isOnNote: boolean) => void,
  finishNote: (
    isPerfect: boolean,
    duration: number,
    totalIntervalDuration: number
  ) => void
): NoteState[] {
  const lastNoteRef = useRef<Note>();
  const [noteState, setNoteState] = useState<NoteState[]>([]);

  const currentNoteRef = useRef(currentNote);
  currentNoteRef.current = currentNote;

  // Track reference to game time for easy access
  const gameTimeRef = useRef(gameTime);
  gameTimeRef.current = gameTime;

  // Track the current note
  useEffect(() => {
    setNoteState((prevState) => {
      if (!currentNote || !currentNote.expression) {
        return prevState;
      }

      let current = prevState[currentIndex];

      // The note just became the current one, create an empty object
      if (!current) {
        current = {
          isPerfect: false,
          intervals: [],
        };
      } else {
        current.intervals = [...current.intervals];
      }

      const isCorrect = currentNote.expression === expression;
      const playerDotTime = gameTimeRef.current + gameConstants.historyDuration;

      let lastInterval = current.intervals[current.intervals.length - 1];
      let changed = false;

      noteUpdate(isCorrect);

      if (isCorrect) {
        // Currently correct but has no ongoing interval
        if (!lastInterval || lastInterval.stop) {
          // Was this the first interval and we started on/before time?
          const diff = playerDotTime - currentNote.start;

          current.isPerfect = !lastInterval && diff < 0.5;

          let start = current.isPerfect
            ? 0
            : Math.max(playerDotTime - currentNote.start, 0);

          if (start < 0) {
            start = 0;
          }

          // Start new interval
          current.intervals.push({
            start,
          });

          changed = true;
        }
      } else {
        // Currently incorrect and has an ongoing interval
        if (lastInterval && !lastInterval.stop) {
          // Stop old interval
          lastInterval = { ...lastInterval };

          lastInterval.stop = Math.min(
            playerDotTime - currentNote.start,
            currentNote.duration
          );

          current.intervals[current.intervals.length - 1] = lastInterval;
          current.isPerfect = false;
          changed = true;
        }
      }

      if (!changed) {
        return prevState;
      }

      const items = [...prevState];
      items[currentIndex] = current;
      return items;
    });
  }, [currentIndex, currentNote, expression]);

  // Finish off previous note
  useEffect(() => {
    const prevIndex = currentIndex - 1;

    if (prevIndex < 0 || !lastNoteRef.current?.expression) {
      lastNoteRef.current = currentNoteRef.current;
      return;
    }

    setNoteState((prevState) => {
      if (!prevState[prevIndex]) {
        if (lastNoteRef.current) {
          finishNote(false, lastNoteRef.current.duration, 0);
        }

        noteUpdate(false);

        return prevState;
      }

      const values = [...prevState];
      const intervals = values[prevIndex]
        ? [...values[prevIndex].intervals]
        : [];

      const lastInterval = intervals[intervals.length - 1];

      if (intervals.length && !lastInterval.stop && lastNoteRef.current) {
        lastInterval.stop = lastNoteRef.current.duration;
      }

      values[prevIndex].intervals = intervals;

      if (lastNoteRef.current) {
        const totalIntervalDuration = intervals
          .map((interval) => interval.stop - interval.start)
          .reduce((a, b) => a + b, 0);

        finishNote(
          values[prevIndex].isPerfect,
          lastNoteRef.current.duration,
          totalIntervalDuration
        );
      }

      lastNoteRef.current = currentNoteRef.current;

      return values;
    });
  }, [currentIndex]);

  return noteState;
}
