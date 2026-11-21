import { StyleSheet, TextInput } from 'react-native';

import { Spacing } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

type Props = { value: string; onChange: (value: string) => void };

export function SearchBar({ value, onChange }: Props) {
  const theme = useTheme();

  return (
    <TextInput
      accessibilityLabel="Search entries"
      placeholder="Search entries"
      placeholderTextColor={theme.textSecondary}
      value={value}
      onChangeText={onChange}
      autoCapitalize="none"
      autoCorrect={false}
      style={[styles.input, { color: theme.text, backgroundColor: theme.backgroundElement }]}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    paddingVertical: Spacing.two,
    paddingHorizontal: Spacing.three,
    borderRadius: Spacing.three,
    fontSize: 16,
  },
});
