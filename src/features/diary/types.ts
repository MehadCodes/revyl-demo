export type Mood = 'great' | 'good' | 'okay' | 'low';

export type DiaryEntry = {
  id: string;
  title: string;
  body: string;
  mood: Mood;
  createdAt: number;
};

export const MOODS: { key: Mood; label: string; emoji: string }[] = [
  { key: 'great', label: 'Great', emoji: '😄' },
  { key: 'good', label: 'Good', emoji: '🙂' },
  { key: 'okay', label: 'Okay', emoji: '😐' },
  { key: 'low', label: 'Low', emoji: '😞' },
];
