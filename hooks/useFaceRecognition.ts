import { useState, useEffect } from 'react';
import * as faceapi from 'face-api.js';

export default function useFaceRecognition(videoRef: any) {
    const [player1, setPlayer1] = useState('?');
    const [player2, setPlayer2] = useState('?');

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

        function getHighestExpressionValue(val: faceapi.FaceExpressions) {
            const sortedKeys = Object.keys(val).sort((a, b) => {
                const valueA = val[a];
                const valueB = val[b];

                return valueB - valueA;
            });

            return sortedKeys[0];
        }

        function onPlay() {
            setInterval(async () => {
                const detections = await faceapi.detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions()).withFaceExpressions()

                if (detections && detections.length > 0) {
                    let player1 = 0;
                    let player2 = 1;

                    if (detections.length === 2) {
                        if (detections[0].detection.box.x > detections[1].detection.box.x) {
                            player1 = 1;
                            player2 = 0;
                        }
                    }


                    const expressions = detections.map(detection => getHighestExpressionValue(detection.expressions));

                    setPlayer1(expressions[player1]);

                    if (detections.length === 2) {
                        setPlayer2(expressions[player2]);
                    } else {
                        setPlayer2('?');
                    }
                } else {
                    setPlayer1('?');
                    setPlayer2('?');
                }
            }, 100)
        }

        videoRef.current?.addEventListener('play', onPlay);

        return () => {
            videoRef.current?.removeEventListener('play', onPlay);
        };
    }, [videoRef]);

    return { player1, player2 };
}
