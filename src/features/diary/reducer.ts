import type { DiaryEntry, Mood } from './types';

export type DiaryAction =
  | { type: 'add'; id: string; title: string; body: string; mood: Mood; createdAt: number }
  | { type: 'remove'; id: string };

export function diaryReducer(state: DiaryEntry[], action: DiaryAction): DiaryEntry[] {
  switch (action.type) {
    case 'add':
      return [
        {
          id: action.id,
          title: action.title,
          body: action.body,
          mood: action.mood,
          createdAt: action.createdAt,
        },
        ...state,
      ];
    case 'remove':
      return state.filter((entry) => entry.id !== action.id);
    default:
      return state;
  }
}
