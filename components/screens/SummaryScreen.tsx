import { useCollection } from "@nandorojo/swr-firestore";
import { motion } from "framer-motion";
import { useEffect, useMemo } from "react";
import { FinalStats } from "../../hooks/useFinalStats";
import { HighscoreEntry } from "../../types/Database";

interface Props {
  onRestart: () => void;
  teamName: string;
  stats: FinalStats;
}

export default function SummaryScreen(props: Props) {
  const textGlow = {
    textShadow: "0 0 35px rgb(255, 0, 255)",
  };

  const highscores = useCollection<HighscoreEntry>("highscores", {
    orderBy: ["score", "desc"],
    listen: true,
  });

  useEffect(() => {
    if (props.teamName && props.stats.score) {
      highscores.add({
        emoji: props.teamName,
        score: props.stats.score,
        expressions: props.stats.teamAccuracy,
        timestamp: new Date(),
      });
    }
  }, [props.teamName, props.stats.score]);

  const playerHighscore = useMemo(() => {
    if (highscores.data) {
      return highscores.data
        .map((item, index) => ({ ...item, index }))
        .find((item) => item.emoji === props.teamName);
    }
  }, [props.teamName, highscores.data]);

  return (
    <motion.div className="grid w-screen h-screen grid-cols-12 grid-rows-6 gap-6 p-10">
      <div
        style={{
          height: "6rem",
          width: "auto",
          top: "2.5rem",
          right: "2.5rem",
        }}
        className="absolute"
      >
        <img className="h-full" src="/img/logo.png" />
      </div>
      <h1
        className="self-center col-span-5 col-start-1 row-start-1 text-6xl text-white"
        style={textGlow}
      >
        Summary Screen
      </h1>

      <h1
        style={{ textShadow: "0px 0px 34px #FCD932" }}
        className="self-center col-span-3 col-start-6 row-start-1 text-6xl text-left text-white"
      >
        <span>
          <span className="text-3xl">Team: </span> {props.teamName}
        </span>
      </h1>

      <div
        style={{ textShadow: "0px 0px 34px #FCD932" }}
        className="self-center col-span-3 col-end-9 row-start-1 text-6xl text-right text-white"
      >
        <h1>
          <span>
            {props.stats.score}
            <span className="text-3xl"> P.</span>
          </span>
        </h1>
      </div>

      <div className="relative flex-col col-span-5 col-start-1 row-span-4 row-start-2 py-4 space-y-2 dark">
        <h1 style={textGlow} className="w-full text-5xl text-center text-white">
          High scores
        </h1>

        <div className="flex justify-around">
          <h1
            style={textGlow}
            className="w-full text-3xl text-center text-white"
          >
            #
          </h1>
          <h1
            style={textGlow}
            className="w-full text-3xl text-center text-white"
          >
            Team
          </h1>
          <h1
            style={textGlow}
            className="w-full text-3xl text-center text-white"
          >
            Score
          </h1>
        </div>

        {!!highscores.data &&
          highscores.data
            .filter((_, i) => i < 10)
            .map((entry, i) => (
              <div
                className="flex justify-around font-quicksand"
                key={entry.id}
              >
                <h1 className="w-full text-3xl text-center text-gray-500 font-quicksand">
                  {i + 1}
                </h1>
                <h1 className="w-full text-3xl text-center font-quicksand">
                  {entry.emoji}
                </h1>
                <h1 className="w-full text-3xl text-center text-gray-500 font-quicksand">
                  {entry.score}
                </h1>
              </div>
            ))}

        {!!playerHighscore && (
          <div className="flex pt-2 border-t-4 border-white border-opacity-25 border-dashed">
            <h1
              style={textGlow}
              className="w-full text-3xl text-center text-white font-quicksand"
            >
              {playerHighscore.index + 1}
            </h1>
            <h1
              style={textGlow}
              className="w-full text-3xl text-center font-quicksand"
            >
              {playerHighscore.emoji}
            </h1>
            <h1
              style={textGlow}
              className="w-full text-3xl text-center text-white font-quicksand"
            >
              {playerHighscore.score}
            </h1>
          </div>
        )}
      </div>
      <div className="flex flex-row col-span-7 col-end-13 row-span-4 row-start-2 overflow-hidden frosted-blue"></div>
    </motion.div>
  );
}
