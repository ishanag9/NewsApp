import { View, Text, Button, ScrollView, Alert, Image, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import ListFeed from '../components/ListFeed';
import { dummyData } from '../constants/dummyData';
import { styles } from '../constants/styles';
import FormInput from '../components/FormInput';
import icons from '../constants/icons';
import { FONTS } from '../constants/theme';
import { getGenArticlesIN } from '../service/news';

const NewsFeedScreen = () => {
  const [value, setValue] = useState('');
  const [valueError, setValueError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);

  

  useEffect(()=>{ 
    async function getData() {
      // setIsLoading(true);
      await getGenArticlesIN('in', 'general').then(data => {
        setData(data)
      },
      error =>{
        Alert.alert(error, ' Something went wrong.')
      })
      setIsLoading(false);
    }
    getData()
  },[])
  
  return (
    <View style={{flex:1}}>
      {console.log(data)}
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
        <View style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            marginTop:'5%', marginLeft:'4%', marginRight:'4%'
            }}>
          <Text style={{...FONTS.h3, color:'#303F60', fontWeight:'800'}}>Top Headlines</Text>
          {/* <Text style={{...FONTS.h4, color:'#303F60', fontWeight:'500'}}>Sort:</Text> */}
        </View>
      <ScrollView style={styles.container}>
        {isLoading ? <ActivityIndicator size="small" color="blue"/> :
          data.map(item => (
            <ListFeed
              key={item.source.publishedAt}
              title={item.title}
              description={item.description}
              urlToImage={{uri: item.urlToImage != null ? item.urlToImage : 'https://image.shutterstock.com/image-vector/404-not-found-problem-disconnect-600w-721322569.jpg'}}
              publishedAt={item.publishedAt}
              //Use this at news detail screen
              name={item.source.name}
              author={item.author}
              url={item.url}
              content={item.content}
            />
          ))
        }

        {/* <View style={{margin:'20%'}}>  
          <Button title="Detail Screen" onPress={() => navigation.navigate('detailscreen')} />
        </View> */}
      </ScrollView>
    </View>
  );
};

export default NewsFeedScreen;
