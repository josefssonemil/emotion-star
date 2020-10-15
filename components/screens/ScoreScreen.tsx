import { FinalStats } from "../../hooks/useFinalStats";
import { useEffect } from 'react';

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
      div
        <video 
          autoPlay 
          muted 
          poster="//img/startscreen-bg.jpg" 
          className="w-full h-auto min-w-full min-h-full"
        >
          <source src="/video/scoreScreen.mp4" type="video/mp4"/>
        </video>
    </div>
  );
}
