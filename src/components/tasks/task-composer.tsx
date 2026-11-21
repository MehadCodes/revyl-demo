import { useState } from 'react';
import { Pressable, StyleSheet, TextInput } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';
import { TASK_PRIORITIES, type TaskPriority } from '@/features/tasks/types';

type Props = { onAdd: (title: string, priority: TaskPriority) => boolean };

export function TaskComposer({ onAdd }: Props) {
  const theme = useTheme();
  const [title, setTitle] = useState('');
  const [priority, setPriority] = useState<TaskPriority>('medium');

  const submit = () => {
    if (onAdd(title, priority)) setTitle('');
  };

  return (
    <ThemedView type="backgroundElement" style={styles.card}>
      <TextInput
        accessibilityLabel="New task title"
        placeholder="What needs doing?"
        placeholderTextColor={theme.textSecondary}
        value={title}
        onChangeText={setTitle}
        onSubmitEditing={submit}
        returnKeyType="done"
        style={[styles.input, { color: theme.text, backgroundColor: theme.backgroundSelected }]}
      />
      <ThemedView type="backgroundElement" style={styles.row}>
        {TASK_PRIORITIES.map(({ key, label }) => (
          <Pressable
            key={key}
            accessibilityRole="button"
            accessibilityLabel={`Set priority ${label}`}
            accessibilityState={{ selected: priority === key }}
            onPress={() => setPriority(key)}
            style={({ pressed }) => pressed && styles.pressed}>
            <ThemedView
              type={priority === key ? 'text' : 'backgroundSelected'}
              style={styles.priorityChip}>
              <ThemedText type="small" style={{ color: priority === key ? theme.background : theme.text }}>
                {label}
              </ThemedText>
            </ThemedView>
          </Pressable>
        ))}
      </ThemedView>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Add task"
        onPress={submit}
        style={({ pressed }) => pressed && styles.pressed}>
        <ThemedView type="text" style={styles.addButton}>
          <ThemedText type="smallBold" style={{ color: theme.background }}>
            Add task
          </ThemedText>
        </ThemedView>
      </Pressable>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.three,
    borderRadius: Spacing.three,
    gap: Spacing.three,
  },
  input: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.two,
    fontSize: 16,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  priorityChip: {
    paddingVertical: Spacing.one,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.five,
  },
  addButton: {
    alignItems: 'center',
    paddingVertical: Spacing.two,
    borderRadius: Spacing.two,
  },
  pressed: {
    opacity: 0.7,
  },
});
