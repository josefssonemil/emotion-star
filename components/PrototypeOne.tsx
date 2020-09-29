import useFaceRecognition from '../../hooks/useFaceRecognition';
import { useRef, useState } from "react";

// Fungerar inte

const videoRef = useRef();
const { player1, player2 } = useFaceRecognition(videoRef);


const PrototypeOne = () => (


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
);

export default PrototypeOne;
