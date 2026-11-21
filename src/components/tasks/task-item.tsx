import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import type { Task } from '@/features/tasks/types';

import { PriorityBadge } from './priority-badge';

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onRemove: (id: string) => void;
};

export function TaskItem({ task, onToggle, onRemove }: Props) {
  return (
    <ThemedView type="backgroundElement" style={styles.row} testID={`task-${task.id}`}>
      <Pressable
        accessibilityRole="checkbox"
        accessibilityLabel={`Mark ${task.title} as ${task.done ? 'not done' : 'done'}`}
        accessibilityState={{ checked: task.done }}
        onPress={() => onToggle(task.id)}
        style={styles.main}>
        <ThemedView
          type={task.done ? 'text' : 'backgroundSelected'}
          style={styles.checkbox}
        />
        <ThemedText
          style={[styles.title, task.done && styles.doneText]}
          themeColor={task.done ? 'textSecondary' : 'text'}>
          {task.title}
        </ThemedText>
      </Pressable>
      <PriorityBadge priority={task.priority} />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Delete ${task.title}`}
        onPress={() => onRemove(task.id)}
        hitSlop={Spacing.two}>
        <ThemedText type="smallBold" themeColor="textSecondary">
          ✕
        </ThemedText>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
    padding: Spacing.three,
    borderRadius: Spacing.three,
  },
  main: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.two,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 10,
  },
  title: {
    flex: 1,
  },
  doneText: {
    textDecorationLine: 'line-through',
  },
});
