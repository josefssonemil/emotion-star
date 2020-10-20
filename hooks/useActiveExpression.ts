import { useEffect, useState } from "react";
import { Expression } from "../types/Expressions";
import useTimer from "./useTimer";

export default function useActiveExpression(
  expression: Expression,
  maxCount: number
) {
  const timer = useTimer(maxCount);
  const [currentExpression, setCurrentExpression] = useState(undefined);
  const [selectedExpression, setSelectedExpression] = useState(undefined);

  useEffect(() => {
    if (expression !== currentExpression && timer.seconds == 0) {
      setCurrentExpression(expression);
      timer.start();
      //console.log("starting timer");
    }
  }, [expression, currentExpression, timer.seconds]);

  useEffect(() => {
    if (currentExpression !== expression && timer.seconds > 0) {
      setCurrentExpression(expression);
      timer.reset();
      //console.log("face changed during timer, stopping timer");
    }
  }, [expression, currentExpression, timer.seconds]);

  useEffect(() => {
    if (timer.seconds >= maxCount) {
      setSelectedExpression(expression);
      //console.log(selectedExpression);
      //console.log("expression change complete! stopping timer");
      timer.reset();
    }
  }, [timer.seconds, currentExpression, maxCount]);

  return { selectedExpression, timer, currentExpression };
