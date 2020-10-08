import { Expression } from "./Expressions";

export interface Level {
  audioUrl: string;
  duration: number;
  notes: [Note[], Note[]];
}

export interface Note {
  expression?: Expression;
  duration: number;
  start?: number;
}
