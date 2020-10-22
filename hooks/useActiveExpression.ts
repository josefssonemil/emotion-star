import { useEffect, useState } from "react";
import { Expression } from "../types/Expressions";
import useTimer from "./useTimer";

export default function useActiveExpression(
  expression: Expression,
  maxCount: number
) {
  const timer = useTimer(maxCount);
  const [currentExpression, setCurrentExpression] = useState<Expression>();
  const [selectedExpression, setSelectedExpression] = useState<Expression>();

  // When the player's expression is not the current expression
  //  => start timer and set current expression
  useEffect(() => {
    if (expression !== currentExpression) {
      setCurrentExpression(expression);
      timer.start();
    }
  }, [expression, currentExpression]);

  // When the timer is done
  //  => set the selected timer
  useEffect(() => {
    if (timer.seconds >= maxCount) {
      setSelectedExpression(currentExpression);
      timer.reset();
    }
  }, [timer.seconds, maxCount, currentExpression]);

  return { selectedExpression, timer, currentExpression };
}
