import { useEffect, useMemo, useState } from "react";
import useTimer from "../hooks/useTimer";
import { Expression } from "../types/Expressions";
import EmojiProgress from "./EmojiProgress";

interface Props {
  expression: Expression;
  onComplete: () => void;
}

export default function WarmUp(props: Props) {
  const [expressionStatus, setExpressionStatus] = useState({
    happy: false,
    angry: false,
    surprised: false,
    sad: false,
    neutral: false,
  });

  const [currentExpression, setCurrentExpression] = useState<Expression>(null);
  const timer = useTimer(3);

  useEffect(() => {
    if (props.expression !== currentExpression) {
      setCurrentExpression(props.expression);
      timer.start();
    }
  }, [props.expression, currentExpression]);

  useEffect(() => {
    if (timer.seconds === 3 && currentExpression) {
      setCurrentExpression(null);
      timer.reset();
      /*setExpressionStatus({
        ...
      })*/
    }
  }, [timer.seconds, currentExpression]);

  const count = useMemo(
    () => Object.values(expressionStatus).filter((value) => value).length,
    [expressionStatus]
  );

  return (
    <div className="text-center">
      <div className="flex space-x-4">
        {Object.keys(expressionStatus).map((expression) => (
          <EmojiProgress
            key={expression}
            emoji={expression as Expression}
            completed={expressionStatus[expression]}
            progress={expression === currentExpression ? timer.seconds : 0}
          />
        ))}
      </div>
      <div className="mt-4 text-white text-2xl">{count} / 5</div>
    </div>
  );
}
