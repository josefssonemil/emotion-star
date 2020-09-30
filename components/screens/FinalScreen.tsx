import RadarChart from "../RadarChart";
const data = {
  performance: {
    player1: [70, 50, 70, 80, 50],
    player2: [30, 50, 40, 50, 80],
    average: [60, 60, 60, 60, 60],
  },
};
function blaha() {}
export default function FinalScreen() {
  return (
    <div className="bg-gray-500 w-screen h-screen">
      <div className="max-w-lg max-h-lg mx-auto my-auto">
        <RadarChart performance={data.performance} />
      </div>
    </div>
  );
}
