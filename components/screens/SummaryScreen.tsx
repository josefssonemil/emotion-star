import { Document } from "@nandorojo/swr-firestore";
import { FinalStats } from "../../hooks/useFinalStats";
import { HighscoreEntry } from "../../types/Database";

interface Props {
  onRestart: () => void;
  teamName: string;
  stats: FinalStats;
  highscores: Document<HighscoreEntry>[];
  playerHighscore: Document<HighscoreEntry> & { index: number };
}

export default function SummaryScreen(props: Props) {
  const textGlow = {
    textShadow: "0 0 35px rgb(255, 0, 255)",
  };

  return (
    <div className="grid w-screen h-screen grid-cols-12 grid-rows-6 gap-6 p-10">
      <div className="relative flex-col col-span-3 col-start-4 row-span-6 row-start-1 py-4 space-y-2 dark">
        <h1 style={textGlow} className="w-full text-4xl text-center text-white">
          High scores
        </h1>

        <div className="flex justify-around">
          <h1
            style={textGlow}
            className="w-full text-2xl text-center text-white"
          >
            #
          </h1>
          <h1
            style={textGlow}
            className="w-full text-2xl text-center text-white"
          >
            Team
          </h1>
          <h1
            style={textGlow}
            className="w-full text-2xl text-center text-white"
          >
            Score
          </h1>
        </div>

        {!!props.highscores &&
          props.highscores
            .filter((_, i) => i < 10)
            .map((entry, i) => (
              <div className="flex justify-around" key={entry.id}>
                <h1 className="w-full text-3xl text-center text-gray-500 font-regular font-quicksand">
                  {i + 1}
                </h1>
                <h1 className="w-full text-3xl text-center">{entry.emoji}</h1>
                <h1 className="w-full text-3xl text-center text-gray-500 font-regular font-quicksand">
                  {entry.score}
                </h1>
              </div>
            ))}

        {!!props.playerHighscore && (
          <div className="flex pt-2 border-t-4 border-white border-opacity-25 border-dashed">
            <h1
              style={textGlow}
              className="w-full text-3xl text-center text-white font-quicksand"
            >
              {props.playerHighscore.index + 1}
            </h1>
            <h1
              style={textGlow}
              className="w-full text-3xl text-center font-quicksand"
            >
              {props.playerHighscore.emoji}
            </h1>
            <h1
              style={textGlow}
              className="w-full text-3xl text-center text-white font-quicksand"
            >
              {props.playerHighscore.score}
            </h1>
          </div>
        )}
      </div>
    </div>
  );
}
