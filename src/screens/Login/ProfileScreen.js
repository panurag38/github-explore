import React, { memo, useEffect, useState, useCallback } from 'react';
import { Icon } from 'react-native-elements';
import { Text, View, TouchableOpacity } from 'react-native';
import { logout, getUserData } from '../../helpers/login';
import styles from './styles';

const ProfileScreen = (props) => {
  const {
    navigation: { navigate },
  } = props;

  const [userData, setUserData] = useState({})
  const toggleLogin = useCallback((login) => {
    if (login) {
      logout().then(() => {
        navigate('HomeScreen');
      }).catch((err) => console.log(err));
      return;
    }
    navigate('LoginScreen');
  }, []);

  async function getLoginData() {
    const data = await getUserData();
    setUserData({...data});
  }

  useEffect(() => {
    getLoginData();
  }, []);

  return (
    <View style={styles.profileContainer}>
      {userData.userName && 
        <View style={styles.userContent}>
          <Icon name="face" size={30} />
          <Text style={styles.hellotext}>Hello, {userData.userName}!</Text>
        </View>
      }
      <TouchableOpacity onPress={() => toggleLogin(userData.loggedIn)}>
        <View style={styles.loginContent}>
          {userData.loggedIn ? <Icon name="logout" /> : <Icon name="login" /> }
          <Text style={styles.text}>{userData.loggedIn ? 'Logout' : 'Login'}</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default memo(ProfileScreen);

