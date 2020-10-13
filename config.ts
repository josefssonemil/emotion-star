import { Expression } from "./types/Expressions";
import { Level, Note } from "./types/Level";

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

function randomExpression(): Expression {
  const expression = allowedExpressions[
    Math.floor(Math.random() * 5) - 1
  ] as Expression;
  return expression;
}

export const exampleNotes: Note[] = [
  {
    duration: 6,
  },
  {
    expression: "happy",
    duration: 3,
  },
  {
    expression: "angry",
    duration: 3,
  },
  {
    expression: "happy",
    duration: 3,
  },
  {
    expression: "surprised",
    duration: 3,
  },
  {
    expression: "sad",
    duration: 3,
  },
  {
    expression: "happy",
    duration: 3,
  },
  {
    expression: "neutral",
    duration: 3,
  },
  {
    expression: "surprised",
    duration: 3,
  },
  {
    expression: "neutral",
    duration: 3,
  },
  {
    expression: "angry",
    duration: 3,
  },
  {
    expression: "happy",
    duration: 3,
  },
  {
    expression: "angry",
    duration: 3,
  },
  {
    expression: "happy",
    duration: 3,
  },
  {
    expression: "surprised",
    duration: 3,
  },
  {
    expression: "sad",
    duration: 3,
  },
  {
    expression: "happy",
    duration: 3,
  },
];
export const fearlessPlayer1: Note[] = [
  {
    duration: 7,
  },
  {
    expression: "happy",
    duration: 1,
  },
  {
    expression: "angry",
    duration: 1,
  },
  {
    expression: "sad",
    duration: 1,
  },
  {
    duration: 3,
  },
  {
    expression: randomExpression(),
    duration: 3,
  },
  {
    expression: randomExpression(),
    duration: 3,
  },
];
export const fearlessPlayer2: Note[] = [
  {
    duration: 10,
  },
  {
    expression: "happy",
    duration: 1,
  },
  {
    expression: "angry",
    duration: 1,
  },
  {
    expression: "sad",
    duration: 1,
  },
  {
    expression: randomExpression(),
    duration: 3,
  },
  {
    expression: randomExpression(),
    duration: 3,
  },
];

export const fearlessLevel: Level = {
  audioUrl: "/sound/fearless-cut.mp3",
  duration: 107,
  notes: [fearlessPlayer1, fearlessPlayer2],
};

export const gameConstants = {
  pixelsPerSecond: 200,
  historyDuration: 1.5,
};
