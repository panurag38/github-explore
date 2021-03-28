import React from 'react';
import { ToastAndroid, Platform, AlertIOS } from 'react-native';

const toaster = (msg) => {
  if (Platform.OS === 'android') {
    ToastAndroid.show(msg, ToastAndroid.SHORT)
  } else if (Platform.OS === 'ios') {
    AlertIOS.alert(msg);
  }
};

export default toaster;