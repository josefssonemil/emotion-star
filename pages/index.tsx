import { useCollection } from "@nandorojo/swr-firestore";
import randomEmoji from "random-emoji";
import React, { useEffect, useMemo, useRef, useState } from "react";
import FinalScreen from "../components/screens/FinalScreen";
import GameScreen from "../components/screens/GameScreen";
import SummaryScreen from "../components/screens/SummaryScreen";
import WarmUpScreen from "../components/screens/WarmUpScreen";
import { fearlessLevel } from "../config";
import useCameraSplit from "../hooks/useCameraSplit";
import useFaceRecognition from "../hooks/useFaceRecognition";
import useFinalStats, { FinalStatsData } from "../hooks/useFinalStats";
import { HighscoreEntry } from "../types/Database";

const getRandomEmoji = () => {
  const results = randomEmoji.random({ count: 1 });
  return results[0].character;
};

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>();
  const canvasLeftRef = useRef<HTMLCanvasElement>();
  const canvasRightRef = useRef<HTMLCanvasElement>();
  const { playing } = useCameraSplit(videoRef, canvasLeftRef, canvasRightRef);
  const { loading, players, faceBoxes } = useFaceRecognition(videoRef, playing);

  const [currentScreen, setCurrentScreen] = useState("warmUp");

  const [teamName, setTeamName] = useState(getRandomEmoji());

  const stats = useFinalStats();

  const highscores = useCollection<HighscoreEntry>("highscores", {
    orderBy: ["score", "desc"],
    listen: true,
  });

  useEffect(() => {
    if (teamName && stats.results.score) {
      highscores.add({
        emoji: teamName,
        score: stats.results.score,
        expressions: stats.results.teamAccuracy,
        timestamp: new Date(),
      });
    }
  }, [teamName, stats.results.score]);

  const playerHighscore = useMemo(() => {
    if (highscores.data) {
      return highscores.data
        .map((item, index) => ({ ...item, index }))
        .find((item) => item.emoji === teamName);
    }
  }, [teamName, highscores.data]);

  const onRestart = () => {
    setCurrentScreen("game");
    stats.reset();
    setTeamName(getRandomEmoji());
  };

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
      <div
        style={{
          height: "6rem",
          width: "auto",
          top: "2.5rem",
          right: "2.5rem",
        }}
        className="absolute z-0"
      >
        <img className="h-full" src="/img/logo.png" />
      </div>
      <nav className="absolute top-0 z-50 p-2 text-white">
        <button className="mr-4" onClick={() => setCurrentScreen("warmUp")}>
          Warm up
        </button>
        <button className="mr-4" onClick={() => setCurrentScreen("game")}>
          Game
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
            setCurrentScreen("final");
          }}
          level={fearlessLevel}
          teamName={teamName}
          onRestart={onRestart}
        />
      )}

      {currentScreen === "final" && (
        <FinalScreen
          canvasLeftRef={canvasLeftRef}
          canvasRightRef={canvasRightRef}
          players={players}
          faceBoxes={faceBoxes}
          stats={stats.results}
          level={fearlessLevel}
          teamName={teamName}
          onRestart={onRestart}
          highscores={highscores.data}
          playerHighscore={playerHighscore}
        />
      )}
      {currentScreen === "summary" && (
        <SummaryScreen
          stats={stats.results}
          onRestart={onRestart}
          highscores={highscores.data}
          teamName={teamName}
          playerHighscore={playerHighscore}
        />
      )}
    </div>
  );
}
