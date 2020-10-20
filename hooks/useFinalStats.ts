import { useMemo, useState } from "react";
import { ExpressionInterval } from "./useExpressionHistory";

export interface AccuracyObject {
  happy: number;
  angry: number;
  surprised: number;
  sad: number;
  neutral: number;
}

export interface TimePerExpressionObject {}

export interface FinalStatsData {
  accuracy: [AccuracyObject, AccuracyObject];
  expressionHistory: [ExpressionInterval[], ExpressionInterval[]];
  score: number;
}

export interface FinalStats {
  accuracy: [AccuracyObject, AccuracyObject];
  timePerExpression: [TimePerExpressionObject, TimePerExpressionObject];
  score: number;
  teamAccuracy: AccuracyObject;
}

const defaults = { happy: 0, angry: 0, surprised: 0, sad: 0, neutral: 0 };

export default function useFinalStats() {
  const [accuracy, setAccuracy] = useState<[AccuracyObject, AccuracyObject]>([
    { ...defaults },
    { ...defaults },
  ]);

  const [timePerExpression, setTimePerExpression] = useState<
    [TimePerExpressionObject, TimePerExpressionObject]
  >([
    {
      ...defaults,
    },
    { ...defaults },
  ]);
  const [score, setScore] = useState(0);

  const setData = (data: FinalStatsData) => {
    setAccuracy(data.accuracy);

    setScore(data.score);

    calculateTimePerExpression(0, data.expressionHistory[0]);
    calculateTimePerExpression(1, data.expressionHistory[1]);
  };

  const calculateTimePerExpression = (index, history) => {
    const result: TimePerExpressionObject = {};

    setTimePerExpression((prevState) => {
      const values = [...prevState] as [
        TimePerExpressionObject,
        TimePerExpressionObject
      ];

      values[index] = result;

      return values;
    });
  };

  const teamAccuracy = useMemo(() => {
    const result = {
      ...accuracy[0],
    };

    Object.keys(result).forEach((key) => {
      result[key] = (result[key] + accuracy[1]) / 2;
    });

    return result;
  }, [accuracy]);

  const results: FinalStats = {
    accuracy,
    timePerExpression,
    score,
    teamAccuracy,
  };

  return { results, setData };
}
