import { Expression } from "../types/Expressions";
import { Note } from "../types/Level";
import useFieldState from "./useFieldState";
import usePlayerState from "./usePlayerState";
import useTimer from "./useTimer";

export default function useGameLoop(
  duration: number,
  notes: [Note[], Note[]],
  players: [Expression, Expression]
) {
  const timer = useTimer(duration);
  const progress = timer.seconds / duration;

  // Movement the notes in the level field
  const fieldState = [
    useFieldState(timer.seconds, notes[0]),
    useFieldState(timer.seconds, notes[1]),
  ];

  // Score keeping for the player
  const playerState = [
    usePlayerState(
      timer.seconds,
      players[0],
      fieldState[0].currentIndex,
      fieldState[0].currentNote,
      progress === 1
    ),

    usePlayerState(
      timer.seconds,
      players[1],
      fieldState[1].currentIndex,
      fieldState[1].currentNote,
      progress === 1
    ),
  ];

  const score = playerState[0].score + playerState[1].score;

  return {
    score,
    fieldState,
    playerState,
    progress,
    time: timer.seconds,
    start: timer.start,
  };
}
