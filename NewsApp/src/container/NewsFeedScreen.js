import { View, Text, Button, ScrollView, Alert, Image } from 'react-native';
import React, { useState } from 'react';
import ListFeed from '../components/ListFeed';
import { dummyData } from '../constants/dummyData';
import { styles } from '../constants/styles';
import FormInput from '../components/FormInput';
import icons from '../constants/icons';
import { FONTS } from '../constants/theme';

const NewsFeedScreen = () => {
  const [value, setValue] = useState('');
  const [valueError, setValueError] = useState('');
  
  return (
    <View style={{flex:1}}>
      <View style={{marginLeft:'4%', marginRight:'4%'}}>
      <FormInput
        placeholder='Search for news, topics...'
        // keyboardType="numeric"
        autoCapitalize="words"
        // autoCompleteType="email"
        onChange={(value) => {
            // utils.validateEmail(value, setEmailError)
            setValue(value)
            console.log('typing')
        }}
        // errorMsg={emailError}
        appendComponent={
            <View
            style={{
                justifyContent: 'center'
            }}
            >
            <Image
                source={icons.search}
                style={{
                height: 20,
                width: 20, 
                tintColor: value == ""? 'gray' : (value != "" && valueError == "") ? 'blue' : 'gray' 
                }}
          />
            </View>
        } 
        />
        </View>
        <View>
          <Text style={{...FONTS.h3, marginTop:'5%', marginLeft:'4%', color:'#303F60', fontWeight:'800'}}>Top Headlines</Text>
        </View>
      <ScrollView style={styles.container}>
        {true && dummyData.map(item => (
          <ListFeed
            key={item.source.id}
            title={item.title}
            description={item.description}
            urlToImage={{uri: item.urlToImage}}
            publishedAt={item.publishedAt}
            //Use this at news detail screen
            name={item.source.name}
            author={item.author}
            url={item.url}
            content={item.content}
          />
        ))}

        {/* <View style={{margin:'20%'}}>  
          <Button title="Detail Screen" onPress={() => navigation.navigate('detailscreen')} />
        </View> */}
      </ScrollView>
    </View>
  );
};

export default NewsFeedScreen;
