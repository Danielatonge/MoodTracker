import { ScrollView } from 'react-native';
import React from 'react';
import { useAppContext } from '../App.provider';
import { MoodItemRow } from '../components/MoodItemRow';

export const History = () => {
  const appContext = useAppContext();

  return (
    <ScrollView>
      {appContext.moodList
        .slice()
        .reverse()
        .map(item => (
          <MoodItemRow
            key={item.timestamp}
            mood={item.mood}
            timestamp={item.timestamp}
          />
        ))}
    </ScrollView>
  );
};
