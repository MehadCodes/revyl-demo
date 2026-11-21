import { Platform, ScrollView, StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { EntryCard } from '@/components/diary/entry-card';
import { EntryComposer } from '@/components/diary/entry-composer';
import { SearchBar } from '@/components/diary/search-bar';
import { StatsCard } from '@/components/diary/stats-card';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { BottomTabInset, MaxContentWidth, Spacing } from '@/constants/theme';
import { useDiary } from '@/features/diary/use-diary';
import { useTheme } from '@/hooks/use-theme';

export default function DiaryScreen() {
  const safeAreaInsets = useSafeAreaInsets();
  const insets = {
    ...safeAreaInsets,
    bottom: safeAreaInsets.bottom + BottomTabInset + Spacing.three,
  };
  const theme = useTheme();
  const { visibleEntries, query, setQuery, addEntry, removeEntry, stats } = useDiary();

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
        <ThemedText type="subtitle">Diary</ThemedText>
        <StatsCard stats={stats} />
        <EntryComposer onAdd={addEntry} />
        <SearchBar value={query} onChange={setQuery} />
        <ThemedView style={styles.list}>
          {visibleEntries.length === 0 ? (
            <ThemedText themeColor="textSecondary" style={styles.empty} testID="diary-empty">
              {query ? 'No entries match your search.' : 'No entries yet. Write your first one.'}
            </ThemedText>
          ) : (
            visibleEntries.map((entry) => (
              <EntryCard key={entry.id} entry={entry} onRemove={removeEntry} />
            ))
          )}
        </ThemedView>
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
  empty: {
    textAlign: 'center',
    paddingVertical: Spacing.five,
  },
});
