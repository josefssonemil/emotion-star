import { useRef, useState } from "react";
import FinalScreen from "../components/screens/FinalScreen";
import GameScreen from "../components/screens/GameScreen";
import StartScreen from "../components/screens/StartScreen";
import WarmUpScreen from "../components/screens/WarmUpScreen";
import useCameraSplit from "../hooks/useCameraSplit";
import useFaceRecognition from "../hooks/useFaceRecognition";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>();
  const canvasLeftRef = useRef<HTMLCanvasElement>();
  const canvasRightRef = useRef<HTMLCanvasElement>();
  const player1 = useFaceRecognition(canvasLeftRef);
  const player2 = useFaceRecognition(canvasRightRef);

  const [currentScreen, setCurrentScreen] = useState("start");

  useCameraSplit(videoRef, canvasLeftRef, canvasRightRef);

  return (
    <div>
      <div>
        <video
          className="opacity-0 absolute pointer-events-none"
          ref={videoRef}
          width="1280"
          height="720"
          autoPlay
          muted
        />

        <button onClick={() => setCurrentScreen("start")}>Start</button>
        <button onClick={() => setCurrentScreen("warmUp")}>Warm up</button>
        <button onClick={() => setCurrentScreen("game")}>Game</button>
        <button onClick={() => setCurrentScreen("final")}>Final</button>

        {currentScreen === "start" && <StartScreen />}

        {currentScreen === "warmUp" && <WarmUpScreen
          expressionLeft={player1.expression}
          expressionRight={player2.expression}

        />}

        {currentScreen === "game" && (
          <GameScreen
            canvasLeftRef={canvasLeftRef}
            canvasRightRef={canvasRightRef}
            expressionLeft={player1.expression}
            expressionRight={player2.expression}
          />
        )}

        {currentScreen === "final" && <FinalScreen />}
      </div>
    </div>
  );
}
