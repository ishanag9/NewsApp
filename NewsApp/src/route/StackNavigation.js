import { View, Text, Alert } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import NewsFeedScreen from '../container/NewsFeedScreen';
import NewsDetailScreen from '../container/NewsDetailScreen';
import Feather from 'react-native-vector-icons/Feather';

const Stack = createNativeStackNavigator();

const StackNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="newsfeed" 
        component={NewsFeedScreen} 
        options={{
            headerShown:true,
            title: 'MyNEWS',
            headerTintColor: '#fff',
            headerStyle: { 
                backgroundColor: '#0C54BE' 
            }
        }}/>
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
            )
          })}/>
    </Stack.Navigator>
  );
};

export default StackNavigation;
