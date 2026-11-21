import { Pressable, StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import { formatDate } from '@/features/diary/stats';
import { MOODS, type DiaryEntry } from '@/features/diary/types';

type Props = { entry: DiaryEntry; onRemove: (id: string) => void };

export function EntryCard({ entry, onRemove }: Props) {
  const mood = MOODS.find((item) => item.key === entry.mood);

  return (
    <ThemedView type="backgroundElement" style={styles.card} testID={`entry-${entry.id}`}>
      <ThemedView type="backgroundElement" style={styles.header}>
        <ThemedText type="smallBold" style={styles.title}>
          {mood?.emoji} {entry.title}
        </ThemedText>
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={`Delete entry ${entry.title}`}
          onPress={() => onRemove(entry.id)}
          hitSlop={Spacing.two}>
          <ThemedText type="smallBold" themeColor="textSecondary">
            ✕
          </ThemedText>
        </Pressable>
      </ThemedView>
      <ThemedText type="small" themeColor="textSecondary">
        {formatDate(entry.createdAt)}
      </ThemedText>
      {entry.body ? <ThemedText>{entry.body}</ThemedText> : null}
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.three,
    borderRadius: Spacing.three,
    gap: Spacing.one,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: Spacing.two,
  },
  title: {
    flex: 1,
  },
});
