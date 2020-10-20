export interface HighscoreEntry {
  emoji: string;
  score: number;
  timestamp: Date;
  expressions: {
    happy: number;
    angry: number;
    surprised: number;
    sad: number;
    neutral: number;
  };
}
