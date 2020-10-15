import { Expression } from "../types/Expressions";
import useTimer from './useTimer';
import { useEffect } from 'react';
import { useState } from 'react';

export default function useActiveExpression(expression: Expression) {

    const maxCount = 2;
    const timer = useTimer(maxCount);
    const [currentExpression, setCurrentExpression] = useState(expression);
    const [selectedExpression, setSelectedExpression] = useState(expression);

    useEffect(() => {
        if (expression !== selectedExpression && timer.seconds == 0) {
            setCurrentExpression(expression);
            timer.start();
            console.log("starting timer");
        }
    }, [expression, selectedExpression]);

    useEffect(() => {
        if (currentExpression !== expression && timer.seconds > 0) {
            timer.reset();
            console.log("stopping timer");
        }
    }, [currentExpression, expression]);

    useEffect(() => {
        if (timer.seconds >= maxCount) {
            setCurrentExpression(null);
            setSelectedExpression(currentExpression);
            console.log("expression changed! stopping timer");
            timer.reset();
        }
    }, [timer.seconds, currentExpression]);

    return selectedExpression;
}



