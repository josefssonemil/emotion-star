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
  const { loading, players } = useFaceRecognition(videoRef, playing);

  const [currentScreen, setCurrentScreen] = useState("start");

  console.log(players);

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

        {currentScreen === "warmUp" && <WarmUpScreen />}

        {currentScreen === "game" && (
          <GameScreen
            canvasLeftRef={canvasLeftRef}
            canvasRightRef={canvasRightRef}
            players={players}
          />
        )}

        {currentScreen === "final" && <FinalScreen />}
      </div>
    </div>
  );
}
