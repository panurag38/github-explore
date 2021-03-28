import React, { useState, memo } from 'react';
import {  } from 'react-native';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import Storage from '../../helpers/storage';
import toaster from '../../helpers/toaster';
import checkValidation from '../../helpers/checkInputValidation';
import { setUserLoggedIn } from '../../helpers/login';
import styles from '../Bookmarks/styles';

const RegisterScreen = (props) => {
  const { navigation: { navigate } } = props;

  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  async function onPressSubmit() {
    // assuming min. 3 chars for username & password
    if (userName.length > 2 && password.length > 2) {
      // first check for validation of username & password
      if (checkValidation({ type: 'userName', str: userName }) && checkValidation({ type: 'password', str: password })) {
        const obj = await Storage.get('users') || {};
        // obj -> { username1: password, username2: password, ...}
        if (obj[userName.toLowerCase()]) {
          toaster('Username already exist');
          return;
        } else {
          obj[userName.toLowerCase()] = password;
        }
        await Storage.set('users', { ...obj }); // should add multiple
        await setUserLoggedIn({ userName, password }).then(() => {
          navigate('HomeScreen');
        });
        
      } else {
        toaster('Please choose unique username');
      }
    } else {
      toaster('Please provide minimum 3 characters');
    }
  }

  return(
    <View style={styles.loginContainer}>
      <Text style={{ fontSize: 20, alignSelf: 'center', paddingTop: 48, }} >
        Explore the potential of Github Explorer!
      </Text>
      <Text style={{ marginHorizontal: 55, textAlign: 'center', marginTop: 5, opacity: 0.4, }} >
        Resgister by choosing minimum 3 letters of username for yourself!
      </Text>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal:55, borderWidth: 2, marginTop: 50, paddingHorizontal: 10, borderColor: '#00716F', borderRadius: 23, paddingVertical: 2, }}>
        <Icon name='mail' color='#00716F' size={24}/>
        <TextInput 
          placeholder= 'username'
          placeholderTextColor= '#00716F'
          style={{ paddingHorizontal:10}}
          onChangeText={text => setUserName(text)}
        />
      </View>
      <View style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 55, borderWidth: 2, marginTop: 15, paddingHorizontal: 10, borderColor: '#00716F', borderRadius: 23, paddingVertical: 2 }}>
        <Icon name='create' color='#00716F' size={24}/>
        <TextInput 
          secureTextEntry
          placeholder='Password'
          placeholderTextColor='#00716F'
          style={{ paddingHorizontal:10}}
          onChangeText={text => setPassword(text)}
        />
      </View>
      <TouchableOpacity onPress={() => onPressSubmit()}>
        <View style={{ marginHorizontal: 55, alignItems: 'center', justifyContent: 'center', marginTop: 30, backgroundColor: '#00716F', paddingVertical: 10, borderRadius: 23 }} >
          <Text style={{  color: 'white' }}> Register </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default memo(RegisterScreen);

// can explore SecureStore for further implementation