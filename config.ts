import { Expression } from "./types/Expressions";
import { Level, Note } from "./types/Level";
import { fearlessPlayer1 } from "./public/fearless/fearlessPlayer1";
import { fearlessPlayer2 } from "./public/fearless/fearlessPlayer2";


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

export const fearlessLevel: Level = {
  audioUrl: "/sound/fearless.mp3",
  duration: 107,
  notes: [fearlessPlayer1, fearlessPlayer2],
};

export const gameConstants = {
  pixelsPerSecond: 100 * 1.0,
  historyDuration: 3 / 1.0,
};
