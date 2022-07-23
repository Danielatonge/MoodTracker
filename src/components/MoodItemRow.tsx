import { View, Text, StyleSheet } from 'react-native';
import React from 'react';
import { MoodOptionWithTimestamp } from '../types';
import { format } from 'date-fns';
import { theme } from '../theme';

type MoodItemProps = MoodOptionWithTimestamp;

const MoodItemRow: React.FC<MoodItemProps> = ({ mood, timestamp }) => {
  return (
    <View style={styles.itemWrapper}>
      <Text
        style={{ fontWeight: 'bold', fontSize: 20, color: theme.colorPurple }}>
        {mood.emoji} {''} {mood.description}
      </Text>
      <Text style={{ color: theme.colorLavender }}>
        {format(new Date(timestamp), "d MMM, yyyy 'at' hh:mmaaa")}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
