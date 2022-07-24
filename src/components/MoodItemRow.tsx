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
import { PanGestureHandler } from 'react-native-gesture-handler';
import Reanimated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

const MAXSWIPE = 80;
type MoodItemProps = MoodOptionWithTimestamp;

const MoodItemRow: React.FC<MoodItemProps> = ({ mood, timestamp }) => {
  const appContext = useAppContext();
  const translateX = useSharedValue(0);

  const handleOnDelete = useCallback(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    appContext.onDelete({ mood, timestamp });
  }, [appContext, mood, timestamp]);

  const deleteWithDelay = useCallback(() => {
    setTimeout(() => {
      handleOnDelete();
    }, 500);
  }, [handleOnDelete]);

  const onGestureEvent = useAnimatedGestureHandler(
    {
      onActive: event => {
        translateX.value = event.translationX;
      },
      onEnd: e => {
        const translationX = e.translationX;
        if (Math.abs(translationX) > MAXSWIPE) {
          translateX.value = withTiming(1000 * Math.sign(translationX));
          runOnJS(deleteWithDelay)();
        } else {
          translateX.value = withTiming(0);
        }
      },
    },
    [],
  );

  const cardStyle = useAnimatedStyle(() => ({
    transform: [{ translateX: translateX.value }],
  }));

  return (
    <PanGestureHandler
      activeOffsetX={[-1, 1]}
      activeOffsetY={[-100, 100]}
      onGestureEvent={onGestureEvent}>
      <Reanimated.View style={[styles.itemWrapper, cardStyle]}>
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
      </Reanimated.View>
    </PanGestureHandler>
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
