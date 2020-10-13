import { useState, useEffect, MutableRefObject } from "react";



let filter, filterType, filterHz;

var audioSource;

// Prepare to receive a value which changes the fiter
export default function useAudioAPI(
    percentageValue: number,
    audioUrl: string
) {

    const [loaded, setLoaded] = useState(false);

    useEffect(() => {

        // Init audio
        const audio = new Audio(this.props.audioUrl);
        const context = new AudioContext();
        audioSource = context.createMediaElementSource(audio);

        // Create and connect filter
        filter = context.createBiquadFilter();
        audioSource.connect(filter);
        filter.connect(context.destination);

        // Save default filter settings

        filterType = filter.type;
        filterHz = filter.frequency.value;


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

        if (filter && loaded && audioSource) {

            if (this.props.percentageValue > 0.8) {
                filter.type = filterType;
                filter.frequency.value = filterHz;
            }

            else {
                filter.type = "lowpass";
                filter.frequency.value = filter.frequency.value * this.props.percentageValue;
            }
        }




    }, [this.props.percentageValue]);

    return loaded;

}

