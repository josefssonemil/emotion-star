import { motion } from "framer-motion";
import { FinalStats } from '../../hooks/useFinalStats';


interface Props {
  onRestart: () => void;
  teamName: string;
  stats: FinalStats;
}

export default function SummaryScreen(props: Props) {
  const textGlow = {
    textShadow: "0 0 35px rgb(255, 0, 255)",
  };
  const textGlowBlue = {
    textShadow: "0 0 20px #4bfaf0",
  };
  const textGlowGreen = {
    textShadow: "0 0 20px #86e409",
  };


  return (
    <motion.div
      className="grid w-screen h-screen grid-cols-12 grid-rows-6 gap-6 p-10"
    >
      <div 
            style={{
              height: "6rem",
              width: "auto",
              top: "2.5rem",
              right: "2.5rem"
            }}
            className="absolute"
          >
            <img className="h-full" src="/img/logo.png"/>

          </div>
      <h1 className="self-center col-span-5 col-start-1 row-start-1 text-6xl text-white" style={textGlow}>
        Summary Screen
      </h1>

      <h1 style={{textShadow: "0px 0px 34px #FCD932"}} className="self-center col-span-3 col-start-6 row-start-1 text-6xl text-left text-white">
        <span><span className="text-3xl">Team: </span> {props.teamName}</span>
      </h1>
      
      <div style={{textShadow: "0px 0px 34px #FCD932"}} className="self-center col-span-3 col-end-9 row-start-1 text-6xl text-right text-white">
        <h1>
          <span>{props.stats.score}<span className="text-3xl"> P.</span></span>
        </h1>

      </div>
      
      <div className="relative flex-col col-span-5 col-start-1 row-span-4 row-start-2 py-4 space-y-2 dark">
        <h1 style={textGlow} className="w-full text-5xl text-center text-white">Todays High scores</h1>
        
        <div className="flex justify-around">
          <h1 style={textGlow} className="w-full text-3xl text-center text-white">#</h1>
          <h1 style={textGlow} className="w-full text-3xl text-center text-white">Team</h1>
          <h1 style={textGlow} className="w-full text-3xl text-center text-white">Score</h1>
        </div>

        <div className="flex justify-around font-quicksand">
          <h1 className="w-full text-3xl text-center text-gray-500 font-quicksand">1</h1>
          <h1 className="w-full text-3xl text-center font-quicksand">🦷</h1>
          <h1 className="w-full text-3xl text-center text-gray-500 font-quicksand">2000</h1>
        </div>

        <div className="flex justify-around">
          <h1 className="w-full text-3xl text-center text-gray-500 font-quicksand">2</h1>
          <h1 className="w-full text-3xl text-center font-quicksand">👁</h1>
          <h1 className="w-full text-3xl text-center text-gray-500 font-quicksand">1900</h1>
        </div>

        <div className="flex justify-around">
          <h1 className="w-full text-3xl text-center text-gray-500 font-quicksand">3</h1>
          <h1 className="w-full text-3xl text-center font-quicksand">🏦</h1>
          <h1 className="w-full text-3xl text-center text-gray-500 font-quicksand">1800</h1>
        </div>

        <div className="flex justify-around">
          <h1 className="w-full text-3xl text-center text-gray-500 font-quicksand">4</h1>
          <h1 className="w-full text-3xl text-center font-quicksand">💘</h1>
          <h1 className="w-full text-3xl text-center text-gray-500 font-quicksand">1700</h1>
        </div>

        <div className="flex justify-around">
          <h1 className="w-full text-3xl text-center text-gray-500 font-quicksand">5</h1>
          <h1 className="w-full text-3xl text-center font-quicksand">📥</h1>
          <h1 className="w-full text-3xl text-center text-gray-500 font-quicksand">1600</h1>
        </div>

        <div className="flex pt-2 border-t-4 border-white border-opacity-25 border-dashed">
          <h1 style={textGlow} className="w-full text-3xl text-center text-white font-quicksand">9</h1>
          <h1 style={textGlow} className="w-full text-3xl text-center font-quicksand">📨</h1>
          <h1 style={textGlow} className="w-full text-3xl text-center text-white font-quicksand">1300</h1>
        </div>
      </div>

      <div className="flex flex-row col-span-7 col-end-13 row-span-4 row-start-2 overflow-hidden frosted-blue">






      </div>
    
    </motion.div >
  );
}
