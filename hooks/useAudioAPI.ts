import { useState, useEffect, MutableRefObject } from "react";

let filter, distortion;

var audioSource;

// Prepare to receive a value which changes the fiter
var PERCENTAGE_VALUE = 0.85;
export default function useAudioAPI() {
    const [value, setValue] = useState(1);

    useEffect(() => {
        const audio = new Audio('/img/gaga.mp3');
        const context = new AudioContext();
        audioSource = context.createMediaElementSource(audio);

        filter = context.createBiquadFilter();
        distortion = context.createWaveShaper();
        audioSource.connect(distortion);

        filter.connect(distortion);
        distortion.connect(context.destination);





        audio.addEventListener("canplaythrough", event => {
            /* the audio is now playable; play it if permissions allow */
            audio.play();
        });

        setTimeout(() => {
            setValue(0.5);
            setValue(0.2);

        }, 2000);

        return () => audio.pause();
    }, []);

    useEffect(() => {
        if (filter) {

            console.log("changing filter")
            // filter.type = "highshelf";
            // filter.frequency.value = 100;
            // filter.gain.value = 2;
            // filter.detune.value = 1200;

            if (PERCENTAGE_VALUE > 0.9) {
                filter.disconnect(0);
            }

            else {
                filter.connect(distortion);
                distortion.curve = makeDistortionCurve(PERCENTAGE_VALUE * 10);
            }
        }
        console.log("effect change called")

    }, [value]);

}

function makeDistortionCurve(amount) {
    var k = typeof amount === 'number' ? amount : 50,
        n_samples = 44100,
        curve = new Float32Array(n_samples),
        deg = Math.PI / 180,
        i = 0,
        x;
    for (; i < n_samples; ++i) {
        x = i * 2 / n_samples - 1;
        curve[i] = (3 + k) * x * 20 * deg / (Math.PI + k * Math.abs(x));
    }
    return curve;
};