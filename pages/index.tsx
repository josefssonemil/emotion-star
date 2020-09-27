import { useRef } from "react";
import PlayerFace from "../components/PlayerFace";
import useCameraSplit from "../hooks/useCameraSplit";
import useFaceRecognition from "../hooks/useFaceRecognition";

export default function Home() {
  const videoRef = useRef<HTMLVideoElement>();
  const canvasLeftRef = useRef<HTMLCanvasElement>();
  const canvasRightRef = useRef<HTMLCanvasElement>();
  const camera = useCameraSplit(videoRef, canvasLeftRef, canvasRightRef);

  const player1 = useFaceRecognition(canvasLeftRef);
  const player2 = useFaceRecognition(canvasRightRef);

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

  /*const { player1, player2 } = useFaceRecognition(videoRef);

  if (player2 === "")
    return (
      <div id="camera">
        <video ref={videoRef} width="720" height="560" autoPlay muted></video>
        <div id="player1">
          <div className="emoji">{player1}</div>
          <h2>Player 1</h2>
        </div>
        <div id="player2"></div>
      </div>
    );
  else
    return (
      <div id="camera">
        <video ref={videoRef} width="720" height="560" autoPlay muted></video>
        <div id="player1">
          <div className="emoji">{player2}</div>
          <h2>Player 1</h2>
        </div>
        <div id="player2">
          <div className="emoji">{player1}</div>
          <h2>Player 2</h2>
        </div>
      </div>
    );*/
}
