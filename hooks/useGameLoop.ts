import { Expression } from "../types/Expressions";
import { Note } from "../types/Level";
import useExpressionHistory from "./useExpressionHistory";
import useFieldState, { FieldState } from "./useFieldState";
import useNoteState, { NoteState } from "./useNoteState";
import useTimer from "./useTimer";

export default function useGameLoop(
  duration: number,
  notes: [Note[], Note[]],
  players: [Expression, Expression]
) {
  const timer = useTimer(duration);
  const progress = timer.seconds / duration;
  const finished = progress === 1;

  // Movement the notes in the level field
  const fieldState: [FieldState, FieldState] = [
    useFieldState(timer.seconds, notes[0]),
    useFieldState(timer.seconds, notes[1]),
  ];

  // Note state per player
  const noteState: [NoteState[], NoteState[]] = [
    useNoteState(
      timer.seconds,
      players[0],
      fieldState[0].currentIndex,
      fieldState[0].currentNote
    ),

    useNoteState(
      timer.seconds,
      players[1],
      fieldState[1].currentIndex,
      fieldState[1].currentNote
    ),
  ];

  // Expression history per player
  const expressionHistory = [
    useExpressionHistory(timer.seconds, players[0], finished),
    useExpressionHistory(timer.seconds, players[1], finished),
  ];

  // todo...
  const score = 0;

  return {
    finished,
    score,
    fieldState,
    expressionHistory,
    noteState,
    progress,
    time: timer.seconds,
    start: timer.start,
  };
}
