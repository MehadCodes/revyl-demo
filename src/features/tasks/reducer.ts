import type { Task, TaskPriority } from './types';

export type TaskAction =
  | { type: 'add'; id: string; title: string; priority: TaskPriority }
  | { type: 'toggle'; id: string }
  | { type: 'remove'; id: string }
  | { type: 'clearDone' };

export function tasksReducer(state: Task[], action: TaskAction): Task[] {
  switch (action.type) {
    case 'add':
      return [
        { id: action.id, title: action.title, priority: action.priority, done: false },
        ...state,
      ];
    case 'toggle':
      return state.map((task) => (task.id === action.id ? { ...task, done: !task.done } : task));
    case 'remove':
      return state.filter((task) => task.id !== action.id);
    case 'clearDone':
      return state.filter((task) => !task.done);
    default:
      return state;
  }
}
