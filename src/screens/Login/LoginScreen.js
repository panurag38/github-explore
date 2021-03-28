import React, { useState, memo } from 'react';
import { Text, View, TextInput, TouchableOpacity } from 'react-native';
import { Icon } from 'react-native-elements';
import Storage from '../../helpers/storage';
import { setUserLoggedIn } from '../../helpers/login';
import toaster from '../../helpers/toaster';
import checkValidation from '../../helpers/checkInputValidation';

const LoginScreen = (props) => {
  const { navigation: { navigate } } = props;
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');

  const onPressSubmit = async () => {
    if (userName.length > 2 && password.length > 2) {
      if (checkValidation({ type: 'userName', str: userName }) && checkValidation({ type: 'password', str: password })) {
        const obj = await Storage.get('users') || {};
        // obj -> { username1: password, username2: password, ...}
        if (obj[userName.toLowerCase()]) {
          if (obj[userName] === password) {
            await setUserLoggedIn({ userName, password });
            navigate('HomeScreen');
          } else {
            toaster('password incorrect');
          }
        } else {
          toaster('username does not exist');
        }
      }
    } else {
      toaster('Please provide valid credentials');
    }
  };

  return (
    <View style={{ backgroundColor: '#FFF',height: '100%', paddingTop: 40 }}>
      <Text style={{ fontSize: 24, alignSelf: 'center' }}>Login with us!</Text>
      <Text style={{ marginHorizontal:  55, textAlign: 'center', marginTop: 5, opacity: 0.4 }}>
          your data is not shared outside of app
      </Text>
      <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 55,
          borderWidth: 2,
          marginTop: 50,
          paddingHorizontal: 10,
          borderColor: '#00716F',
          borderRadius: 23,
          paddingVertical: 2,
      }}>
        <Icon name='mail' color='#00716F' size={24} />
        <TextInput style={{ paddingHorizontal: 10 }} placeholder= 'username' onChangeText={text => setUserName(text)} />
      </View>
      <View style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginHorizontal: 55,
          borderWidth: 2,
          marginTop: 15,
          paddingHorizontal: 10,
          borderColor: '#00716F',
          borderRadius: 23,
          paddingVertical: 2,
      }}>
        <Icon name='create' color='#00716F' size={24}/>
        <TextInput style={{ paddingHorizontal: 10 }} placeholder= 'password' onChangeText={text => setPassword(text)} />
      </View>
      <TouchableOpacity onPress={() => onPressSubmit()}>
        <View style={{
            marginHorizontal: 55,
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 30,
            backgroundColor: '#00716F',
            paddingVertical: 10,
            borderRadius: 23,
        }}>
          <Text style={{ color: 'white' }}>Sign In</Text>
        </View>
      </TouchableOpacity>
      <Text
        onPress={()=> navigate('RegisterScreen')}
        style={{
            alignSelf: 'center',
            color: '#00716F',
            paddingVertical: 30,
        }}>
          New User: Sign Up
      </Text>
    </View>
  );
};

export default memo(LoginScreen);
