import { useState, useEffect } from "react";

export default function useAudioAPI() {

    const [playing, setPlaying] = useState(false);

    const audioCtx = new AudioContext();

    const audioElement = new Audio();
    // add file here
    audioElement.src = '/img/gaga.mp3';

    audioElement.preload = 'auto';

    audioElement.autoplay = true;
    console.log(audioElement);

    const audioSourceNode = audioCtx.createMediaElementSource(audioElement);


    function start() {
        audioElement.play;
        setPlaying(true);
    }

    function stop() {
        audioElement.pause;
        setPlaying(false);
    }

    function resume() {

    }




    //Analyser - if we need to analyze frequencies, otherwise we hardcode
    const analyserNode = audioCtx.createAnalyser();

    analyserNode.fftSize = 256;
    const bufferLength = analyserNode.frequencyBinCount;

    const dataArray = new Float32Array(bufferLength);

    //Set up audio node network
    audioSourceNode.connect(analyserNode);
    analyserNode.connect(audioCtx.destination);



    useEffect(() => {
        if (playing) {

        }

        else {
            start();
        }
        return () => {
            stop();
        }
    }, [playing])

    return { start, stop };

}
