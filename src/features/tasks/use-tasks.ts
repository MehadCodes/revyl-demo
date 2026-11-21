import { useCallback, useMemo, useReducer, useRef, useState } from 'react';

import { tasksReducer } from './reducer';
import { SEED_TASKS } from './seed';
import type { Task, TaskFilter, TaskPriority } from './types';

export function useTasks() {
  const [tasks, dispatch] = useReducer(tasksReducer, SEED_TASKS);
  const [filter, setFilter] = useState<TaskFilter>('all');
  const nextId = useRef(1);

  const addTask = useCallback((title: string, priority: TaskPriority) => {
    const trimmed = title.trim();
    if (!trimmed) return false;
    dispatch({ type: 'add', id: `task-${nextId.current++}`, title: trimmed, priority });
    return true;
  }, []);

  const toggleTask = useCallback((id: string) => dispatch({ type: 'toggle', id }), []);
  const removeTask = useCallback((id: string) => dispatch({ type: 'remove', id }), []);
  const clearDone = useCallback(() => dispatch({ type: 'clearDone' }), []);

  const visibleTasks = useMemo<Task[]>(() => {
    if (filter === 'active') return tasks.filter((task) => !task.done);
    if (filter === 'done') return tasks.filter((task) => task.done);
    return tasks;
  }, [tasks, filter]);

  const doneCount = useMemo(() => tasks.filter((task) => task.done).length, [tasks]);

  return {
    tasks,
    visibleTasks,
    filter,
    setFilter,
    addTask,
    toggleTask,
    removeTask,
    clearDone,
    doneCount,
    totalCount: tasks.length,
  };
}
