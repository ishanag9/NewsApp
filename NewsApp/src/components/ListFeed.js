import { View, Text, Image, Alert, TouchableNativeFeedback} from 'react-native';
import React, { useEffect, useState } from 'react';
import { FONTS } from '../constants/theme';
import { windowWidth, windowHeight } from '../constants/utils';
import { styles } from '../constants/styles';
import { useNavigation } from '@react-navigation/native';
import moment from 'moment';

export default function ListFeed({id, title, description, urlToImage, publishedAt, name, author, url, content}) {
    const navigation = useNavigation();
    const [timeNewsFeed, setTimeNewsFeed] = useState('');
    const [timeDetailScreen, setTimeDetailScreen] = useState('');

    useEffect(() => {
        function timeFromNow(){
            setTimeNewsFeed(moment(publishedAt || moment.now()).fromNow())
        }
        function timeFormat(){
            setTimeDetailScreen(moment(publishedAt || moment.now()).format("DD MMM[,] YYYY [at] h:mm A"))
        }
        timeFromNow();
        timeFormat();
    },[])    

    return (
    <View style={{marginBottom: 20, backgroundColor:'#F5F9FD'}}>
      <TouchableNativeFeedback onPress={()=> navigation.navigate('detailscreen', {title:title, name:name, url:url, author:author, content:content, urlToImage:urlToImage, publishedAt:timeDetailScreen})}>
        {/* Using card style to show news */}
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
              {timeNewsFeed}
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


