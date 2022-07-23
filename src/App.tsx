import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { AppProvider } from './App.provider';

import { BottomTabNavigator } from './screens/BottomTabs.navigator';
import { Platform, UIManager } from 'react-native';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
const App: React.FC = () => {
  return (
    <AppProvider>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
