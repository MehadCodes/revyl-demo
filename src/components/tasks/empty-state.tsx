import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import type { TaskFilter } from '@/features/tasks/types';

const MESSAGES: Record<TaskFilter, string> = {
  all: 'No tasks yet. Add your first one above.',
  active: 'Nothing left to do. Nice work!',
  done: 'No finished tasks yet.',
};

export function EmptyState({ filter }: { filter: TaskFilter }) {
  return (
    <ThemedView style={styles.container} testID="tasks-empty-state">
      <ThemedText themeColor="textSecondary" style={styles.text}>
        {MESSAGES[filter]}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.five,
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
  },
});
