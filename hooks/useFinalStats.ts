import { useMemo, useState } from "react";
import { ExpressionInterval } from "./useExpressionHistory";

export interface AccuracyObject {
  happy: number;
  angry: number;
  surprised: number;
  sad: number;
  neutral: number;
}

export interface TimePerExpressionObject {
  happy: number;
  angry: number;
  surprised: number;
  sad: number;
  neutral: number;
}

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

  const calculateTimePerExpression = (index, history: ExpressionInterval[]) => {
    const result: TimePerExpressionObject = {
      ...defaults,
    };

    history.forEach((entry) => {
      if (entry.duration) {
        if (!result[entry.expression]) {
          result[entry.expression] = 0;
        }

        result[entry.expression] += entry.duration;
      }
    });

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
      happy: 0,
      angry: 0,
      surprised: 0,
      sad: 0,
      neutral: 0,
    };

    Object.keys(result).forEach((key) => {
      const p1 = accuracy[0][key] || 0;
      const p2 = accuracy[1][key] || 0;
      result[key] = (p1 + p2) / 2;
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
