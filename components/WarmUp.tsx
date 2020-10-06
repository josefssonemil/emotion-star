import { useEffect, useMemo, useState } from "react";
import useSound from "use-sound";
import useTimer from "../hooks/useTimer";
import { Expression } from "../types/Expressions";
import EmojiProgress from "./EmojiProgress";

interface Props {
  expression: Expression;
  onComplete: () => void;
}

const threshold = 2;

export default function WarmUp(props: Props) {
  const [play] = useSound("/sound/pop.mp3", {
    volume: 0.3,
    playbackRate: 1,
  });
  const [expressionStatus, setExpressionStatus] = useState({
    happy: false,
    angry: false,
    surprised: false,
    sad: false,
    neutral: false,
  });

  const [currentExpression, setCurrentExpression] = useState<Expression>(null);
  const timer = useTimer(threshold);

  useEffect(() => {
    if (props.expression !== currentExpression) {
      setCurrentExpression(props.expression);
      timer.start();
    }
  }, [props.expression, currentExpression]);

  useEffect(() => {
    if (timer.seconds >= threshold && currentExpression) {
      if (!expressionStatus[currentExpression]) {
        play();
      }

      setExpressionStatus((prevState) => ({
        ...prevState,
        [currentExpression]: true,
      }));

      setCurrentExpression(null);
      timer.reset();
    }
  }, [timer.seconds, currentExpression]);

  const count = useMemo(
    () => Object.values(expressionStatus).filter((value) => value).length,
    [expressionStatus]
  );

  useEffect(() => {
    if (count === 5) {
      props.onComplete();
    }
  }, [count, props.onComplete]);

  return (
    <div className="text-center">
      <div className="flex space-x-4">
        {Object.keys(expressionStatus).map((expression) => (
          <EmojiProgress
            key={expression}
            emoji={expression as Expression}
            completed={expressionStatus[expression]}
            progress={
              expression === currentExpression ? timer.seconds / threshold : 0
            }
          />
        ))}
      </div>
      <div className="mt-4 text-white text-2xl">{count} / 5</div>
    </div>
  );
}
