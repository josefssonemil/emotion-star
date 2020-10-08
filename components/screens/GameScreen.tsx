import { MutableRefObject, useEffect, useRef } from "react";
import { gameConstants } from "../../config";
import useAudioAPI from "../../hooks/useAudioAPI";
import useGameLoop from "../../hooks/useGameLoop";
import { Expression } from "../../types/Expressions";
import { Level } from "../../types/Level";
import PlayerDot from "../PlayerDot";
import PlayerFace from "../PlayerFace";
import PlayerField from "../PlayerField";
import ProgressBar from "../ProgressBar";

interface Props {
  canvasLeftRef: MutableRefObject<HTMLCanvasElement>;
  canvasRightRef: MutableRefObject<HTMLCanvasElement>;
  players: [Expression, Expression];
  faceBoxes: any[];
  onFinish: () => void;
  level: Level;
  teamName: string;
}

export default function GameScreen(props: Props) {
  const { notes, duration, audioUrl } = props.level;
  const game = useGameLoop(duration, notes, props.players);

  const audioRef = useRef<HTMLAudioElement>();
  useAudioAPI(audioRef);

  // todo: start first when the audio loaded
  useEffect(() => {
    game.start();
  }, []);

  useEffect(() => {
    if (game.progress === 1) {
      props.onFinish();
    }
  }, [game.progress, props.onFinish]);

  const barPositionLeft =
    gameConstants.historyDuration * gameConstants.pixelsPerSecond;

  return (
    <div>
      <audio src={audioUrl} ref={audioRef} />

      <div
        style={{ backgroundImage: "url('/img/startscreen-bg.jpg')" }}
        className="flex h-screen bg-center bg-cover"
      >
        <div
          className="absolute z-10 flex items-center w-full px-12 -mt-10 space-x-8"
          style={{ top: "50%" }}
        >
          <h1
            style={{ textShadow: "0 0 35px rgb(255, 0, 255)" }}
            className="-mt-1 text-4xl text-white"
          >
            Team: {props.teamName}
          </h1>

          <div className="flex-1 -mt-3">
            <ProgressBar progress={game.progress} />
          </div>

          <h1
            style={{ textShadow: "0 0 35px rgb(255, 0, 255)" }}
            className="text-6xl text-white"
          >
            {game.score}
          </h1>
        </div>

        <div className="flex flex-col mr-8">
          <div className="flex-1 py-12 pl-4">
            <PlayerFace
              // Player One video
              canvasRef={props.canvasLeftRef}
              expression={props.players[0]}
              faceBox={props.faceBoxes[0]}
              constrainTo="height"
              player={1}
              connected={false}
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
              connected={false}
            />
          </div>
        </div>

        <div className="relative grid flex-1 h-screen grid-rows-2 overflow-hidden">
          <div
            /* Vertical Line */
            style={{
              boxShadow: "0 0 3px 0 #718096",
              left: barPositionLeft,
            }}
            className="absolute top-0 bottom-0 w-px bg-gray-600 bg-opacity-25"
          />

          <div className="relative row-span-1 row-start-1">
            <PlayerField
              player={1}
              fieldState={game.fieldState[0]}
              noteState={game.noteState[0]}
              gameTime={game.time}
            />
            <PlayerDot expression={props.players[0]} />
          </div>

          <div className="relative row-span-1 row-end-3">
            <PlayerField
              player={2}
              fieldState={game.fieldState[1]}
              noteState={game.noteState[1]}
              gameTime={game.time}
            />
            <PlayerDot expression={props.players[1]} />
          </div>
        </div>
      </div>
    </div>
  );
}
