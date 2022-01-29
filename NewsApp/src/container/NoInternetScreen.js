import { View, Text, Image, NativeModules } from 'react-native';
import React from 'react';
import { styles } from '../constants/styles';
import { FONTS } from '../constants/theme';
import TextButton from '../components/TextButton';

const NoInternetScreen = () => {
  return (
    <View>
      {/* Custom Header */}
      <View style={styles.headerWrapper}>
        <Text style={{...FONTS.h2,color:'#fff', margin:'3.5%'}}>MyNEWS</Text>
      </View>
    <View>
        <Image style={{width:'30%',marginLeft:'36%', marginTop:'50%'}} source={require("../assets/No_Internet.png")} resizeMode="contain"/>
        <Text style={{...FONTS.h2, marginLeft:'21%'}}>No Internet Connection!</Text>
    </View>
    
    <TextButton
        label="Try Again"
        buttonContainerStyle={{
            height:55,
            alignItems:'center',
            marginLeft: '25%',
            marginRight: '22%',
            marginTop: '13%',
            marginBottom: '3%',
            borderRadius: 8,
            // backgroundColor: '#0C54BE'
        }}
        onPress={() => NativeModules.DevSettings.reload()}
        />
    </View>
  );
};

export default NoInternetScreen;
