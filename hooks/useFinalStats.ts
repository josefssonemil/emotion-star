import { useState } from "react";

export interface AccuracyObject {
  happy: number;
  angry: number;
  surprised: number;
  sad: number;
  neutral: number;
}

export interface FinalStats {
  accuracy: [AccuracyObject, AccuracyObject];
}

export default function useFinalStats() {
  const [accuracy, setAccuracy] = useState<[AccuracyObject, AccuracyObject]>([
    {
      happy: 0,
      angry: 0,
      surprised: 0,
      sad: 0,
      neutral: 0,
    },
    {
      happy: 0,
      angry: 0,
      surprised: 0,
      sad: 0,
      neutral: 0,
    },
  ]);

  const setData = (accuracy: [AccuracyObject, AccuracyObject]) => {
    setAccuracy(accuracy);
  };

  const results: FinalStats = { accuracy };

  return { results, setData };
}
