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
  const { playing } = useCameraSplit(videoRef, canvasLeftRef, canvasRightRef);
  const { loading, players, faceBoxes } = useFaceRecognition(videoRef, playing);

  const [currentScreen, setCurrentScreen] = useState("start");

  return (
    <div className="w-screen h-screen overflow-hidden">
      <video
        className="opacity-0 absolute pointer-events-none"
        ref={videoRef}
        width="1280"
        height="720"
        autoPlay
        muted
      />
      <nav className="absolute top-0 text-white p-2">
        <button className="mr-4" onClick={() => setCurrentScreen("start")}>
          Start
        </button>
        <button className="mr-4" onClick={() => setCurrentScreen("warmUp")}>
          Warm up
        </button>
        <button className="mr-4" onClick={() => setCurrentScreen("game")}>
          Game
        </button>
        <button className="mr-4" onClick={() => setCurrentScreen("final")}>
          Final
        </button>
      </nav>

      {currentScreen === "start" && (
        <StartScreen
          canvasLeftRef={canvasLeftRef}
          canvasRightRef={canvasRightRef}
          players={players}
          faceBoxes={faceBoxes}
          onStart={() => setCurrentScreen("warmUp")}
        />
      )}

      {currentScreen === "warmUp" && (
        <WarmUpScreen
          players={players}
          canvasLeftRef={canvasLeftRef}
          canvasRightRef={canvasRightRef}
          faceBoxes={faceBoxes}
          onStart={() => setCurrentScreen("game")}
        />
      )}

      {currentScreen === "game" && (
        <GameScreen
          canvasLeftRef={canvasLeftRef}
          canvasRightRef={canvasRightRef}
          players={players}
          faceBoxes={faceBoxes}
          onStart={() => setCurrentScreen("final")}
          gameTime={30}
        />
      )}

      {currentScreen === "final" && <FinalScreen />}
    </div>
  );
}
