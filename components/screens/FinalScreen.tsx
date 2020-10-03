import RadarChart from "../RadarChart";
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
export default function FinalScreen() {
  return (
    <div
      style={{ backgroundImage: "url('/img/startscreen-bg.jpg')" }}
      className="h-full w-full bg-center bg-cover grid grid-cols-12 grid-rows-6"
    >
      <div className="col-end-13 col-span-5 row-end-7 row-span-4 place-center">
        <RadarChart performance={data.performance} />
      </div>
    </div>
  );
}
