import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import type { TaskPriority } from '@/features/tasks/types';

const PRIORITY_COLORS: Record<TaskPriority, string> = {
  low: '#34A853',
  medium: '#F9AB00',
  high: '#E5484D',
};

export function PriorityBadge({ priority }: { priority: TaskPriority }) {
  return (
    <ThemedView
      type="backgroundElement"
      style={[styles.badge, { borderColor: PRIORITY_COLORS[priority] }]}>
      <ThemedText type="small" style={{ color: PRIORITY_COLORS[priority] }}>
        {priority}
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingVertical: Spacing.half,
    paddingHorizontal: Spacing.two,
    borderRadius: Spacing.three,
    borderWidth: 1,
  },
});
