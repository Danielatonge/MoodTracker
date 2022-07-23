import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Home } from './Home.screen';
import { History } from './History.screen';
import { Analytics } from './Analytics.screen';
import { AnalyticsIcon, HistoryIcon, HomeIcon } from '../components/Icons';
import { theme } from '../theme';

const BottomTabs = createBottomTabNavigator();

export const BottomTabNavigator = () => {
  return (
    <BottomTabs.Navigator
      screenOptions={({ route }) => ({
        headerTitleStyle: {
          fontFamily: theme.fontFamilyBold,
        },
        tabBarActiveTintColor: theme.colorBlue,
        tabBarInactiveTintColor: theme.colorGrey,
        tabBarShowLabel: false,
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') {
            return <HomeIcon size={size} color={color} />;
          } else if (route.name === 'History') {
            return <HistoryIcon size={size} color={color} />;
          } else if (route.name === 'Analytics') {
            return <AnalyticsIcon size={size} color={color} />;
          }
          return null;
        },
      })}>
      <BottomTabs.Screen
        name="Home"
        component={Home}
        options={{ title: "Today's Mood" }}
      />
      <BottomTabs.Screen
        name="History"
        component={History}
        options={{ title: 'Past Moods' }}
      />
      <BottomTabs.Screen
        name="Analytics"
        component={Analytics}
        options={{ title: 'Fancy graphs' }}
      />
    </BottomTabs.Navigator>
  );
};
