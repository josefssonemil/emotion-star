import { useRef } from "react";
import GameScreen from "../components/screens/GameScreen";
import useCameraSplit from "../hooks/useCameraSplit";
import useFaceRecognition from "../hooks/useFaceRecognition";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>();
  const canvasLeftRef = useRef<HTMLCanvasElement>();
  const canvasRightRef = useRef<HTMLCanvasElement>();
  const player1 = useFaceRecognition(canvasLeftRef);
  const player2 = useFaceRecognition(canvasRightRef);

  useCameraSplit(videoRef, canvasLeftRef, canvasRightRef);

  return (
    <div>
      <div>
        <video
          style={{ opacity: 0, pointerEvents: "none", position: "absolute" }}
          ref={videoRef}
          width="1280"
          height="720"
          autoPlay
          muted
        />
        <GameScreen
          canvasLeftRef={canvasLeftRef}
          canvasRightRef={canvasRightRef}
          expressionLeft={player1.expression}
          expressionRight={player2.expression}
        />
      </div>
    </div>
  );
}
