import { View, Text, Alert } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewsFeedScreen from '../container/NewsFeedScreen';
import NewsDetailScreen from '../container/NewsDetailScreen';
import WebviewScreen from '../container/WebviewScreen';
import Feather from 'react-native-vector-icons/Feather';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="newsfeed" 
        component={NewsFeedScreen} 
        options={({navigation}) => ({
            headerShown:false,  //using custom header, below code is cleanable
            title: 'MyNEWS',
            headerTintColor: '#fff',
            headerStyle: { 
                backgroundColor: '#0C54BE' 
            },
            headerRight: () => (
              <View>
                {/* <Text style={{color:'#fff'}}>LOCATION</Text> */}
                {/* <Feather name="map-pin" size={20} color='white' onPress={() => Alert.alert("To be implemented...")}/> */}
              </View>
            )
          })}/>
        
        <Stack.Screen 
        name="detailscreen" 
        component={NewsDetailScreen} 
        options={({navigation}) => ({
            headerShown:true,
            title: '',
            headerTintColor: '#fff',
            headerStyle: { 
                backgroundColor: '#0C54BE' 
            },
            headerLeft: () => (
              <View><Feather name="chevron-left" size={28} color='white' onPress={() => navigation.goBack()}/></View>
            ),
          })}/>

        <Stack.Screen 
        name="webviewscreen" 
        component={WebviewScreen} 
        options={({navigation}) => ({
            headerShown:true,
            title: '',
            headerTintColor: '#fff',
            headerStyle: { 
                backgroundColor: '#0C54BE' 
            },
            headerLeft: () => (
              <View><Feather name="chevron-left" size={28} color='white' onPress={() => navigation.goBack()}/></View>
            ),
          })}/>  
    </Stack.Navigator>
  );
};

export default StackNavigation;
