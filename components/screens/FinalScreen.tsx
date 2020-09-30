import RadarChart from "../RadarChart";
import Timer from "../Timer";
/*
  TODO:
  * Insert Grid system
  * 
*/
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
    <div className="w-full h-full place-content-center flex flex-col">
      <Timer />
      <RadarChart className="flex" performance={data.performance} />
    </div>
  );
}
