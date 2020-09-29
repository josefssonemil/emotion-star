import { Expression } from "../../types/Expressions";
import { useEffect, useState } from 'react';

interface Props {
    players: Expression[]
}


const WarmUp = (props: Props) => {

    /* Could be merged into one? */
    const [faceCountOne, setFaceCountOne] = useState(0);


    const [faceCountTwo, setFaceCountTwo] = useState(0);


    useEffect(() => {
        /*
            TODO:
            1) Time face expression
            2) Update count of total expressions (x/5)
            3) Animate

        */

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