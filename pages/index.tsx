import randomEmoji from "random-emoji";
import { useMemo, useRef, useState } from "react";
import FinalScreen from "../components/screens/FinalScreen";
import GameScreen from "../components/screens/GameScreen";
import WarmUpScreen from "../components/screens/WarmUpScreen";
import { fearlessLevel } from "../config";
import useCameraSplit from "../hooks/useCameraSplit";
import useFaceRecognition from "../hooks/useFaceRecognition";
import useFinalStats, { AccuracyObject } from '../hooks/useFinalStats';

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

  const stats = useFinalStats();

  return (
    <div className="w-screen h-screen overflow-hidden font-luckiest">
      <video
        className="absolute opacity-0 pointer-events-none"
        ref={videoRef}
        width="1280"
        height="720"
        autoPlay
        muted
      />
      <nav className="absolute top-0 z-20 p-2 text-white">
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
          onFinish={(accuracy: [AccuracyObject, AccuracyObject]) => {
            stats.setData(accuracy);
            setCurrentScreen("final");
          }}
          level={fearlessLevel}
          teamName={teamName}
        />
      )}

      {currentScreen === "final" && <FinalScreen
        canvasLeftRef={canvasLeftRef}
        canvasRightRef={canvasRightRef}
        players={players}
        faceBoxes={faceBoxes}
        stats={stats.results}
        onRestart={() => {
          // todo: reset stuff
          setCurrentScreen("game")
        }}
        level={fearlessLevel}
        teamName={teamName}
      />}
    </div>
  );
}
