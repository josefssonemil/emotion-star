import { Expression } from "../../types/Expressions";
import { useEffect, useMemo, useState } from 'react';

interface Props {
    players: Expression[]
}

const WarmUp = (props: Props) => {

    /* Could be merged into one? */
    const [facesOne, setFacesOne] = useState({
        happy: false,
        angry: false,
        surprised: false,
        sad: false,
        neutral: false,
    });

    const [facesTwo, setFacesTwo] = useState({
        happy: false,
        angry: false,
        surprised: false,
        sad: false,
        neutral: false,
    });

    const faceCountOne = useMemo(() => Object.values(facesOne).filter(value => value).length, [facesOne]);
    const faceCountTwo = useMemo(() => Object.values(facesTwo).filter(value => value).length, [facesTwo]);

    console.log("Faces one:", facesOne, "Face two", facesTwo);


    useEffect(() => {

        /*
            TODO:

            1) Time face expression
            2) Update count of total expressions (x/5)
            3) Animate
    
        */

        const faceOne = props.players[0];
        const faceTwo = props.players[1];

        // check if faces already have been achieved

        if (!facesOne[faceOne] && faceOne) {
            //start timer

            // check if face is still active each call

            setFacesOne(prevValue => {
                return {
                    ...prevValue,
                    [faceOne]: true
                }
            });


        }

        if (!facesTwo[faceTwo] && faceTwo) {
            setFacesOne(prevValue => {
                return {
                    ...prevValue,
                    [faceTwo]: true
                }
            });
        }





    }, [props.players]);


    return (
        <div className="container mx-auto">
            <div className="flex flex-row justify-between">
                <h1 className="text-5xl">Practice your face expressions</h1>
                <h1 className="text-3xl">Team name: 🌭</h1>
            </div>


            <div className="mx-auto bg-gray-800 w-full h-64">
                Video Placeholder
        </div>

            <div className="flex flex-row justify-between">


                <div className="flex flex-row justify-evenly items-center">
                    <h1 className="text-4xl">{faceCountOne} / 5</h1>

                    <h1 className="text-6xl">
                        😄
                        😢
                        😡
                    <br></br>

                    😐
                    😮
                </h1>
                </div>

                <div className="flex flex-row justify-evenly items-center">
                    <h1 className="text-4xl">{faceCountTwo} / 5</h1>

                    <h1 className="text-6xl">
                        😄
                        😢
                        😡
                    <br></br>

                    😐
                    😮
                </h1>
                </div>


            </div>



            <h1 className="text-5xl mx-auto text-center">Complete all emojis to continue</h1>

        </div>

    );
}

export default WarmUp;