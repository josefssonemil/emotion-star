import { useState, useRef } from 'react';
import useFaceRecognition from '../hooks/useFaceRecognition';

export default function Home() {
  const videoRef = useRef();
  const { player1, player2 } = useFaceRecognition(videoRef);

  return (
    <div>
      <video ref={videoRef} width="720" height="560" autoPlay muted></video>
      <h1>Player 1 (left): {player1}</h1>
      <h1>Player 2 (right): {player2}</h1>
    </div>
  )
}
