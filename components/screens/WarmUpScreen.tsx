import { MutableRefObject, useEffect, useMemo, useState } from "react";
import useTimer from "../../hooks/useTimer";
import { Expression } from "../../types/Expressions";
import PlayerFace from "../PlayerFace";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

interface Props {
  canvasLeftRef: MutableRefObject<HTMLCanvasElement>;
  canvasRightRef: MutableRefObject<HTMLCanvasElement>;
  players: Expression[];
  faceBoxes: any[];
}

const styles = buildStyles({
  // Whether to use rounded or flat corners on the ends - can use 'butt' or 'round'
  strokeLinecap: "but",

  // How long animation takes to go from one percentage to another, in seconds
  pathTransitionDuration: 0.5,

  // Colors
  pathColor: `rgba(20, 255, 0, ${66 / 100})`,
  trailColor: "rgba(0,0,0,0)",
});

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
    <div
      style={{ backgroundImage: "url('/img/startscreen-bg.jpg')" }}
      className="h-full w-full bg-center bg-cover justify-between items-center grid grid-cols-12 grid-rows-6"
    >
      <h1
        style={{ textShadow: "0 0 35px rgb(255, 0, 255)" }}
        className="text-5xl text-center text-white font-luckiest col-start-3 col-span-8 row-span-1 row-start-1 self-end"
      >
        Practice your face expressions
      </h1>

      <h1
        /*Team name: 🌭*/
        className="text-2xl text-white text-right col-span-2 col-end-12 row-span-1 row-start-1"
      ></h1>

      <div className="w-64 mx-auto col-span-3 col-start-3 row-span-3 row-start-2">
        <PlayerFace
          canvasRef={props.canvasLeftRef}
          expression={props.players[0]}
          faceBox={props.faceBoxes[0]}
          constrainTo="width"
        />
      </div>

      <div className="w-64 mx-auto col-span-3 col-start-8 row-span-3 row-start-2">
        <PlayerFace
          canvasRef={props.canvasRightRef}
          expression={props.players[1]}
          faceBox={props.faceBoxes[1]}
          constrainTo="width"
        />
      </div>

      <div className="col-start-2 col-span-1 row-end-6 row-span-1 flex justify-center items-center text-6xl">
        😄
      </div>
      <div className="col-start-3 col-span-1 row-end-6 row-span-1 flex justify-center items-center text-6xl">
        😢
      </div>
      <div className="col-start-4 col-span-1 row-end-6 row-span-1 flex justify-center items-center text-6xl">
        😡
      </div>
      <div className="col-start-5 col-span-1 row-end-6 row-span-1 flex justify-center items-center text-6xl">
        😐
      </div>
      <div className="col-start-6 col-span-1 row-end-6 row-span-1 flex justify-center items-center text-6xl">
        😮
      </div>
      <div className="col-start-2 col-span-1 row-end-6 row-span-1 p-5">
        <CircularProgressbar
          /* Player 1 Happy */
          value={(timerOne.seconds * 100) / 3}
          styles={styles}
          strokeWidth={10}
        />
      </div>
      <div className="col-start-7 col-span-1 row-end-6 row-span-1 flex justify-center items-center text-6xl">
        😄
      </div>
      <div className="col-start-8 col-span-1 row-end-6 row-span-1 flex justify-center items-center text-6xl">
        😢
      </div>
      <div className="col-start-9 col-span-1 row-end-6 row-span-1 flex justify-center items-center text-6xl">
        😡
      </div>
      <div className="col-start-10 col-span-1 row-end-6 row-span-1 flex justify-center items-center text-6xl">
        😐
      </div>
      <div className="col-start-11 col-span-1 row-end-6 row-span-1 flex justify-center items-center text-6xl">
        😮
      </div>

      <h1
        style={{ textShadow: "0 0 35px rgb(255, 0, 255)" }}
        className="text-3xl font-luckiest text-white tracking-wider text-right col-start-3 col-span-2 row-end-7 row-span-1"
      >
        FaceOne: {timerOne.seconds}
      </h1>

      <h1
        style={{ textShadow: "0 0 35px rgb(255, 0, 255)" }}
        className="text-3xl font-luckiest text-white tracking-wider text-right col-end-6 col-span-2 row-end-7 row-span-1 "
      >
        {faceCountOne} / 5
      </h1>

      <h1
        style={{ textShadow: "0 0 35px rgb(255, 0, 255)" }}
        className="text-3xl font-luckiest text-white tracking-wider text-right col-start-8 col-span-2 row-end-7 row-span-1 "
      >
        FaceTwo: {timerTwo.seconds}
      </h1>
      <h1
        style={{ textShadow: "0 0 35px rgb(255, 0, 255)" }}
        className="text-3xl font-luckiest text-white tracking-wider text-right col-end-11 col-span-2 row-end-7 row-span-1 "
      >
        {faceCountTwo} / 5
      </h1>
    </div>
  );
};

export default WarmUp;
