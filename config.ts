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

export const exampleLevel: Level = {
  audioUrl: "/img/gaga.mp3",
  duration: 55,
  notes: [exampleNotes, exampleNotes],
};

export const gameConstants = {
  pixelsPerSecond: 100,
  historyDuration: 3,
};
