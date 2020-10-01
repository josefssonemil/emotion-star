import { motion } from "framer-motion";

export default function ProgressBar(props) {
  return (
    <div
      /* Wrapper */
      className="w-full h-4 relative"
    >
      <div
        /* Grey bar background */
        className="w-full h-2 bg-yellow-200  bg-opacity-25 absolute inset-0 z-0 my-1"
      />
      <div
        /* Progress Bar */
        style={{
          width: props.position,
          boxShadow: "0 0 25px 1px #f6e05e",
        }}
        className="h-2 bg-yellow-400 absolute inset-y-0 left-0 my-1"
      />
      <div
        /* Progress Dot */
        style={{
          left: props.position,
          boxShadow: "0 0 25px 2px #f6e05e",
        }}
        className="h-4 w-4 border-2 absolute inset-y-0 rounded-full border-yellow-400 border-opacity-25 bg-yellow-100 shadow-base shadow-inner"
      />
    </div>
  );
}
