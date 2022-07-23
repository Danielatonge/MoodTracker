import { View, Text, StyleSheet, Pressable } from 'react-native';
import React, { useCallback, useState } from 'react';
import { MoodOptionType } from '../types';
import { theme } from '../theme';

const moodOptions: MoodOptionType[] = [
  { emoji: '🧑‍💻', description: 'studious' },
  { emoji: '🤔', description: 'pensive' },
  { emoji: '😊', description: 'happy' },
  { emoji: '🥳', description: 'celebratory' },
  { emoji: '😤', description: 'frustrated' },
];

type MoodPickerProps = {
  onSelectMood: (moodOption: MoodOptionType) => void;
};

export const MoodPicker: React.FC<MoodPickerProps> = ({ onSelectMood }) => {
  const [selectedMood, setSelectedMood] = useState<MoodOptionType>();

  const moodSelected = useCallback(() => {
    if (selectedMood) {
      onSelectMood(selectedMood);
      setSelectedMood(undefined);
    }
  }, [onSelectMood, selectedMood]);
  return (
    <View style={styles.moodPickerWrapper}>
      <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>
        How are you right now?
      </Text>
      <View style={styles.iconsContainer}>
        {moodOptions.map(mood => (
          <View key={mood.emoji}>
            <Pressable
              onPress={() => setSelectedMood(mood)}
              style={[
                styles.moodItem,
                selectedMood?.emoji === mood.emoji
                  ? styles.selectedMoodItem
                  : undefined,
              ]}>
              <Text style={styles.moodText}>{mood.emoji}</Text>
            </Pressable>
            <Text style={styles.descriptionText}>
              {mood.emoji === selectedMood?.emoji
                ? mood.description
                : undefined}
            </Text>
          </View>
        ))}
      </View>
      <Pressable onPress={() => moodSelected()} style={styles.button}>
        <Text style={{ fontWeight: 'bold', color: 'white' }}>Choose</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  iconsContainer: {
    flexDirection: 'row',
    padding: 20,
    justifyContent: 'space-between',
  },
  moodText: {
    fontSize: 24,
  },
  moodItem: {
    borderRadius: 50,
    height: 60,
    width: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedMoodItem: {
    backgroundColor: '#454C73',
    borderWidth: 2,
    borderColor: 'white',
  },
  descriptionText: {
    fontSize: 8,
    fontWeight: 'bold',
    color: '#454C73',
    textAlign: 'center',
  },
  button: {
    paddingVertical: 10,
    borderRadius: 30,
    backgroundColor: theme.colorPurple,
    flexDirection: 'row',
    justifyContent: 'center',
    width: 140,
  },
  moodPickerWrapper: {
    alignItems: 'center',
    paddingVertical: 26,
    borderWidth: 2,
    borderRadius: 10,
  },
});
