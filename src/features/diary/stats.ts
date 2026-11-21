import type { DiaryEntry, Mood } from './types';

export type DiaryStats = {
  total: number;
  byMood: Record<Mood, number>;
  topMood: Mood | null;
};

export function computeStats(entries: DiaryEntry[]): DiaryStats {
  const byMood: Record<Mood, number> = { great: 0, good: 0, okay: 0, low: 0 };
  for (const entry of entries) byMood[entry.mood] += 1;

  let topMood: Mood | null = null;
  for (const mood of Object.keys(byMood) as Mood[]) {
    if (byMood[mood] > 0 && (topMood === null || byMood[mood] > byMood[topMood])) {
      topMood = mood;
    }
  }

  return { total: entries.length, byMood, topMood };
}

export function matchesQuery(entry: DiaryEntry, query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return true;
  return entry.title.toLowerCase().includes(q) || entry.body.toLowerCase().includes(q);
}

export function formatDate(timestamp: number) {
  const date = new Date(timestamp);
  return date.toISOString().slice(0, 10);
}
