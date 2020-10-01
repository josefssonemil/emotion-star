export default function HighScore() {
  const scores = [
    {
      emoji: "🦺",
      score: 1234,
    },
    {
      emoji: "🧶",
      score: 6237,
    },
    {
      emoji: "🥾",
      score: 8748,
    },
    {
      emoji: "🧣",
      score: 3618,
    },
    {
      emoji: "🎩",
      score: 3892,
    },
    {
      emoji: "🥾",
      score: 3245,
    },
  ];

  return (
    <div
      style={{
        borderRadius: "1rem",
      }}
      className="border-4 border-purple-800 bg-opacity-25 bg-black p-4"
    >
      <div className="grid grid-cols-3 grid-rows-7 text-white text-center">
        <div className="grid col-span-3 col-start-1 row-span-1 row-start-1 font-logo text-3xl">
          Todays Highscore
        </div>
        <div className="grid col-span-1 col-start-2 row-span-1 row-start-2 font-logo text-2xl">
          Team
        </div>
        <div className="grid col-span-1 col-start-3 row-span-1 row-start-2 font-logo text-2xl">
          Score
        </div>
        <div className="grid col-span-1 col-start-2 row-span-1 row-start-3 text-xl pt-4">
          🦺
        </div>
        <div className="grid col-span-1 col-start-3 row-span-1 row-start-3 text-xl pt-4">
          6666
        </div>
        <div className="grid col-span-1 col-start-2 row-span-1 row-start-4 text-xl pt-4">
          🥾
        </div>
        <div className="grid col-span-1 col-start-3 row-span-1 row-start-4 text-xl pt-4">
          5555
        </div>
        <div className="grid col-span-1 col-start-2 row-span-1 row-start-5 text-xl pt-4">
          🧶
        </div>
        <div className="grid col-span-1 col-start-3 row-span-1 row-start-5 text-xl pt-4">
          4444
        </div>
        <div className="grid col-span-1 col-start-2 row-span-1 row-start-6 text-xl pt-4">
          🧣
        </div>
        <div className="grid col-span-1 col-start-3 row-span-1 row-start-6 text-xl pt-4">
          3333
        </div>
        <div className="grid col-span-1 col-start-2 row-span-1 row-start-7 text-xl pt-4">
          🎩
        </div>
        <div className="grid col-span-1 col-start-3 row-span-1 row-start-7 text-xl pt-4">
          2222
        </div>
      </div>
    </div>
  );
}
