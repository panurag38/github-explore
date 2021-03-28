
// import { createAppContainer } from 'react-navigation';
import  { NavigationContainer } from '@react-navigation/native';
import  { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../screens/Login/LoginScreen';
import RegisterScreen from '../screens/Login/RegisterScreen';

const stackNavigatorOptions = {
    headerShown: false
};
const AppNavigator = createStackNavigator({
    LoginScreen: { screen: LoginScreen },
    RegisterScreen: { screen: RegisterScreen },
},
{
    defaultNavigationOptions: stackNavigatorOptions,
}  
);

export default (<NavigationContainer><AppNavigator /></NavigationContainer>);