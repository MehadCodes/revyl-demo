import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { TASK_FILTERS, type TaskFilter } from '@/features/tasks/types';

type Props = { value: TaskFilter; onChange: (filter: TaskFilter) => void };

export function TaskFilterBar({ value, onChange }: Props) {
  return (
    <ThemedView style={styles.row}>
      {TASK_FILTERS.map(({ key, label }) => {
        const selected = key === value;
        return (
          <Pressable
            key={key}
            accessibilityRole="button"
            accessibilityLabel={`Show ${label} tasks`}
            accessibilityState={{ selected }}
            onPress={() => onChange(key)}
            style={({ pressed }) => pressed && styles.pressed}>
            <ThemedView
              type={selected ? 'backgroundSelected' : 'backgroundElement'}
              style={styles.chip}>
              <ThemedText type="small" themeColor={selected ? 'text' : 'textSecondary'}>
                {label}
              </ThemedText>
            </ThemedView>
          </Pressable>
        );
      })}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    gap: Spacing.two,
  },
  chip: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.five,
  },
  pressed: {
    opacity: 0.7,
  },
});
