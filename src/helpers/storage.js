import React from 'react';
import AsyncStorage from '@react-native-community/async-storage';

async function set(keyword, value) {
  try {
    await AsyncStorage.setItem(keyword, JSON.stringify(value));
  } catch (error) {
    console.log('async storage setItem error saving key', error);
  }
}

const fetchItem = async (keyword) => {
  try {
    const values = await AsyncStorage.getItem(keyword);
    const itemValue = JSON.parse(values);
    if (itemValue !== null) {
      return itemValue;
    }
    return undefined;
  } catch (error) {
    console.log('error fetching from async storage', error);
  }
};

async function get(keyword) {
  const value = await fetchItem(keyword);
  return value;
}


const remove = (keyword) => {
  try {
    AsyncStorage.removeItem(keyword);
  } catch (error) {
    console.log('async storage removeItem error', error);
  }
};

const Storage = { get, set, remove };
export default Storage;