import { View, Text, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import { WebView } from 'react-native-webview';
import { windowHeight, windowWidth } from '../constants/utils';

const WebviewScreen = ({route}) => {
    const url = route.params;
    const [isLoading, setIsLoading] = useState(true);

  return (
    // <View style={{flex:1}}>
    <View style={{width:'100%', height:'100%'}}>
        
      <WebView
        source={{uri : `${url.url}`}}
        onLoadStart={() => setIsLoading(true)}
        onLoadEnd={() => setIsLoading(false)}
      />
      {isLoading &&  <ActivityIndicator style={{position:'absolute', marginTop:windowHeight/2.5, marginLeft:windowWidth/2.1}} size="small" color="blue"/> }
    </View>
  );
};

export default WebviewScreen;
