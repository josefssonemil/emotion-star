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
    <div>
      <h1 className="text-4xl font-bold">High Score</h1>
      <table>
        <thead>
          <tr>
            <th>Team</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((team) => (
            <tr key={team.emoji}>
              <td>{team.emoji}</td>
              <td>{team.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
