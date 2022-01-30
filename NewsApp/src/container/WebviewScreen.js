import { View, Text, WebView } from 'react-native';
import React from 'react';

const WebviewScreen = ({route}) => {
    const url = route.params;

  return (
    <View style={{flex:1}}>
      <WebView
        style={{flex:1}}
        source={url}
      />
    </View>
  );
};

export default WebviewScreen;
