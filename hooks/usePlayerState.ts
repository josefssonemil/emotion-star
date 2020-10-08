import { useEffect, useRef, useState } from "react";
import { Expression } from "../types/Expressions";
import { Note } from "../types/Level";

interface ExpressionInterval {
  startTime: number;
  stopTime?: number;
  duration?: number;
  expression: Expression;
}

export interface NoteState {
  isPerfect: boolean;
  intervals: Array<{
    start: number;
    stop?: number;
  }>;
}

export interface PlayerState {
  score: number;
  history: ExpressionInterval[];
  noteState: NoteState[];
}

export default function usePlayerState(
  gameTime: number,
  expression: Expression,
  currentIndex: number,
  currentNote: Note,
  finished: boolean
): PlayerState {
  const [score, setScore] = useState(0);
  const [history, setHistory] = useState<ExpressionInterval[]>([]);
  const [noteState, setNoteState] = useState<NoteState[]>([]);

  // Track reference to game state for easy access
  const noteStateRef = useRef(noteState);
  noteStateRef.current = noteState;

  // Track reference to game time for easy access
  const gameTimeRef = useRef(gameTime);
  gameTimeRef.current = gameTime;

  // Log the expression to the history
  useEffect(() => {
    setHistory((prevState) => {
      const lastItem = prevState.length
        ? prevState[prevState.length - 1]
        : undefined;

      // Expression didn't change
      if (lastItem && lastItem.expression === expression) {
        return prevState;
      }

      const items = [...prevState];

      // Finish last item
      if (lastItem) {
        const newLastItem = { ...lastItem };
        newLastItem.stopTime = gameTimeRef.current;
        newLastItem.duration = newLastItem.stopTime - newLastItem.startTime;
        items[prevState.length - 1] = newLastItem;
      }

      // Add the new expression
      if (!finished && expression) {
        items.push({
          expression,
          startTime: gameTimeRef.current,
        });
      }

      return items;
    });
  }, [expression, finished]);

  // Track the current note
  useEffect(() => {}, [currentIndex, currentNote, expression, finished]);

  return {
    score,
    history,
    noteState,
  };
}
