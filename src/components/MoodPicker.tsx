import { View, Text, StyleSheet, Pressable, Image } from 'react-native';
import React, { useCallback, useState } from 'react';
import { MoodOptionType } from '../types';
import { theme } from '../theme';
import Reanimated, {
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const ReanimatedPressable = Reanimated.createAnimatedComponent(Pressable);

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

const imageSrc = require('../../assets/butterflies.png');

export const MoodPicker: React.FC<MoodPickerProps> = ({ onSelectMood }) => {
  const [selectedMood, setSelectedMood] = useState<MoodOptionType>();
  const [hasSelected, setHasSelected] = useState(false);

  const buttonStyle = useAnimatedStyle(
    () => ({
      opacity: selectedMood ? withTiming(1) : withTiming(0.5),
      transform: [{ scale: selectedMood ? withTiming(1) : withTiming(0.8) }],
    }),
    [selectedMood],
  );

  const moodSelected = useCallback(() => {
    if (selectedMood) {
      onSelectMood(selectedMood);
      setSelectedMood(undefined);
      setHasSelected(true);
    }
  }, [onSelectMood, selectedMood]);

  if (hasSelected) {
    return (
      <View style={styles.moodPickerWrapper}>
        <Image source={imageSrc} style={{ alignSelf: 'center' }} />
        <Pressable onPress={() => setHasSelected(false)} style={styles.button}>
          <Text
            style={{
              fontFamily: theme.fontFamilyBold,
              color: 'white',
            }}>
            Choose another!
          </Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.moodPickerWrapper}>
      <Text
        style={{
          fontSize: 20,
          fontFamily: theme.fontFamilyBold,
          color: theme.colorWhite,
        }}>
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
      <ReanimatedPressable
        onPress={() => moodSelected()}
        style={[styles.button, buttonStyle]}>
        <Text
          style={{
            fontFamily: theme.fontFamilyBold,
            color: 'white',
          }}>
          Choose
        </Text>
      </ReanimatedPressable>
    </View>
  );
};

const styles = StyleSheet.create({
  iconsContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
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
    fontFamily: theme.fontFamilyBold,
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
    borderColor: theme.colorPurple,
    borderRadius: 10,
    backgroundColor: 'rgba(0,0,0,0.2)',
    justifyContent: 'space-between',
    height: 240,
  },
});
