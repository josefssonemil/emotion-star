import { Expression } from "../types/Expressions";
import { Note } from "../types/Level";
import useFieldState from "./useFieldState";
import useTimer from "./useTimer";

export default function useGameLoop(
  duration: number,
  notes: [Note[], Note[]],
  players: [Expression, Expression]
) {
  const timer = useTimer(duration);
  const progress = timer.seconds / duration;

  const fieldState = [
    useFieldState(timer.seconds, notes[0]),
    useFieldState(timer.seconds, notes[1]),
  ];

  return {
    progress,
    start: timer.start,
    fieldState,
    time: timer.seconds,
  };
}
