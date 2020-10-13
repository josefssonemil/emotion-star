import { useState, useEffect, MutableRefObject } from "react";

let filter, distortion;

var audioSource;

// Prepare to receive a value which changes the fiter
var PERCENTAGE_VALUE = 0.5;
export default function useAudioAPI() {
    const [value, setValue] = useState(1);

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        const audio = new Audio('/img/gaga.mp3');
        const context = new AudioContext();
        audioSource = context.createMediaElementSource(audio);

        filter = context.createBiquadFilter();
        audioSource.connect(filter);
        filter.connect(context.destination);






        audio.addEventListener("canplaythrough", event => {
            setLoaded(true);
            /* the audio is now playable; play it if permissions allow */
            audio.play();
        });

        /*setTimeout(() => {
            setValue(0.5);
            setValue(0.2);

        }, 2000);*/

        return () => audio.pause();
    }, []);

    useEffect(() => {
        if (filter) {

            console.log("changing filter")
            filter.type = "lowpass";
            filter.frequency.value = 100;
        }
        console.log("effect change called")

    }, []);

    return loaded;

}

