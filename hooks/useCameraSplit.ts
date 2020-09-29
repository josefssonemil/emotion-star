import { MutableRefObject, useEffect, useState } from "react";

export default function useCameraSplit(
  videoRef: MutableRefObject<HTMLVideoElement>,
  canvasLeftRef: MutableRefObject<HTMLCanvasElement>,
  canvasRightRef: MutableRefObject<HTMLCanvasElement>
) {
  const [playing, setPlaying] = useState(true);

  // Stream webcam to video element
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: { width: 1280, height: 720 } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        alert(err.message);
        console.log(err);
      });

    const onPlay = () => setPlaying(true);

    videoRef.current?.addEventListener("play", onPlay);

    return () => {
      videoRef.current?.removeEventListener("play", onPlay);
    };
  }, [videoRef.current]);

  // Draw video stream to canvas
  useEffect(() => {
    if (
      !playing ||
      !canvasLeftRef.current ||
      !canvasRightRef.current ||
      !videoRef.current
    ) {
      return;
    }

    let running = true;

    const contextLeft = canvasLeftRef.current.getContext("2d");
    const contextRight = canvasRightRef.current.getContext("2d");

    const render = () => {
      contextRight.drawImage(
        videoRef.current,
        0,
        0,
        videoRef.current.width / 2,
        videoRef.current.height,
        0,
        0,
        videoRef.current.width / 2,
        videoRef.current.height
      );

      contextLeft.drawImage(
        videoRef.current,
        videoRef.current.width / 2,
        0,
        videoRef.current.width / 2,
        videoRef.current.height,
        0,
        0,
        videoRef.current.width / 2,
        videoRef.current.height
      );

      if (running) {
        requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      running = false;
    };
  }, [playing, canvasLeftRef.current, canvasRightRef.current]);

  return { playing };
}
