import { NavigationContainer } from '@react-navigation/native';
import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { Platform, UIManager } from 'react-native';

import { AppProvider } from './App.provider';
import { BottomTabNavigator } from './screens/BottomTabs.navigator';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}
const App: React.FC = () => {
  useEffect(() => {
    SplashScreen.hide();
  }, []);
  return (
    <AppProvider>
      <NavigationContainer>
        <BottomTabNavigator />
      </NavigationContainer>
    </AppProvider>
  );
};

export default App;
