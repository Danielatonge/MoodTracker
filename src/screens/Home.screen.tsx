import { View, StyleSheet, Image } from 'react-native';
import React from 'react';
import { MoodPicker } from '../components/MoodPicker';
import { useAppContext } from '../App.provider';

const imageSrc = require('../../assets/butterflies.png');

export const Home = () => {
  const appContext = useAppContext();
  return (
    <View style={styles.container}>
      <Image source={imageSrc} />
      <MoodPicker onSelectMood={appContext.onSelected} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
});
