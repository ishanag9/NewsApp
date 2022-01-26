import React, { useEffect } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import StackNavigation from './src/route/StackNavigation';
import { StatusBar } from 'react-native';
// import { Provider } from 'react-redux';
// import store from './src/redux/store';

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#0C54BE',
    // background: '#fff',
    background: '#F5F9FD',
    
  },
};

const AppEntry = () => {
  // const userExists = useSelector(state => state.userReducer.userExists)

  useEffect(()=>{
    SplashScreen.hide();
  },[])

  return (
      <NavigationContainer theme={MyTheme}>
        <StatusBar hidden/>
        <StackNavigation/>
      </NavigationContainer>
  );
}


const App = () => {
  return (
    // <Provider store={store}>
      <AppEntry />
    // {/* </Provider> */}
  );
};

export default App;

