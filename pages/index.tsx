import { useState, useRef } from 'react';
import useFaceRecognition from '../hooks/useFaceRecognition';

export default function Home() {
  const videoRef = useRef();
  const output = useFaceRecognition(videoRef);

  return (
    <div>
      <video ref={videoRef} width="720" height="560" autoPlay muted></video>
      <h1>{output}</h1>
    </div>
  )
}
