import { motion } from "framer-motion";

export default function ProgressBar(props) {
  return (
    <div
      /* Wrapper */
      className="w-full h-4 relative"
    >
      <div
        /* Grey bar background */
        className="w-full h-2 bg-pink-200  bg-opacity-25 absolute inset-0 z-0 my-1"
      />
      <div
        /* Progress Bar */
        style={{
          width: props.position + 0.5 + "%",
          boxShadow: "0 0 25px 1px #ed64a6",
        }}
        className="h-2 bg-pink-500 absolute inset-y-0 left-0 my-1"
      />
      <div
        /* Progress Dot */
        style={{
          left: props.position + "%",
          boxShadow: "0 0 25px 2px #ed64a6",
        }}
        className="h-4 w-4 border-2 absolute inset-y-0 rounded-full border-pink-500  bg-pink-100 border-opacity-25 shadow-base shadow-inner"
      />
    </div>
  );
}
