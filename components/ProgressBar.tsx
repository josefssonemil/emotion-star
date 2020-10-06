import { motion } from "framer-motion";

export default function ProgressBar(props) {
  return (
    <div className="w-full h-4 relative">
      <div className="w-full h-2 bg-pink-200  bg-opacity-25 absolute inset-0 z-0 my-1" />
      <motion.div
        style={{
          boxShadow: "0 0 10px 1px #ed64a6",
        }}
        initial={{
          width: "0.5%",
        }}
        animate={{
          width: props.position + 0.5 + "%",
        }}
        transition={{
          ease: "linear",
        }}
        className="h-2 bg-pink-500 absolute inset-y-0 left-0 my-1"
      />
      <motion.div
        style={{
          boxShadow: "0 0 20px 2px #ed64a6",
        }}
        initial={{
          left: "0%",
        }}
        animate={{
          left: props.position + "%",
        }}
        transition={{
          ease: "linear",
        }}
        className="h-4 w-4 border-2 absolute inset-y-0 rounded-full border-pink-500  bg-pink-100 border-opacity-25 shadow-base shadow-inner"
      />
    </div>
  );
}

/*
<div
      className="w-full h-4 relative"
    >
      <div
        className="w-full h-2 bg-pink-200  bg-opacity-25 absolute inset-0 z-0 my-1"
      />
      <motion.div
        style={{
          boxShadow: "0 0 13px 1px #ed64a6",
        }}
        initial={{
          width: 0.5 + "%",
        }}
        animate={{
          width: props.gameTime + 0.5 + "%",
        }}
        transition={{
          duration: props.gameTime,
          ease: "linear",
        }}
        className="h-2 bg-pink-500 absolute inset-y-0 left-0 my-1"
      />
      <motion.div
        style={{
          boxShadow: "0 0 25px 5px #ed64a6",
        }}
        initial={{
          left: 0 + "%",
        }}
        animate={{
          left: props.gameTime + "%",
        }}
        transition={{
          duration: props.gameTime,
          ease: "linear",
        }}
        className="h-4 w-4 border-2 absolute inset-y-0 rounded-full border-pink-500  bg-pink-100 border-opacity-25 shadow-base shadow-inner"
      />
    </div>
*/
