import { StyleSheet } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';

type Props = { done: number; total: number };

export function ProgressSummary({ done, total }: Props) {
  const percent = total === 0 ? 0 : Math.round((done / total) * 100);

  return (
    <ThemedView type="backgroundElement" style={styles.card} testID="progress-summary">
      <ThemedText type="smallBold">
        {done} of {total} done
      </ThemedText>
      <ThemedView type="backgroundSelected" style={styles.track}>
        <ThemedView style={[styles.fill, { width: `${percent}%` }]} />
      </ThemedView>
      <ThemedText type="small" themeColor="textSecondary">
        {percent}% complete
      </ThemedText>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  card: {
    padding: Spacing.three,
    borderRadius: Spacing.three,
    gap: Spacing.two,
  },
  track: {
    height: 8,
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: 8,
    backgroundColor: '#208AEF',
  },
});
