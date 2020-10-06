import { MutableRefObject, useEffect, useState } from "react";
import { allowedExpressions } from "../../config";
import useTimer from "../../hooks/useTimer";
import { Expression } from "../../types/Expressions";
import PlayerFace from "../PlayerFace";
import ProgressBar from "../ProgressBar";
import PlayBar from '../PlayBar';
import PlayField from "../PlayField";
import Dot from "../Dot";


interface Props {
  canvasLeftRef: MutableRefObject<HTMLCanvasElement>;
  canvasRightRef: MutableRefObject<HTMLCanvasElement>;
  players: Expression[];
  faceBoxes: any[];
  onStart: () => void;
  gameTime: number;
}

export default function GameScreen(props: Props) {
  const gameTime = props.gameTime;
  const gameTimer = useTimer(gameTime);
  const [gameProgress, setGameProgress] = useState(0);
  useEffect(() => {
    gameTimer.start();
    if (gameTimer.seconds >= gameTime) {
      //props.onStart();
    }
    setGameProgress((gameTimer.seconds / gameTime) * 100);
  });

  const [dot, setDot] = useState({
    playerOne: {
      visible: "",
      row: undefined,
    },
    playerTwo: {
      visible: "",
      row: undefined,
    },
  });
  const faceOne = props.players[0];
  const faceTwo = props.players[1];

  useEffect(() => {
    if (faceOne != undefined) {
      setDot((prevValue) => ({
        ...prevValue,
        playerOne: {
          visible: "",
          row: allowedExpressions.indexOf(faceOne) + 1,
        },
      }));
    } else {
      setDot((prevValue) => ({
        ...prevValue,
        playerOne: {
          visible: "hidden",
          row: undefined,
        },
      }));
    }

    if (faceTwo != undefined) {
      setDot((prevValue) => ({
        ...prevValue,
        playerTwo: {
          visible: "",
          row: allowedExpressions.indexOf(faceTwo) + 1,
        },
      }));
    } else {
      setDot((prevValue) => ({
        ...prevValue,
        playerTwo: {
          visible: "hidden",
          row: undefined,
        },
      }));
    }
  }, [props.players]);

  return (
    <div
      style={{ backgroundImage: "url('/img/startscreen-bg.jpg')" }}
      className="h-screen bg-center bg-cover flex"
    >
      <div className="absolute w-full -mt-2 z-10" style={{ top: "50%" }}>
        <ProgressBar position={gameProgress} />
      </div>

      <div className="flex flex-col">
        <div className="flex-1 py-12 pl-4">
          <PlayerFace
            // Player One video
            canvasRef={props.canvasLeftRef}
            expression={props.players[0]}
            faceBox={props.faceBoxes[0]}
            constrainTo="height"
            player={1}
          />
        </div>

        <div className="h-2" />

        <div className="flex-1 py-12 pl-4">
          <PlayerFace
            // Player Two video
            canvasRef={props.canvasRightRef}
            expression={props.players[1]}
            faceBox={props.faceBoxes[1]}
            constrainTo="height"
            player={2}
          />
        </div>
      </div>

      <div className="flex-1 h-screen grid grid-cols-12 grid-rows-6">
        <div
          /* Vertical Line */
          style={{ boxShadow: "0 0 3px 0 #718096" }}
          className="w-px bg-gray-600 bg-opacity-25 col-start-6 col-span-1 row-start-1 row-end-7 justify-self-center"
        />
      </div>
      <div className="w-64 justify-self-start self-start col-start-1 col-span-3 row-span-3 row-end-7">
        <PlayerFace
          // Player Two video
          canvasRef={props.canvasRightRef}
          expression={props.players[1]}
          faceBox={props.faceBoxes[1]}
          constrainTo="width"
        />
      </div>
      <div className="col-start-1 col-span-12 row-start-3 row-span-2 flex items-center">
        <ProgressBar position={gameProgress} gameTime={gameTime} />
      </div>
      <div
        // Playfield player 2
        className="grid grid-rows-5 grid-cols-12 col-start-1 col-end-13 row-end-7 row-span-3"
      >
        <div
          // Playfield player 1
          className="grid grid-rows-5 grid-cols-12 col-start-1 col-end-13 row-start-1 row-span-3"
        >

          <PlayBar data={dot.playerOne} />


        </div>
        <div
          // Playfield player 2
          className="grid grid-rows-5 grid-cols-12 col-start-1 col-end-13 row-end-7 row-span-3"
        >

          <PlayBar data={dot.playerTwo} />



        </div>
      </div>
    </div>
  );
}
