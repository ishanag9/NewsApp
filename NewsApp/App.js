import React, { useEffect, useState } from 'react';
import SplashScreen from 'react-native-splash-screen';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import StackNavigation from './src/route/StackNavigation';
import { Alert, StatusBar } from 'react-native';
import NetInfo from '@react-native-community/netinfo';
import NoInternetScreen from './src/container/NoInternetScreen';

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
  const [netInfo, setNetInfo] = useState(true)

  useEffect(() => {
    const data = NetInfo.addEventListener((state) => {
        setNetInfo(state.isConnected)}
      )

    return()=>{data}
  },[])

  useEffect(()=>{
    SplashScreen.hide();
  },[])

  return (
      <NavigationContainer theme={MyTheme}>
        <StatusBar hidden/>
        {netInfo ? <StackNavigation/> : <NoInternetScreen/>}
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

