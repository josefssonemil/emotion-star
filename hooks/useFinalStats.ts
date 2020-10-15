import { useState } from "react";
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
}

export interface FinalStats {
  accuracy: [AccuracyObject, AccuracyObject];
  timePerExpression: [TimePerExpressionObject, TimePerExpressionObject];
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

  const setData = (data: FinalStatsData) => {
    setAccuracy(data.accuracy);

    calculateTimePerExpression(0, data.expressionHistory[0]);
    calculateTimePerExpression(1, data.expressionHistory[1]);
  };

  const calculateTimePerExpression = (
    index: number,
    history: ExpressionInterval[]
  ) => {
    const result: TimePerExpressionObject = {};

    history.forEach((item) => {
      if (!result[item.expression]) {
        result[item.expression] = 0;
      }

      if (item.stopTime) {
        result[item.expression] += item.stopTime - item.startTime;
      }
    });

    console.log(result);

    setTimePerExpression((prevState) => {
      const values = [...prevState] as [
        TimePerExpressionObject,
        TimePerExpressionObject
      ];

      values[index] = result;

      return values;
    });
  };

  const results: FinalStats = { accuracy, timePerExpression };

  return { results, setData };
}
