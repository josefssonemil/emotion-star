import { Expression } from "../types/Expressions";
import { Note } from "../types/Level";
import useExpressionHistory from "./useExpressionHistory";
import useFieldState, { FieldState } from "./useFieldState";
import useNoteState, { NoteState } from "./useNoteState";
import useScore from "./useScore";
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

  const score = useScore(timer.seconds);

  // Note state per player
  const noteState: [NoteState[], NoteState[]] = [
    useNoteState(
      timer.seconds,
      players[0],
      fieldState[0].currentIndex,
      fieldState[0].currentNote,
      (isOnNote) => score.noteUpdate(0, isOnNote, !!fieldState[0].currentNote),
      (isPerfect, note, totalIntervalDuration) =>
        score.finishNote(0, isPerfect, note, totalIntervalDuration)
    ),

    useNoteState(
      timer.seconds,
      players[1],
      fieldState[1].currentIndex,
      fieldState[1].currentNote,
      (isOnNote) => score.noteUpdate(1, isOnNote, !!fieldState[1].currentNote),
      (isPerfect, note, totalIntervalDuration) =>
        score.finishNote(1, isPerfect, note, totalIntervalDuration)
    ),
  ];

  // Expression history per player
  const expressionHistory = [
    useExpressionHistory(timer.seconds, players[0], finished),
    useExpressionHistory(timer.seconds, players[1], finished),
  ];

  return {
    finished,
    score: score.value,
    fieldState,
    expressionHistory,
    noteState,
    progress,
    rollingSuccessRate: score.rollingSuccessRate,
    time: timer.seconds,
    start: timer.start,
  };
}
