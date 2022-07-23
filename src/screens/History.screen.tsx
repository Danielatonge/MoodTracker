import { FlatList, View } from 'react-native';
import React from 'react';
import { useAppContext } from '../App.provider';
import { MoodItemRow } from '../components/MoodItemRow';

export const History = () => {
  const appContext = useAppContext();

  return (
    <View>
      <FlatList
        data={appContext.moodList}
        keyExtractor={item => `${item.timestamp}`}
        renderItem={({ item }) => (
          <MoodItemRow
            mood={item.mood}
            timestamp={item.timestamp}
            onDelete={appContext.onDelete}
          />
        )}
      />
    </View>
  );
};
