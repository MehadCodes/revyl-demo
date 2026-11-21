import type { DiaryEntry } from './types';

const DAY = 24 * 60 * 60 * 1000;
const BASE = Date.UTC(2026, 10, 18, 9, 0, 0);

export const SEED_ENTRIES: DiaryEntry[] = [
  {
    id: 'seed-1',
    title: 'Started the Revyl demo (fingerprint test)',
    body: 'Connected the repo, ran the first cloud build and watched the proof comment arrive.',
    mood: 'great',
    createdAt: BASE + 2 * DAY,
  },
  {
    id: 'seed-2',
    title: 'Build cache notes (third commit)',
    body: 'The second iOS build was much faster because the compile cache was warm.',
    mood: 'good',
    createdAt: BASE + DAY,
  },
  {
    id: 'seed-3',
    title: 'Slow Android build',
    body: 'Android took nine minutes cold. Need path caches for Gradle and node_modules.',
    mood: 'low',
    createdAt: BASE,
  },
];
