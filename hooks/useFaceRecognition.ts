import * as faceapi from "face-api.js";
import { MutableRefObject, useEffect, useState } from "react";
import { allowedExpressions } from "../config";
import { Expression } from "../types/Expressions";

interface FaceRecognitionState {
  loading: boolean;
  players: [Expression, Expression];
  faceBoxes: any[];
}

export default function useFaceRecognition(
  videoRef: MutableRefObject<HTMLVideoElement>,
  playing: boolean
): FaceRecognitionState {
  const [loading, setLoading] = useState(true);
  const [players, setPlayers] = useState<[Expression, Expression]>([
    undefined,
    undefined,
  ]);
  const [faceBoxes, setFaceBoxes] = useState<any[]>([undefined, undefined]);

  useEffect(() => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]).then(() => {
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    if (loading || !playing) {
      return;
    }

    let running = true;

    const execute = async () => {
      const playerExpressions = [undefined, undefined];
      const playerFaceBoxes = [undefined, undefined];

      if (
        videoRef.current &&
        !videoRef.current.paused &&
        !videoRef.current.ended
      ) {
        // Obtain faces from the video frame
        const allFaces = await faceapi
          .detectAllFaces(
            videoRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceExpressions();

        // Sort faces by the X axis
        const allFacesSorted = allFaces.sort((a, b) => {
          if (a.detection.box.x > b.detection.box.x) {
            return 1;
          }

          if (a.detection.box.x < b.detection.box.x) {
            return -1;
          }

          return 0;
        });

        // Take the first (left-most) and the last face (right-most)
        const playerFaces = [
          allFacesSorted.shift(),
          allFacesSorted.pop(),
        ].filter((el) => el !== undefined);

        // Create an array that maps face index to player index
        const playerIndexForFace = playerFaces.map((face) => {
          // Player 2 is on the left half of the screen
          if (
            face.detection.box.left + face.detection.box.width / 2 <=
            1280 / 2
          ) {
            return 1;
          }

          // Player 1 is to the right
          return 0;
        });

        // Get the sorted expressions for each face
        const expressions = playerFaces.map((face) =>
          face.expressions
            .asSortedArray()
            .filter((expression) =>
              allowedExpressions.includes(expression.expression)
            )
        );

        // Finally assign the resulting top expression
        expressions.forEach((expressions, index) => {
          const playerIndex = playerIndexForFace[index];
          playerExpressions[playerIndex] = expressions[0].expression;

          const box = playerFaces[index].detection.box.toSquare();

          playerFaceBoxes[playerIndex] = {
            left: 0,
            top: box.top,
            width: box.width,
            height: box.height,
          };

          if (playerIndex === 0) {
            playerFaceBoxes[playerIndex].left = 1280 - box.right;
          } else {
            playerFaceBoxes[playerIndex].left = 1280 / 2 - box.right;
          }
        });
      }

      setPlayers(playerExpressions);
      setFaceBoxes(playerFaceBoxes);

      if (running) {
        setTimeout(execute, 100);
      }
    };

    execute();

    return () => {
      running = false;
    };
  }, [loading, videoRef.current, playing]);

  return {
    loading,
    players,
    faceBoxes,
  };
}
