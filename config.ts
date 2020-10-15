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
const startDelay = 7.9;

export const fearlessPlayer1: Note[] = [
  {
    duration: startDelay,
  },
  // 1
  {
    expression: "happy",
    duration: 1.2,
  },
  {
    duration: 0.35,
  },
  // 2
  {
    expression: "angry",
    duration: 1.3,
  },
  {
    duration: 0.35,
  },
  // 3
  {
    expression: "neutral",
    duration: 0.8,
  },
  {
    duration: 0.35,
  },
  // 4
  {
    expression: "happy",
    duration: 1.3,
  },
  {
    duration: 0.35,
  },
  // 5
  {
    expression: "neutral",
    duration: 0.6,
  },
  {
    duration: 0.35,
  },
  // 6
  {
    expression: "surprised",
    duration: 0.5,
  },
  {
    duration: 0.35,
  },
  // 7
  {
    expression: "angry",
    duration: 0.9,
  },
  {
    duration: 0.35,
  },
  // 8
  {
    expression: "sad",
    duration: 0.7,
  },
  {
    duration: 0.35,
  },
  // 9
  {
    expression: "happy",
    duration: 1.1,
  },
  {
    duration: 0.35,
  },
  // 10
  {
    expression: "neutral",
    duration: 1.5,
  },
  {
    duration: 0.35,
  },
  // 11
  {
    expression: "happy",
    duration: 1.2,
  },
  {
    duration: 0.35,
  },
  // 12
  {
    expression: "angry",
    duration: 1.1,
  },
  {
    duration: 0.35,
  },
  // 13
  {
    expression: "surprised",
    duration: 0.8,
  },
  {
    duration: 0.35,
  },
  // 14
  {
    expression: "neutral",
    duration: 0.9,
  },
  {
    duration: 0.35,
  },
  // 15
  {
    expression: "happy",
    duration: 1.0,
  },
  {
    duration: 0.35,
  },
  // 16
  {
    expression: "neutral",
    duration: 0.9,
  },
  {
    duration: 0.35,
  },
  // 17
  {
    expression: "happy",
    duration: 0.5,
  },
  {
    duration: 0.35,
  },
  // 18
  {
    expression: "neutral",
    duration: 0.5,
  },
  {
    duration: 0.35,
  },
  // 19
  {
    expression: "angry",
    duration: 1.7,
  },
  {
    duration: 0.35,
  },
  // 20
  {
    expression: "sad",
    duration: 1.7,
  },
  {
    duration: 0.35,
  },
  // 21
  {
    expression: "neutral",
    duration: 1.5,
  },
  {
    duration: 0.35,
  },
  // 22
  {
    expression: "angry",
    duration: 1.3,
  },
  {
    duration: 0.35,
  },
  // 23
  {
    expression: "neutral",
    duration: 1.0,
  },
  {
    duration: 0.35,
  },
  // 24
  {
    expression: "angry",
    duration: 0.5,
  },
  {
    duration: 0.35,
  },
  // 25
  {
    expression: "neutral",
    duration: 0.5,
  },
  {
    duration: 0.35,
  },
  // 26
  {
    expression: "happy",
    duration: 1.2,
  },
  {
    duration: 0.35,
  },
  // 27
  {
    expression: "angry",
    duration: 1.0,
  },
  {
    duration: 0.35,
  },
  // 28
  {
    expression: "happy",
    duration: 0.9,
  },
  {
    duration: 0.35,
  },
  // 29
  {
    expression: "surprised",
    duration: 0.8,
  },
  {
    duration: 0.35,
  },
  // 30
  {
    expression: "sad",
    duration: 0.9,
  },
  {
    duration: 0.35,
  },
  // 31
  {
    expression: "sad",
    duration: 0.7,
  },
  {
    duration: 0.35,
  },
  // 32
  {
    expression: "surprised",
    duration: 0.9,
  },
  {
    duration: 0.35,
  },
  // 33
  {
    expression: "sad",
    duration: 0.5,
  },
  {
    duration: 0.35,
  },
  // 34
  {
    expression: "angry",
    duration: 1.0,
  },
  {
    duration: 0.35,
  },
  // 35
  {
    expression: "sad",
    duration: 1.0,
  },
  {
    duration: 0.35,
  },
  // 36
  {
    expression: "neutral",
    duration: 0.5,
  },
  {
    duration: 0.35,
  },
  // 37
  {
    expression: "sad",
    duration: 1.2,
  },
  {
    duration: 0.35,
  },
  // 38
  {
    expression: "surprised",
    duration: 1.2,
  },
  {
    duration: 0.35,
  },
  // 39
  {
    expression: "angry",
    duration: 1.5,
  },
  {
    duration: 0.35,
  },
  // 40
  {
    expression: "surprised",
    duration: 1.2,
  },
  {
    duration: 0.35,
  },
  // 41
  {
    expression: "angry",
    duration: 1.0,
  },
  {
    duration: 0.35,
  },
  // 42
  {
    expression: "sad",
    duration: 1.3,
  },
  {
    duration: 0.35,
  },
  // 43
  {
    expression: "surprised",
    duration: 1.3,
  },
  {
    duration: 0.35,
  },
  // 44
  {
    expression: "angry",
    duration: 0.8,
  },
  {
    duration: 0.35,
  },
  // 45
  {
    expression: "sad",
    duration: 0.9,
  },
  {
    duration: 0.35,
  },
  // 46
  {
    expression: "neutral",
    duration: 0.6,
  },
  {
    duration: 0.35,
  },
  // 47
  {
    expression: "angry",
    duration: 1.0,
  },
  {
    duration: 0.35,
  },
  // 48
  {
    expression: "happy",
    duration: 0.8,
  },
  {
    duration: 0.35,
  },
  // 49
  {
    expression: "angry",
    duration: 1.2,
  },
  {
    duration: 0.35,
  },
  // 50
  {
    expression: "happy",
    duration: 1.3,
  },
  {
    duration: 0.35,
  },
  // 51
  {
    expression: "angry",
    duration: 1.0,
  },
  {
    duration: 0.35,
  },
  // 52
  {
    expression: "sad",
    duration: 1.1,
  },
  {
    duration: 0.35,
  },
  // 53
  {
    expression: "angry",
    duration: 1.0,
  },
  {
    duration: 0.35,
  },
  // 54
  {
    expression: "surprised",
    duration: 0.6,
  },
  {
    duration: 0.35,
  },
  // 55
  {
    expression: "sad",
    duration: 1.2,
  },
  {
    duration: 0.35,
  },
  // 56
  {
    expression: "surprised",
    duration: 1.0,
  },
  {
    duration: 0.35,
  },
  // 57
  {
    expression: "neutral",
    duration: 1.5,
  },
  {
    duration: 0.35,
  },
  // 58
  {
    expression: "happy",
    duration: 0.8,
  },
  {
    duration: 0.35,
  },
  // 59
  {
    expression: "angry",
    duration: 1.5,
  },
  {
    duration: 0.35,
  },
  // 60
  {
    expression: "sad",
    duration: 1.3,
  },
];
export const fearlessPlayer2: Note[] = [];

export const fearlessLevel: Level = {
  audioUrl: "/sound/fearless.mp3",
  duration: 107,
  notes: [fearlessPlayer1, fearlessPlayer2],
};

export const gameConstants = {
  pixelsPerSecond: 100 * 1.5,
  historyDuration: 3 / 1.5,
};
