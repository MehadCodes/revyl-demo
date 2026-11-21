import { useState } from 'react';
import { Pressable, StyleSheet, TextInput } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Spacing } from '@/constants/theme';
import type { Mood } from '@/features/diary/types';
import { useTheme } from '@/hooks/use-theme';

import { MoodPicker } from './mood-picker';

type Props = { onAdd: (title: string, body: string, mood: Mood) => boolean };

export function EntryComposer({ onAdd }: Props) {
  const theme = useTheme();
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [mood, setMood] = useState<Mood>('good');

  const submit = () => {
    if (onAdd(title, body, mood)) {
      setTitle('');
      setBody('');
    }
  };

  const inputStyle = [styles.input, { color: theme.text, backgroundColor: theme.backgroundSelected }];

  return (
    <ThemedView type="backgroundElement" style={styles.card}>
      <TextInput
        accessibilityLabel="Entry title"
        placeholder="Title"
        placeholderTextColor={theme.textSecondary}
        value={title}
        onChangeText={setTitle}
        style={inputStyle}
      />
      <TextInput
        accessibilityLabel="Entry body"
        placeholder="What happened today?"
        placeholderTextColor={theme.textSecondary}
        value={body}
        onChangeText={setBody}
        multiline
        style={[inputStyle, styles.multiline]}
      />
      <MoodPicker value={mood} onChange={setMood} />
      <Pressable
        accessibilityRole="button"
        accessibilityLabel="Save entry"
        onPress={submit}
        style={({ pressed }) => pressed && styles.pressed}>
        <ThemedView type="text" style={styles.save}>
          <ThemedText type="smallBold" style={{ color: theme.background }}>
            Save entry
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
  multiline: {
    minHeight: 80,
    textAlignVertical: 'top',
  },
  save: {
    alignItems: 'center',
    paddingVertical: Spacing.two,
    borderRadius: Spacing.two,
  },
  pressed: {
    opacity: 0.7,
  },
});
