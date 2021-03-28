// import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import  { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import { ActivityIndicator } from 'react-native';
// import AppLoading from 'expo-app-loading';
import store from './src/redux/store';
import { isUserLoggedIn } from './src/helpers/login';

// import AppNavigator from './src/navigations/Navigator';
// import { AppLoading } from 'expo';
import LoginScreen from './src/screens/Login/LoginScreen';
import RegisterScreen from './src/screens/Login/RegisterScreen';
import ProfileScreen from './src/screens/Login/ProfileScreen';
import HomeScreen from './src/screens/Home/HomeScreen';
import BookmarkScreen from './src/screens/Bookmarks/BookmarkScreen';
import DetailsScreen from './src/screens/Details/DetailsScreen';
import CreateIssueScreen from './src/screens/Details/CreateIssueScreen';
import UserScreen from './src/screens/Details/UserScreen';

const { Navigator, Screen } = createStackNavigator();
const MyStack = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      isUserLoggedIn().then((res) => {
        setIsLoggedIn(res);
        setIsLoading(true);
      });
    }, 1000)
  }, [])

  if (!isLoading) {
    return (
      <ActivityIndicator size='large' color='#00ff00' style={{ flex: 1, justifyContent: 'center', alignItem: 'center' }} />
    );
  }

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Navigator>
          {isLoggedIn ?
            <>
              <Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
              <Screen name="BookmarkScreen" component={BookmarkScreen} options={{ headerShown: false }} />
              <Screen name="DetailsScreen" component={DetailsScreen} options={{ title: 'Repo Details' }} />
              <Screen name="CreateIssueScreen" component={CreateIssueScreen} options={{ title: 'Create New Issue' }} />
              <Screen name="UserScreen" component={UserScreen} options={{ title: 'User Profile' }} />
              <Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'My Profile' }} />
              <Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Login' }} />
              <Screen name="RegisterScreen" component={RegisterScreen} options={{ title: 'Sign Up' }} />
            </>
            : <>
              <Screen name="LoginScreen" component={LoginScreen} options={{ title: 'Login' }} />
              <Screen name="RegisterScreen" component={RegisterScreen} options={{ title: 'Sign Up' }} />
              <Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
              <Screen name="BookmarkScreen" component={BookmarkScreen} options={{ headerShown: false }} />
              <Screen name="DetailsScreen" component={DetailsScreen} options={{ title: 'Repo Details' }} />
              <Screen name="CreateIssueScreen" component={CreateIssueScreen} options={{ title: 'Create New Issue' }} />
              <Screen name="UserScreen" component={UserScreen} options={{ title: 'User Profile' }} />
              <Screen name="ProfileScreen" component={ProfileScreen} options={{ title: 'My Profile' }} />
            </>
          }
        </Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default MyStack;
