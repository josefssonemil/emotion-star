import { useRef } from "react";
import PlayerFace from "../components/PlayerFace";
import useCameraSplit from "../hooks/useCameraSplit";
import useFaceRecognition from "../hooks/useFaceRecognition";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>();
  const canvasLeftRef = useRef<HTMLCanvasElement>();
  const canvasRightRef = useRef<HTMLCanvasElement>();
  const player1 = useFaceRecognition(canvasLeftRef);
  const player2 = useFaceRecognition(canvasRightRef);

  useCameraSplit(videoRef, canvasLeftRef, canvasRightRef);

  // todo: <StartScreen />

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
        <div
          style={{
            display: "flex",
            height: "100vh",
            flexDirection: "column",
            justifyContent: "space-around",
            paddingLeft: 50,
          }}
        >
          <PlayerFace
            canvasRef={canvasLeftRef}
            expression={player1.expression}
          />
          <PlayerFace
            canvasRef={canvasRightRef}
            expression={player2.expression}
          />
        </div>
      </div>
    </div>
  );
}
