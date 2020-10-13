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
const startDelay = 7;

export const fearlessPlayer1: Note[] = [
  {
    duration: startDelay,
  },
  // 1 - First part
  {
    expression: "happy",
    duration: 1,
  },
  {
    duration: 0.25,
  },
  // 2
  {
    expression: "surprised",
    duration: 1.2,
  },
  {
    duration: 0.25,
  },
  // 3
  {
    expression: "sad",
    duration: 0.8,
  },
  {
    duration: 0.25,
  },
  // 4
  {
    expression: "happy",
    duration: 0.9,
  },
  {
    duration: 0.25,
  },
  // 5 - Second part
  {
    expression: "angry",
    duration: 0.7,
  },
  {
    duration: 0.25,
  },
  // 6
  {
    expression: "happy",
    duration: 0.5,
  },
  {
    duration: 0.25,
  },
  // 7
  {
    expression: "sad",
    duration: 0.9,
  },
  {
    duration: 0.25,
  },
  // 8
  {
    expression: "neutral",
    duration: 0.7,
  },
  {
    duration: 0.25,
  },
  // 9
  {
    expression: "sad",
    duration: 1.1,
  },
  {
    duration: 0.5,
  },
  // 10
  {
    expression: "surprised",
    duration: 1.5,
  },
  {
    duration: 0.5,
  },
  // 11
  {
    expression: "happy",
    duration: 1.2,
  },
  {
    duration: 0.5,
  },
  // 12
  {
    expression: "happy",
    duration: 1.1,
  },
  {
    duration: 0.5,
  },
  // 13
  {
    expression: "sad",
    duration: 0.8,
  },
  {
    duration: 0.5,
  },
  // 14
  {
    expression: "happy",
    duration: 0.9,
  },
  {
    duration: 0.5,
  },
  // 15
  {
    expression: "angry",
    duration: 1.0,
  },
  {
    duration: 0.5,
  },
  // 16
  {
    expression: "happy",
    duration: 0.9,
  },
  {
    duration: 0.5,
  },
  // 17
  {
    expression: "sad",
    duration: 0.5,
  },
  {
    duration: 0.5,
  },
  // 18
  {
    expression: "neutral",
    duration: 0.5,
  },
  {
    duration: 0.5,
  },
  // 19
  {
    expression: "sad",
    duration: 1.7,
  },
  {
    duration: 0.5,
  },
  // 20
  {
    expression: "surprised",
    duration: 1.7,
  },
  {
    duration: 0.5,
  },
  // 21
  {
    expression: "happy",
    duration: 1.5,
  },
  {
    duration: 0.5,
  },
  // 22
  {
    expression: "happy",
    duration: 1.5,
  },
  {
    duration: 0.5,
  },
  // 23
  {
    expression: "sad",
    duration: 1.2,
  },
  {
    duration: 0.5,
  },
  // 24
  {
    expression: "happy",
    duration: 0.5,
  },
  {
    duration: 0.5,
  },
  // 25
  {
    expression: "angry",
    duration: 0.5,
  },
  {
    duration: 0.5,
  },
  // 26
  {
    expression: "happy",
    duration: 1.2,
  },
  {
    duration: 0.5,
  },
  // 27
  {
    expression: "sad",
    duration: 1.0,
  },
  {
    duration: 0.5,
  },
  // 28
  {
    expression: "neutral",
    duration: 0.9,
  },
  {
    duration: 0.5,
  },
  // 29
  {
    expression: "sad",
    duration: 0.8,
  },
  {
    duration: 0.5,
  },
  // 30
  {
    expression: "surprised",
    duration: 0.9,
  },
  {
    duration: 0.5,
  },
  // 31
  {
    expression: "happy",
    duration: 0.7,
  },
  {
    duration: 0.5,
  },
  // 32
  {
    expression: "happy",
    duration: 0.9,
  },
  {
    duration: 0.5,
  },
  // 33
  {
    expression: "sad",
    duration: 0.5,
  },
  {
    duration: 0.5,
  },
  // 34
  {
    expression: "happy",
    duration: 1.0,
  },
  {
    duration: 0.5,
  },
  // 35
  {
    expression: "angry",
    duration: 1.0,
  },
  {
    duration: 0.5,
  },
  // 36
  {
    expression: "happy",
    duration: 0.5,
  },
  {
    duration: 0.5,
  },
  // 37
  {
    expression: "sad",
    duration: 1.2,
  },
  {
    duration: 0.5,
  },
  // 38
  {
    expression: "neutral",
    duration: 1.2,
  },
  {
    duration: 0.5,
  },
  // 39
  {
    expression: "sad",
    duration: 2.0,
  },
  {
    duration: 0.5,
  },
  // 40
  {
    expression: "surprised",
    duration: 2.0,
  },
  {
    duration: 0.5,
  },
  // 41
  {
    expression: "happy",
    duration: 0.7,
  },
  {
    duration: 0.5,
  },
  // 42
  {
    expression: "happy",
    duration: 0.9,
  },
  {
    duration: 0.5,
  },
  // 43
  {
    expression: "sad",
    duration: 0.5,
  },
  {
    duration: 0.5,
  },
  // 44
  {
    expression: "happy",
    duration: 1.0,
  },
  {
    duration: 0.5,
  },
  // 45
  {
    expression: "angry",
    duration: 1.0,
  },
  {
    duration: 0.5,
  },
  // 46
  {
    expression: "happy",
    duration: 0.5,
  },
  {
    duration: 0.5,
  },
  // 47
  {
    expression: "sad",
    duration: 1.2,
  },
  {
    duration: 0.5,
  },
  // 48
  {
    expression: "neutral",
    duration: 1.2,
  },
  {
    duration: 0.5,
  },
  // 49
  {
    expression: "sad",
    duration: 2.0,
  },
  {
    duration: 0.5,
  },
  // 50
  {
    expression: "surprised",
    duration: 2.0,
  },
  {
    duration: 0.5,
  },
];
export const fearlessPlayer2: Note[] = [];

export const fearlessLevel: Level = {
  audioUrl: "/sound/fearless.mp3",
  duration: 82,
  notes: [fearlessPlayer1, fearlessPlayer2],
};

export const gameConstants = {
  pixelsPerSecond: 200,
  historyDuration: 1.5,
};
