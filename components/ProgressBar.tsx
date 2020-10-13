import { motion } from "framer-motion";

interface Props {
  progress: number;
}

export default function ProgressBar(props: Props) {
  return (
    <div className="relative w-full h-4">
      <div className="absolute inset-0 z-0 w-full h-2 my-1 bg-pink-200 bg-opacity-25 rounded-lg" />
      <motion.div
        style={{
          boxShadow: "0 0 10px 1px #ed64a6",
        }}
        initial={{
          width: "0.5%",
        }}
        animate={{
          width: `${props.progress * 100 + 0.5}%`,
        }}
        transition={{
          ease: "linear",
        }}
        className="absolute inset-y-0 left-0 h-2 my-1 bg-pink-500 rounded-lg"
      />
      <motion.div
        style={{
          boxShadow: "0 0 20px 2px #ed64a6",
        }}
        initial={{
          left: "0%",
        }}
        animate={{
          left: `${props.progress * 100}%`,
        }}
        transition={{
          ease: "linear",
        }}
        className="absolute inset-y-0 w-4 h-4 bg-pink-100 border-2 border-pink-500 border-opacity-25 rounded-full shadow-inner shadow-base"
      />
    </div>
  );
}
