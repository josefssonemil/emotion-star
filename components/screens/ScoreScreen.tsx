import { FinalStats } from "../../hooks/useFinalStats";
import { useEffect } from 'react';
import { motion } from "framer-motion";
import useSound from "use-sound";

interface Props {
  stats: FinalStats;
}

export default function ScoreScreen(props: Props) {
  const [play] = useSound("/sound/cheer.mp3", {
    volume: 0.3,
    playbackRate: 1,
  });
  return (
    <motion.div 
      className="absolute top-0 left-0 z-20 w-full h-full overflow-hidden"
      initial={{
        opacity:1
      }}
      animate={{
        opacity:0
      }}
      transition={{
        delay: 6
      }}
    >
      <audio autoPlay>
        <source src="/sound/cheer.mp3" type="audio/mp3"/>
      </audio>
      <div 
        style={{
          height: "6rem",
          width: "auto",
          top: "2.5rem",
          right: "2.5rem"
        }}
        className="absolute z-0 opacity-50"
      >
        <img className="h-full" src="/img/logo.png"/>

      </div>
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
    </motion.div>
  );
}
