import { MutableRefObject, useEffect, useMemo, useState } from "react";
import useTimer from "../../hooks/useTimer";
import { Expression } from "../../types/Expressions";
import PlayerFace from "../PlayerFace";
import EmojiProgress from "../EmojiProgress";
import { motion } from "framer-motion";

interface Props {
  canvasLeftRef: MutableRefObject<HTMLCanvasElement>;
  canvasRightRef: MutableRefObject<HTMLCanvasElement>;
  players: Expression[];
  faceBoxes: any[];
  onStart: () => void;
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
  const timer = {
    one: {
      happy: useTimer(3),
      angry: useTimer(3),
      surprised: useTimer(3),
      sad: useTimer(3),
      neutral: useTimer(3),
    },
    two: {
      happy: useTimer(3),
      angry: useTimer(3),
      surprised: useTimer(3),
      sad: useTimer(3),
      neutral: useTimer(3),
    },
  };
  const timerOne = useTimer(3);
  const timerTwo = useTimer(3);

  useEffect(() => {
    const faceOne = props.players[0];
    const faceTwo = props.players[1];

    // check if faces already have been achieved

    // Start timer for player one
    if (!facesOne[faceOne] && faceOne) {
      //start timer
      setPrevFace(faceOne);
      timer.one[faceOne].start();

      if (prevFace == faceOne) {
        if (timer.one[faceOne].seconds > 3) {
          setFacesOne((prevValue) => {
            return {
              ...prevValue,
              [faceOne]: true,
            };
          });
          timer.one[faceOne].reset();
        }
      } else {
        timer.one[faceOne].reset();
      }
    } else {
      setPrevFace(null);
    }
    // check if face is still active each call

    if (!facesTwo[faceTwo] && faceTwo) {
      //start timer
      setPrevFaceTwo(faceTwo);
      timer.two[faceTwo].start();

      if (prevFaceTwo == faceTwo) {
        if (timer.two[faceTwo].seconds > 3) {
          setFacesTwo((prevValue) => {
            return {
              ...prevValue,
              [faceTwo]: true,
            };
          });
        }
      } else {
        timer.two[faceTwo].reset();
      }
    } else {
      setPrevFaceTwo(null);
    }
  }, [props.players]);

  useEffect(() => {
    if (faceCountOne + faceCountTwo === 10) {
      props.onStart();
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

      <div className=" place-self-stretch col-span-3 col-end-6 row-span-3 row-start-2">
        <div className="w-64">
          <PlayerFace
            canvasRef={props.canvasLeftRef}
            expression={props.players[0]}
            faceBox={props.faceBoxes[0]}
            constrainTo="width"
          />
        </div>
      </div>

      <div className="w-64 place-self-stretch col-span-3 col-start-8 row-span-3 row-start-2">
        <PlayerFace
          canvasRef={props.canvasRightRef}
          expression={props.players[1]}
          faceBox={props.faceBoxes[1]}
          constrainTo="width"
        />
      </div>

      <div className="col-start-2 col-span-1 row-end-6 row-span-1">
        <EmojiProgress
          emoji="happy"
          expression={facesOne.happy}
          timer={timer.one.happy.seconds}
        />
      </div>
      <div className="col-start-3 col-span-1 row-end-6 row-span-1">
        <EmojiProgress
          emoji="sad"
          expression={facesOne.sad}
          timer={timer.one.sad.seconds}
        />
      </div>
      <div className="col-start-4 col-span-1 row-end-6 row-span-1">
        <EmojiProgress
          emoji="angry"
          expression={facesOne.angry}
          timer={timer.one.angry.seconds}
        />
      </div>
      <div className="col-start-5 col-span-1 row-end-6 row-span-1">
        <EmojiProgress
          emoji="neutral"
          expression={facesOne.neutral}
          timer={timer.one.neutral.seconds}
        />
      </div>
      <div className="col-start-6 col-span-1 row-end-6 row-span-1">
        <EmojiProgress
          emoji="surprised"
          expression={facesOne.surprised}
          timer={timer.one.surprised.seconds}
        />
      </div>

      <div className="col-start-7 col-span-1 row-end-6 row-span-1">
        <EmojiProgress
          emoji="happy"
          expression={facesTwo.happy}
          timer={timer.two.happy.seconds}
        />
      </div>
      <div className="col-start-8 col-span-1 row-end-6 row-span-1">
        <EmojiProgress
          emoji="sad"
          expression={facesTwo.sad}
          timer={timer.two.sad.seconds}
        />
      </div>
      <div className="col-start-9 col-span-1 row-end-6 row-span-1">
        <EmojiProgress
          emoji="angry"
          expression={facesTwo.angry}
          timer={timer.two.angry.seconds}
        />
      </div>
      <div className="col-start-10 col-span-1 row-end-6 row-span-1">
        <EmojiProgress
          emoji="neutral"
          expression={facesTwo.neutral}
          timer={timer.two.neutral.seconds}
        />
      </div>
      <div className="col-start-11 col-span-1 row-end-6 row-span-1">
        <EmojiProgress
          emoji="surprised"
          expression={facesTwo.surprised}
          timer={timer.two.surprised.seconds}
        />
      </div>
      <h1
        style={{ textShadow: "0 0 35px rgb(255, 0, 255)" }}
        className="text-3xl font-luckiest text-white tracking-wider text-center col-start-2 col-span-2 row-end-7 row-span-1 "
      >
        {faceCountOne} / 5
      </h1>
      <h1
        style={{ textShadow: "0 0 35px rgb(255, 0, 255)" }}
        className="text-3xl font-luckiest text-white tracking-wider text-center col-start-5 col-span-4 row-end-7 row-span-1 "
      >
        Complete all faces to continue..
      </h1>
      <h1
        style={{ textShadow: "0 0 35px rgb(255, 0, 255)" }}
        className="text-3xl font-luckiest text-white tracking-wider text-center col-end-12 col-span-2 row-end-7 row-span-1 "
      >
        {faceCountTwo} / 5
      </h1>
      <button
        className="text-3xl font-luckiest text-white tracking-wider text-center col-end-13 col-span-1 row-start-1 row-span-1"
        onClick={() => {
          setFacesOne({
            happy: false,
            angry: false,
            surprised: false,
            sad: false,
            neutral: false,
          });
          setFacesTwo({
            happy: false,
            angry: false,
            surprised: false,
            sad: false,
            neutral: false,
          });
        }}
      >
        Reset
      </button>
    </div>
  );
};

export default WarmUp;
