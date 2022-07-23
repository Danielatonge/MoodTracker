import { View, Text, StyleSheet, Pressable } from 'react-native';
import React from 'react';
import { MoodOptionWithTimestamp } from '../types';
import { format } from 'date-fns';
import { theme } from '../theme';

type MoodItemProps = MoodOptionWithTimestamp & {
  onDelete: (moodToDelete: MoodOptionWithTimestamp) => void;
};

const MoodItemRow: React.FC<MoodItemProps> = ({
  mood,
  timestamp,
  onDelete,
}) => {
  return (
    <View style={styles.itemWrapper}>
      <Text
        style={[
          styles.moodTitle,
          { fontFamily: theme.fontFamilyBold, color: theme.colorPurple },
        ]}>
        {mood.emoji} {''} {mood.description}
      </Text>
      <Text
        style={{
          color: theme.colorLavender,
          fontFamily: theme.fontFamilyRegular,
        }}>
        {format(new Date(timestamp), "d MMM, yyyy 'at' hh:mmaaa")}
      </Text>

      <Pressable
        onPress={() => {
          onDelete({ mood, timestamp });
        }}
        style={{ padding: 8 }}>
        <Text
          style={{
            fontFamily: theme.fontFamilyRegular,
            color: theme.colorPurple,
          }}>
          Delete
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  moodTitle: {
    fontSize: 20,
  },
  itemWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 16,
    paddingVertical: 20,
    borderRadius: 10,
    marginVertical: 5,
  },
});

export { MoodItemRow };
