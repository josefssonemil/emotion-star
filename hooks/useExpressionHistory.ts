import { useEffect, useRef, useState } from "react";
import { Expression } from "../types/Expressions";

export interface ExpressionInterval {
  startTime: number;
  stopTime?: number;
  duration?: number;
  expression: Expression;
}

export default function useExpressionHistory(
  gameTime: number,
  expression: Expression,
  finished: boolean
): ExpressionInterval[] {
  const [history, setHistory] = useState<ExpressionInterval[]>([]);

  // Track reference to game time for easy access
  const gameTimeRef = useRef(gameTime);
  gameTimeRef.current = gameTime;

  // Log the expression to the history
  useEffect(() => {
    setHistory((prevState) => {
      let lastItem = prevState[prevState.length - 1];

      // Expression didn't change
      if (lastItem && lastItem.expression === expression) {
        return prevState;
      }

      const items = [...prevState];

      // Finish last item
      if (lastItem) {
        lastItem = { ...lastItem };
        lastItem.stopTime = gameTimeRef.current;
        lastItem.duration = lastItem.stopTime - lastItem.startTime;
        items[prevState.length - 1] = lastItem;
      }

      // Add the new expression
      if (!finished && expression) {
        items.push({
          expression,
          startTime: gameTimeRef.current,
        });
      }

      return items;
    });
  }, [expression, finished]);

  return history;
}
