import randomEmoji from "random-emoji";
import React, { useMemo, useRef, useState } from "react";
import FinalScreen from "../components/screens/FinalScreen";
import GameScreen from "../components/screens/GameScreen";
import ScoreScreen from "../components/screens/ScoreScreen";
import SummaryScreen from "../components/screens/SummaryScreen";
import WarmUpScreen from "../components/screens/WarmUpScreen";
import { fearlessLevel } from "../config";
import useCameraSplit from "../hooks/useCameraSplit";
import useFaceRecognition from "../hooks/useFaceRecognition";
import useFinalStats, { FinalStatsData } from "../hooks/useFinalStats";



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
    <div 
      style={{ backgroundImage: "url('/img/startscreen-bg.jpg')" }}
      className="w-screen h-screen overflow-hidden bg-center bg-cover font-luckiest" 
    >
      <video
        className="absolute opacity-0 pointer-events-none"
        ref={videoRef}
        width="1280"
        height="720"
        autoPlay
        muted
      />
      <nav className="absolute top-0 z-50 p-2 text-white">
        <button className="mr-4" onClick={() => setCurrentScreen("warmUp")}>
          Warm up
        </button>
        <button className="mr-4" onClick={() => setCurrentScreen("game")}>
          Game
        </button>
        <button className="mr-4" onClick={() => setCurrentScreen("score")}>
          Score
        </button>
        <button className="mr-4" onClick={() => setCurrentScreen("final")}>
          Final
        </button>
        <button className="mr-4" onClick={() => setCurrentScreen("summary")}>
          Summary
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
          onFinish={(data: FinalStatsData) => {
            stats.setData(data);
            setCurrentScreen("score");
          }}
          level={fearlessLevel}
          teamName={teamName}
        />
      )}
      {currentScreen == "score" && (
        <ScoreScreen 
          //onStart={() => setCurrentScreen("final")} 
          stats={stats.results}/>
      )}

      {currentScreen === "final" && (
        <FinalScreen
          canvasLeftRef={canvasLeftRef}
          canvasRightRef={canvasRightRef}
          players={players}
          faceBoxes={faceBoxes}
          stats={stats.results}
          onRestart={() => {
            // todo: reset stuff
            setCurrentScreen("game");
          }}
          level={fearlessLevel}
          teamName={teamName}
        />
      )}
      {currentScreen === "summary" && (
        <SummaryScreen
          players={players}
          stats={stats.results}
          onRestart={() => {
            // todo: reset stuff
            setCurrentScreen("game");
          }}
          teamName={teamName}
        />
      )}
    </div>
  );
}
