import React, { useCallback, useEffect, useState } from 'react';
import { createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { MoodOptionType, MoodOptionWithTimestamp } from './types';

const storageKey = 'test:my-mood-tracker-data';

type AppData = {
  moods: MoodOptionWithTimestamp[];
};

const getAppData = async (): Promise<AppData | null> => {
  try {
    const data = await AsyncStorage.getItem(storageKey);

    if (data) {
      return JSON.parse(data);
    }
    return null;
  } catch {
    return null;
  }
};

const setAppData = async (newData: AppData): Promise<void> => {
  try {
    await AsyncStorage.setItem(storageKey, JSON.stringify(newData));
  } catch {
    return;
  }
};

type AppContextType = {
  moodList: MoodOptionWithTimestamp[];
  onSelected: (mood: MoodOptionType) => void;
  onDelete: (moodToDelete: MoodOptionWithTimestamp) => void;
};

const AppContext = createContext<AppContextType>({
  moodList: [],
  onSelected: () => {},
  onDelete: () => {},
});

type AppProviderProps = {};

export const AppProvider = ({
  children,
}: React.PropsWithChildren<AppProviderProps>) => {
  const [moodList, setMoodList] = useState<MoodOptionWithTimestamp[]>([]);

  const handleSelectMood = useCallback((selectedMood: MoodOptionType) => {
    setMoodList(current => {
      const newValue = [
        ...current,
        { mood: selectedMood, timestamp: Date.now() },
      ];
      setAppData({ moods: newValue });
      return newValue;
    });
  }, []);

  const handleDeleteMood = useCallback(
    (moodToDelete: MoodOptionWithTimestamp) => {
      setMoodList(current => {
        const newValue = current.filter(
          mood => mood.timestamp !== moodToDelete.timestamp,
        );
        setAppData({ moods: newValue });
        return newValue;
      });
    },
    [],
  );

  useEffect(() => {
    const getDataFromStorage = async () => {
      const data = await getAppData();
      if (data) {
        setMoodList(data.moods);
      }
    };
    getDataFromStorage();
  }, []);

  return (
    <AppContext.Provider
      value={{
        moodList: moodList,
        onSelected: handleSelectMood,
        onDelete: handleDeleteMood,
      }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => React.useContext(AppContext);
