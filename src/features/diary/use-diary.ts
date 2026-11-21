import { useCallback, useMemo, useReducer, useRef, useState } from 'react';

import { diaryReducer } from './reducer';
import { SEED_ENTRIES } from './seed';
import { computeStats, matchesQuery } from './stats';
import type { Mood } from './types';

export function useDiary() {
  const [entries, dispatch] = useReducer(diaryReducer, SEED_ENTRIES);
  const [query, setQuery] = useState('');
  const nextId = useRef(1);

  const addEntry = useCallback((title: string, body: string, mood: Mood) => {
    const trimmedTitle = title.trim();
    if (!trimmedTitle) return false;
    dispatch({
      type: 'add',
      id: `entry-${nextId.current++}`,
      title: trimmedTitle,
      body: body.trim(),
      mood,
      createdAt: Date.now(),
    });
    return true;
  }, []);

  const removeEntry = useCallback((id: string) => dispatch({ type: 'remove', id }), []);

  const visibleEntries = useMemo(
    () => entries.filter((entry) => matchesQuery(entry, query)),
    [entries, query],
  );
  const stats = useMemo(() => computeStats(entries), [entries]);

  return { entries, visibleEntries, query, setQuery, addEntry, removeEntry, stats };
}
