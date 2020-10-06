import { Expression } from "./types/Expressions";

export const allowedExpressions = [
  "happy",
  "angry",
  "surprised",
  "sad",
  "neutral",
];

export const emojis = {
  happy: "😄",
  angry: "😡",
  surprised: "😯",
  sad: "😢",
  neutral: "😐",
};

interface Note {
  expression?: Expression;
  duration: number;
}
const duration = 3000;

export const gameLayer: Note[] = [
  {
    expression: "happy",
    duration: duration,
  },
  {
    expression: "angry",
    duration: duration,
  },
  {
    expression: "happy",
    duration: duration,
  },
  {
    expression: "surprised",
    duration: duration,
  },
  {
    expression: "sad",
    duration: duration,
  },
  {
    expression: "happy",
    duration: duration,
  },
  {
    expression: "neutral",
    duration: duration,
  },
  {
    expression: "surprised",
    duration: duration,
  },
  {
    expression: "neutral",
    duration: duration,
  },
  {
    expression: "angry",
    duration: duration,
  },
];
/*
{
    expression: allowedExpressions[Math.floor(Math.random()*5)],
    duration: duration,
  },
*/
