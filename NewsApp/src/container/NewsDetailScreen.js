import { View, Text, ImageBackground, SafeAreaView, ScrollView, TouchableOpacity, Linking } from 'react-native';
import React from 'react';
import { FONTS } from '../constants/theme';
import Feather from 'react-native-vector-icons/Feather';

const NewsDetailScreen = ({navigation, route}) => {
    const {name} = route.params;
    const {title} = route.params;
    const {url} = route.params;
    const {urlToImage} = route.params;
    const {author} = route.params;
    const {content} = route.params;
    const {publishedAt} = route.params;

    const handleClick = () => {
        Linking.openURL(url)
               .catch(error => console.error("Couldn't load page", error));
      };

  return (
    <SafeAreaView style={{flex:1}}>
      
        <ImageBackground source={urlToImage} style={{width: '100%', height: 300}}>
            <View style={{position: 'absolute', top: 0, left: '3%', right: '3%', bottom: '3%', justifyContent: 'flex-end', alignItems: 'flex-start'}}>
                <Text style={{...FONTS.h3, color:'#fff'}}>{title}</Text>
            </View>
        </ImageBackground>
    
      <ScrollView style={{flex:1, margin:'3%'}}>
        <Text style={{margin:'1%', fontWeight:"600"}}>{name} - Author {author}</Text>
        <Text style={{margin:'1%',marginTop:.1 ,fontWeight:"600"}}>{publishedAt}</Text>
        <Text style={{...FONTS.body2,textAlign:'justify', margin:'1%',marginTop:'2%', fontWeight:"600"}}>{content.split("[+")[0]}</Text>

        <TouchableOpacity style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            margin:'1%',
        }} onPress={() => handleClick()}>
            <Text style={{...FONTS.body3, color:'blue'}}>See full story</Text>
            <Feather name='chevron-right' size={24} color='blue'/>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
};

export default NewsDetailScreen;
