import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect, useState } from 'react';

export const useAsyncStorage = <T>(key: string, initialValue: T) => {
  const [data, setData] = useState<T>(initialValue);

  const getItem = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(key);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      return initialValue;
    }
  };

  const setItem = async (value: T) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem(key, jsonValue);
      setData(value);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getItem().then(setData);
  }, []);

  return [data, setItem] as const;
};
