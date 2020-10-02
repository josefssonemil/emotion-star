const gradient = "linear-gradient(to top, #460270, #5100C6)";
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
        borderRadius: "16px",
        padding: "4px",
        backgroundImage: "linear-gradient(to top, #460270, #5100C6)",
      }}
      className=""
    >
      <div
        style={{
          borderRadius: "14px",
        }}
        className="p-4 bg-black bg-opacity-75"
      >
        <div className="grid grid-cols-3 grid-rows-7 text-white text-center">
          <div className="grid col-span-3 col-start-1 row-span-1 row-start-1">
            <h2
              style={{ textShadow: "0 0 20px rgb(255, 0, 255)" }}
              className="text-3xl font-logo"
            >
              Todays Highscore
            </h2>
          </div>
          <div className="grid col-span-1 col-start-2 row-span-1 row-start-2 font-logo text-2xl">
            <h3
              style={{ textShadow: "0 0 35px rgb(255, 0, 255)" }}
              className="text-2xl font-logo"
            >
              Team
            </h3>
          </div>
          <div className="grid col-span-1 col-start-3 row-span-1 row-start-2 font-logo text-2xl">
            <h3
              style={{ textShadow: "0 0 35px rgb(255, 0, 255)" }}
              className="text-2xl font-logo"
            >
              Score
            </h3>
          </div>
          <div className="grid grid-cols-3 col-span-3 col-start-1 row-span-1 row-start-3 text-xl pt-4">
            <div className="grid col-span-1 col-start-1 font-logo ">1</div>
            <div className="grid col-span-1 col-start-2">🦺</div>
            <div className="grid col-span-1 col-start-3">6666</div>
          </div>
          <div className="grid grid-cols-3 col-span-3 col-start-1 row-span-1 row-start-4 text-xl pt-4">
            <div className="grid col-span-1 col-start-1 font-logo ">2</div>
            <div className="grid col-span-1 col-start-2">🥾</div>
            <div className="grid col-span-1 col-start-3">5555</div>
          </div>
          <div className="grid grid-cols-3 col-span-3 col-start-1 row-span-1 row-start-5 text-xl pt-4">
            <div className="grid col-span-1 col-start-1 font-logo ">3</div>
            <div className="grid col-span-1 col-start-2">🧶</div>
            <div className="grid col-span-1 col-start-3">4444</div>
          </div>
          <div className="grid grid-cols-3 col-span-3 col-start-1 row-span-1 row-start-6 text-xl pt-4">
            <div className="grid col-span-1 col-start-1 font-logo ">4</div>
            <div className="grid col-span-1 col-start-2">🧣</div>
            <div className="grid col-span-1 col-start-3">3333</div>
          </div>
          <div className="grid grid-cols-3 col-span-3 col-start-1 row-span-1 row-start-7 text-xl pt-4">
            <div className="grid col-span-1 col-start-1 font-logo ">5</div>
            <div className="grid col-span-1 col-start-2">🎩</div>
            <div className="grid col-span-1 col-start-3">2222</div>
          </div>
        </div>
      </div>
    </div>
  );
}
