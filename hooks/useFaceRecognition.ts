import { useState, useEffect } from 'react';
import * as faceapi from 'face-api.js';

export default function useFaceRecognition(videoRef: any) {
    const [output, setOutput] = useState('?');

    useEffect(() => {
        Promise.all([
            faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
            faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
            faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
            faceapi.nets.faceExpressionNet.loadFromUri('/models')
        ]).then(() => {
            navigator.getUserMedia(
                { video: {} },
                stream => {
                    if (videoRef.current) {
                        videoRef.current.srcObject = stream
                    }
                },
                err => console.error(err)
            )
        });

        function onPlay() {
            setInterval(async () => {
                const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions()

                if (detections && detections[0]) {
                    let val = detections[0].expressions

                    if (val) {
                        const sortedKeys = Object.keys(val).sort((a, b) => {
                            const valueA = val[a];
                            const valueB = val[b];

                            return valueB - valueA;
                        });


                        setOutput(sortedKeys[0] + ": " + val[sortedKeys[0]]);
                    } else {
                        setOutput('?');
                    }
                }
            }, 100)
        }

        videoRef.current?.addEventListener('play', onPlay);

        return () => {
            videoRef.current?.removeEventListener('play', onPlay);
        };
    }, [videoRef]);

    // run all weird code and finally do setOutput(...)


    return output;
}
