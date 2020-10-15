import { Expression } from "../types/Expressions";
import useTimer from './useTimer';
import { useEffect } from 'react';
import { useState } from 'react';

export default function useActiveExpression(expression: Expression) {

    const maxCount = 3;
    const timer = useTimer(maxCount);
    const [faceDone, setFaceDone] = useState(false);

    const [firstExpression, setFirstExpression] = useState(expression);

    const [currentExpression, setCurrentExpression] = useState(firstExpression);


    useEffect(() => {
        setCurrentExpression(expression);
    }, [])


    useEffect(() => {




        return () => {

        }
    }, [expression])

    return expression;
}



/*
Default state: current expression

if new expression detected {
    start timer
        om nytt expression kvar under varje tick -> fortsätt
            om nytt expression kvar efter tid -> return nytt expression
        om nytt expression borta -> cancel
            -> return gammalt expression
}

*/