import { useState, useEffect, MutableRefObject } from "react";



let filter, filterType, filterHz;

var audioSource;

let LOWEST, HIGHEST;

// Prepare to receive a value which changes the fiter
export default function useAudioAPI(
    percentageValue: number,
    audioUrl: string
) {

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {

        // Init audio
        const audio = new Audio(audioUrl);
        const context = new AudioContext();
        audioSource = context.createMediaElementSource(audio);

        // Create and connect filter
        filter = context.createBiquadFilter();
        audioSource.connect(filter);
        filter.connect(context.destination);

        // Save default filter settings

        filterType = "lowpass";
        filterHz = 24000;

        filter.type = filterType;
        filter.frequency.value = filterHz;

        LOWEST = 400;
        HIGHEST = 1200;


        audio.addEventListener("canplaythrough", event => {
            setLoaded(true);
            /* the audio is now playable; play it if permissions allow */
            audio.play();
        });



        return () => audio.pause();
    }, []);

    useEffect(() => {

        if (filter && loaded && audioSource) {

            if (percentageValue > 0.8) {
                filter.type = filterType;
                filter.frequency.value = filterHz;
            }

            else {
                let scaledPercentageValue = scaleVal(percentageValue);
                filter.type = "lowpass";
                filter.frequency.value = scaledPercentageValue;
            }


        }


    }, [percentageValue]);

    return loaded;

}


const scaleVal = (value) => {
    let scaled = ((HIGHEST - LOWEST) * value) + LOWEST;
    return scaled;
}
