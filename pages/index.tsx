import { useState, useRef } from 'react';
import useFaceRecognition from '../hooks/useFaceRecognition';

export default function Home() {
  const videoRef = useRef();
  const { player1, player2 } = useFaceRecognition(videoRef);

  if (player2 === '😶')
  return(
    <div id="camera">
      <video ref={videoRef} width="720" height="560" autoPlay muted></video>
      <div id="player1">
        <div className="emoji">{player1}</div>
        <h2>Player 1</h2>
      </div>
      <div id="player2">
      </div>
    </div>
  )

  else return (
    <div id="camera">
      <video ref={videoRef} width="720" height="560" autoPlay muted></video>
      <div id="player1">
        <div className="emoji">{player1}</div>
        <h2>Player 1</h2>
      </div>
      <div id="player2">
        <div className="emoji">{player2}</div>
        <h2>Player 2</h2>
      </div>
    </div>
  )
}
