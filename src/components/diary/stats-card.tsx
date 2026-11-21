import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import type { DiaryStats } from '@/features/diary/stats';
import { MOODS } from '@/features/diary/types';

export function StatsCard({ stats }: { stats: DiaryStats }) {
  const top = MOODS.find((mood) => mood.key === stats.topMood);

  return (
    <ThemedView type="backgroundElement" style={styles.card} testID="diary-stats">
      <ThemedText type="smallBold">
        {stats.total} {stats.total === 1 ? 'entry' : 'entries'}
      </ThemedText>
      <ThemedText type="small" themeColor="textSecondary">
        {top ? `Most common mood: ${top.emoji} ${top.label}` : 'No entries yet'}
      </ThemedText>
      <ThemedView type="backgroundElement" style={styles.row}>
        {MOODS.map(({ key, emoji }) => (
          <ThemedText key={key} type="small">
            {emoji} {stats.byMood[key]}
          </ThemedText>
        ))}
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.three,
    borderRadius: Spacing.three,
    gap: Spacing.one,
  },
  row: {
    flexDirection: 'row',
    gap: Spacing.three,
    paddingTop: Spacing.one,
  },
});
