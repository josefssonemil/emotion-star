import { Expression } from "../types/Expressions";
import useTimer from './useTimer';
import { useEffect } from 'react';
import { useState } from 'react';

export default function useActiveExpression(expression: Expression) {

    const maxCount = 5;
    const timer = useTimer(maxCount);
    const [currentExpression, setCurrentExpression] = useState(expression);
    const [selectedExpression, setSelectedExpression] = useState(expression);

    useEffect(() => {
        if (expression !== currentExpression && timer.seconds == 0) {
            setSelectedExpression(expression);
            timer.start();
            console.log("starting timer");
        }
    }, [expression, currentExpression]);

    useEffect(() => {
        if (selectedExpression !== expression && timer.seconds > 0) {
            timer.reset();
            console.log("face changed during timer, stopping timer");
        }
    }, [selectedExpression, expression]);

    useEffect(() => {
        if (timer.seconds >= maxCount) {


            console.log(selectedExpression);
            console.log("expression change complete! stopping timer");
            timer.reset();
        }
    }, [timer.seconds, currentExpression]);

    return { selectedExpression, timer };
}



