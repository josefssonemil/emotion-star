import { useState, useEffect, MutableRefObject } from "react";



export default function useAudioAPI(audioRef: MutableRefObject<HTMLAudioElement>) {

    const [playing, setPlaying] = useState(true);

    function start() {
        if (audioRef.current) {
            audioRef.current.play();
        }

    }

    function stop() {
        if (audioRef.current) {
            audioRef.current.pause();
        }
    }

    function resume() {

    }




    /* //Analyser - if we need to analyze frequencies, otherwise we hardcode
     const analyserNode = audioCtx.createAnalyser();
 
     analyserNode.fftSize = 256;
     const bufferLength = analyserNode.frequencyBinCount;
 
     const dataArray = new Float32Array(bufferLength);
 
     //Set up audio node network
     audioSourceNode.connect(analyserNode);
     analyserNode.connect(audioCtx.destination);*/


    useEffect(() => {
        if (playing) {
            start();
        } else {
            stop();
        }

        return () => {
            stop();
        }
    }, [playing, audioRef.current])

    return { start: () => setPlaying(true), stop: () => setPlaying(false) };

}
