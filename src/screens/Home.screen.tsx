import { StyleSheet, ImageBackground, View, Pressable } from 'react-native';
import React from 'react';
import { MoodPicker } from '../components/MoodPicker';
import { useAppContext } from '../App.provider';

const imageUrl =
  'https://images.unsplash.com/photo-1474540412665-1cdae210ae6b?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1766&q=80';

export const Home = () => {
  const appContext = useAppContext();

  return (
    <ImageBackground source={{ uri: imageUrl }} style={styles.container}>
      <MoodPicker onSelectMood={appContext.onSelected} />
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  box: {
    height: 100,
    width: 100,
    backgroundColor: 'gray',
  },
});
