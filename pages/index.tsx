import { useRef, useState } from "react";
import GameScreen from "../components/screens/GameScreen";
import useCameraSplit from "../hooks/useCameraSplit";
import useFaceRecognition from "../hooks/useFaceRecognition";
import StartScreen from '../components/screens/StartScreen';
import WarmUpScreen from '../components/screens/WarmUpScreen';

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>();
  const canvasLeftRef = useRef<HTMLCanvasElement>();
  const canvasRightRef = useRef<HTMLCanvasElement>();
  const player1 = useFaceRecognition(canvasLeftRef);
  const player2 = useFaceRecognition(canvasRightRef);

  const [currentScreen, setCurrentScreen] = useState('GameScreen');

  useCameraSplit(videoRef, canvasLeftRef, canvasRightRef);

  return (
    <div>
      <div>
        <video
          className="opacity-0 absolute pointer-events-none"
          ref={videoRef}
          width="1280"
          height="720"
          autoPlay
          muted
        />

        <button>Hej</button>

        {currentScreen === 'GameScreen' && (<GameScreen
          canvasLeftRef={canvasLeftRef}
          canvasRightRef={canvasRightRef}
          expressionLeft={player1.expression}
          expressionRight={player2.expression}
        />)}

        {currentScreen === 'WarmUpScreen' && (
          <WarmUpScreen />
        )}


      </div>
    </div>
  );
}
