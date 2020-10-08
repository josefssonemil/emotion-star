import randomEmoji from "random-emoji";
import { useMemo, useRef, useState } from "react";
import FinalScreen from "../components/screens/FinalScreen";
import GameScreen from "../components/screens/GameScreen";
import WarmUpScreen from "../components/screens/WarmUpScreen";
import useCameraSplit from "../hooks/useCameraSplit";
import useFaceRecognition from "../hooks/useFaceRecognition";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>();
  const canvasLeftRef = useRef<HTMLCanvasElement>();
  const canvasRightRef = useRef<HTMLCanvasElement>();
  const { playing } = useCameraSplit(videoRef, canvasLeftRef, canvasRightRef);
  const { loading, players, faceBoxes } = useFaceRecognition(videoRef, playing);

  const [currentScreen, setCurrentScreen] = useState("warmUp");

  const teamName = useMemo(() => {
    const results = randomEmoji.random({ count: 1 });
    return results[0].character;
  }, []);

  return (
    <div className="w-screen h-screen overflow-hidden font-luckiest">
      <video
        className="opacity-0 absolute pointer-events-none"
        ref={videoRef}
        width="1280"
        height="720"
        autoPlay
        muted
      />
      <nav className="absolute top-0 text-white p-2 z-20">
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

      {currentScreen === "warmUp" && (
        <WarmUpScreen
          players={players}
          canvasLeftRef={canvasLeftRef}
          canvasRightRef={canvasRightRef}
          faceBoxes={faceBoxes}
          onStart={() => setCurrentScreen("game")}
          teamName={teamName}
        />
      )}

      {currentScreen === "game" && (
        <GameScreen
          canvasLeftRef={canvasLeftRef}
          canvasRightRef={canvasRightRef}
          players={players}
          faceBoxes={faceBoxes}
          onStart={() => setCurrentScreen("final")}
          gameTime={120}
          teamName={teamName}
        />
      )}

      {currentScreen === "final" && <FinalScreen />}
    </div>
  );
}
