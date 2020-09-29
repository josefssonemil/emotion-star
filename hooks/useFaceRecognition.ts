import * as faceapi from "face-api.js";
import { MutableRefObject, useEffect, useState } from "react";

export default function useFaceRecognition(
  canvasRef: MutableRefObject<HTMLCanvasElement>
) {
  const [loading, setLoading] = useState(true);
  const [expression, setExpression] = useState<string | null>(null);

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
    if (!loading && canvasRef.current) {
      let running = true;

      const execute = async () => {
        const detections = await faceapi
          .detectAllFaces(
            canvasRef.current,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceExpressions();

        if (detections && detections.length > 0) {
          const expressions = detections[0].expressions.asSortedArray();
          const filteredExpressions = expressions.filter(expression => ['happy', 'angry', 'surprised', 'sad', 'neutral'].includes(expression.expression));
          setExpression(filteredExpressions[0].expression);
        } else {
          setExpression(null);
        }

        if (running) {
          setTimeout(execute, 100);
        }
      };

      execute();

      return () => {
        running = false;
      };
    }
  }, [loading, canvasRef.current]);

  return { loading, expression };
}
