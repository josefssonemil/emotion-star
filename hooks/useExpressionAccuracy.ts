import { useMemo, useState } from "react";
import { Expression } from "../types/Expressions";
import { AccuracyObject } from "./useFinalStats";

interface State {
  accuracy: AccuracyObject;
  addNote: (
    expression: Expression,
    duration: number,
    hitDuration: number
  ) => void;
}

export default function useExpressionAccuracy(): State {
  const [hitDurations, setHitDurations] = useState<AccuracyObject>({
    happy: 0,
    angry: 0,
    surprised: 0,
    sad: 0,
    neutral: 0,
  });
  const [totalDurations, setTotalDurations] = useState<AccuracyObject>({
    happy: 0,
    angry: 0,
    surprised: 0,
    sad: 0,
    neutral: 0,
  });

  const accuracy = useMemo<AccuracyObject>(() => {
    const keys = Object.keys(hitDurations);

    let result = {};

    keys.forEach((key) => {
      if (totalDurations[key]) {
        result[key] = hitDurations[key] / totalDurations[key];
      } else {
        result[key] = 1;
      }
    });

    return result as AccuracyObject;
  }, [hitDurations, totalDurations]);

  const addNote = (
    expression: Expression,
    duration: number,
    hitDuration: number
  ) => {
    setHitDurations((prevValue) => {
      return {
        ...prevValue,
        [expression]: prevValue[expression] + hitDuration,
      };
    });

    setTotalDurations((prevValue) => {
      return {
        ...prevValue,
        [expression]: prevValue[expression] + duration,
      };
    });
  };

  return { accuracy, addNote };
}
