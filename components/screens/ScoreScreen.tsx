import { FinalStats } from "../../hooks/useFinalStats";
import { useEffect } from 'react';
import { motion } from "framer-motion";

interface Props {
  stats: FinalStats;
  onStart: () => void;
}

export default function ScoreScreen(props: Props) {
  useEffect(()=>{
    setTimeout(() => {
      props.onStart()
    }, 6000);
  })
 
  return (
    <div className="relative w-screen h-screen">
      <video 
        autoPlay 
        muted 
        poster="//img/startscreen-bg.jpg" 
        className="w-full h-auto min-w-full min-h-full"
      >
        <source src="/video/scoreScreen.mp4" type="video/mp4"/>
      </video>
      <div className="absolute inset-0 flex items-center justify-center">
        <motion.h1 
          className="text-6xl text-white "
          style={{ textShadow: "0 0 35px rgb(255, 0, 255)" }}
          animate={{
            scale: [1,1,1.1,1.05,1]
          }}
          transition={{
            loop: Infinity,
            ease: "easeIn",
          }}
        >
          score: {props.stats.score}

        </motion.h1>
      </div>
    </div>
  );
}
