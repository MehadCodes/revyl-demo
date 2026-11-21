import { Platform, Pressable, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EmptyState } from '@/components/tasks/empty-state';
import { ProgressSummary } from '@/components/tasks/progress-summary';
import { TaskComposer } from '@/components/tasks/task-composer';
import { TaskFilterBar } from '@/components/tasks/task-filter-bar';
import { TaskItem } from '@/components/tasks/task-item';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useTasks } from '@/features/tasks/use-tasks';
import { useTheme } from '@/hooks/use-theme';

export default function TasksScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
  };
  const theme = useTheme();
  const { visibleTasks, filter, setFilter, addTask, toggleTask, removeTask, clearDone, doneCount, totalCount } =
    useTasks();

  const contentPlatformStyle = Platform.select({
    android: {
      paddingTop: insets.top,
      paddingLeft: insets.left,
      paddingRight: insets.right,
      paddingBottom: insets.bottom,
    },
    web: {
      paddingTop: Spacing.six,
      paddingBottom: Spacing.four,
    },
  });

  return (
    <ScrollView
      style={[styles.scrollView, { backgroundColor: theme.background }]}
      contentInset={insets}
      keyboardShouldPersistTaps="handled"
      contentContainerStyle={[styles.contentContainer, contentPlatformStyle]}>
      <ThemedView style={styles.container}>
        <ThemedText type="subtitle">Tasks</ThemedText>
        <ProgressSummary done={doneCount} total={totalCount} />
        <TaskComposer onAdd={addTask} />
        <TaskFilterBar value={filter} onChange={setFilter} />

        <ThemedView style={styles.list}>
          {visibleTasks.length === 0 ? (
            <EmptyState filter={filter} />
          ) : (
            visibleTasks.map((task) => (
              <TaskItem key={task.id} task={task} onToggle={toggleTask} onRemove={removeTask} />
            ))
          )}
        </ThemedView>

        {doneCount > 0 && (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Clear completed tasks"
            onPress={clearDone}
            style={({ pressed }) => pressed && styles.pressed}>
            <ThemedText type="link">Clear completed</ThemedText>
          </Pressable>
        )}
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  container: {
    maxWidth: MaxContentWidth,
    flexGrow: 1,
    padding: Spacing.four,
    gap: Spacing.three,
  },
  list: {
    gap: Spacing.two,
  },
  pressed: {
    opacity: 0.7,
  },
});
