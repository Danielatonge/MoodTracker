import {
  View,
  Text,
  StyleSheet,
  Pressable,
  LayoutAnimation,
} from 'react-native';
import React, { useCallback } from 'react';
import { MoodOptionWithTimestamp } from '../types';
import { format } from 'date-fns';
import { theme } from '../theme';
import { useAppContext } from '../App.provider';

type MoodItemProps = MoodOptionWithTimestamp;

const MoodItemRow: React.FC<MoodItemProps> = ({ mood, timestamp }) => {
  const appContext = useAppContext();

  const handleOnDelete = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    appContext.onDelete({ mood, timestamp });
  }, [appContext, mood, timestamp]);

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

      <Pressable onPress={handleOnDelete} style={{ padding: 8 }}>
        <Text
          style={{
            fontFamily: theme.fontFamilyRegular,
            color: theme.colorBlue,
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
