import { MutableRefObject, useEffect, useMemo, useState } from "react";
import useTimer from "../../hooks/useTimer";
import { Expression } from "../../types/Expressions";
import PlayerFace from "../PlayerFace";

interface Props {
  canvasLeftRef: MutableRefObject<HTMLCanvasElement>;
  canvasRightRef: MutableRefObject<HTMLCanvasElement>;
  players: Expression[];
  faceBoxes: any[];
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

  const [prevFace, setPrevFace] = useState(null);
  const [prevFaceTwo, setPrevFaceTwo] = useState(null);

  const faceCountOne = useMemo(
    () => Object.values(facesOne).filter((value) => value).length,
    [facesOne]
  );
  const faceCountTwo = useMemo(
    () => Object.values(facesTwo).filter((value) => value).length,
    [facesTwo]
  );

  const timerOne = useTimer(3);
  const timerTwo = useTimer(3);

  useEffect(() => {
    const faceOne = props.players[0];
    const faceTwo = props.players[1];

    // check if faces already have been achieved

    if (!facesOne[faceOne] && faceOne) {
      //start timer
      setPrevFace(faceOne);
      timerOne.start();

      if (prevFace == faceOne) {
        if (timerOne.seconds > 3) {
          setFacesOne((prevValue) => {
            return {
              ...prevValue,
              [faceOne]: true,
            };
          });
          timerOne.reset();
        }
      } else {
        timerOne.reset();
      }
    } else {
      setPrevFace(null);
    }

    // check if face is still active each call

    if (!facesTwo[faceTwo] && faceTwo) {
      //start timer
      setPrevFaceTwo(faceTwo);
      timerTwo.start();

      if (prevFaceTwo == faceTwo) {
        if (timerTwo.seconds > 3) {
          setFacesTwo((prevValue) => {
            return {
              ...prevValue,
              [faceTwo]: true,
            };
          });
          timerTwo.reset();
        }
      } else {
        timerTwo.reset();
      }
    } else {
      setPrevFaceTwo(null);
    }
  }, [props.players]);

  return (
    <div className="container mx-auto">
      <div className="flex flex-row justify-between">
        <h1 className="text-5xl">Practice your face expressions</h1>
        <h1 className="text-3xl">Team name: 🌭</h1>
      </div>

      <div className="mx-auto w-full flex flex-row justify-between">
        <div className="w-64">
          <PlayerFace
            canvasRef={props.canvasLeftRef}
            expression={props.players[0]}
            faceBox={props.faceBoxes[0]}
            constrainTo="width"
          />
        </div>

        <div className="w-64">
          <PlayerFace
            canvasRef={props.canvasRightRef}
            expression={props.players[1]}
            faceBox={props.faceBoxes[1]}
            constrainTo="width"
          />
        </div>
      </div>

      <div className="flex flex-row justify-between">
        <div className="flex flex-row justify-evenly items-center">
          <h1 className="text-4xl">{faceCountOne} / 5</h1>

          <h1 className="text-6xl">
            😄 😢 😡
            <br></br>
            😐 😮
          </h1>
        </div>

        <div className="flex flex-row justify-evenly items-center">
          <h1 className="text-4xl">{faceCountTwo} / 5</h1>

          <h1 className="text-6xl">
            😄 😢 😡
            <br></br>
            😐 😮
          </h1>
        </div>
      </div>

      <h1 className="text-5xl mx-auto text-center">
        FaceOne: {timerOne.seconds}, faceTwo: {timerTwo.seconds}
      </h1>

      <h1 className="text-5xl mx-auto text-center">
        Complete all emojis to continue
      </h1>
    </div>
  );
};

export default WarmUp;
