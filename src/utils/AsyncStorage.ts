import AsyncStorage from '@react-native-async-storage/async-storage';

export const setAsyncStorage = async ({ value, key }: { value: string; key: string }) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (e) {
    // saving error
  }
};

export const getAsyncStorage = async ({ key }: { key: string }) => {
  try {
    const value = await AsyncStorage.getItem(key);

    if (value !== null) {
      return value;
    }
    return null;
  } catch (e) {
    // error reading value
  }
};

export const removeAsyncStorage = async ({ key }: { key: string }) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (e) {
    // error reading value
  }
};