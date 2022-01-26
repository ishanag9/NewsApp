import { View, Text, Image, Alert, TouchableNativeFeedback} from 'react-native';
import React from 'react';
import { FONTS } from '../constants/theme';
import { windowWidth, windowHeight } from '../constants/utils';
import { styles } from '../constants/styles';
import { useNavigation } from '@react-navigation/native';

export default function ListFeed({id, title, description, urlToImage, publishedAt, name, author, url, content}) {
    const navigation = useNavigation();
    return (
    <View style={{marginBottom: 20, borderRadius: 8}}>
      <TouchableNativeFeedback onPress={()=> navigation.navigate('detailscreen', {title:title, name:name, url:url, author:author, content:content, urlToImage:urlToImage, publishedAt:publishedAt})}>
        <View style={styles.mainCardView}>  
          <View style={styles.subCardView}>
            <Text
              numberOfLines={2}
              style={{
                ...FONTS.h3,  
                color: 'black',
                // fontSize: 14,
                // textTransform: 'uppercase',
              }}>
              {title}
            </Text>
            <Text
            numberOfLines={3}
              style={{
                  ...FONTS.h4,  
                color: 'gray',
                // fontFamily: FONTS.h3.fontFamily,
                // fontSize: 14,
              }}>
              {description}
            </Text>
            <Text
              style={{
                  ...FONTS.h4,  
                color: 'gray',
                marginTop: '2.5%'
                // fontFamily: FONTS.h3.fontFamily,
                // fontSize: 14,
              }}>
              {publishedAt}
            </Text> 
          </View>
          
          <Image
            source={urlToImage}
            style={{width: '33%', height: 120, borderRadius: 8}}
          />
          
        </View>
       </TouchableNativeFeedback>
      </View>
  );
};


