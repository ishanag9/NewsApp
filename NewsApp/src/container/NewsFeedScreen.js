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
  const [filteredData, setFilteredData] = useState([]);

  const handleChange = (value) =>{
    const searchRegex = RegExp(`\W*${value}\W*`);
    setValue(value)
    // console.log(value + ' Search value in news feed screen')
    setFilteredData(data.filter(data=> data.title.toLowerCase().match(searchRegex) 
                      ||  data.description?.toLowerCase().match(searchRegex)
                      ||  data.source.name?.toLowerCase().match(searchRegex)))
    // console.log(filteredData)
}

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(true)
  //   }, 250);
  // },[])

  useEffect(()=>{ 
    async function getData() {
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
  

  useEffect(() => {
    if (data != null) {
      setFilteredData(data);
    }
  }, [data]);

  return (
    <View style={{flex:1}}>
      {/* {console.log(data)} */}
      <View style={{marginLeft:'4%', marginRight:'4%'}}>
      <FormInput
        placeholder='Search for news, topics...'
        // keyboardType="default"
        autoCapitalize="words"
        onChange={(value) => {
            handleChange(value)
            console.log('typing')
        }}
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
          filteredData.map(item => (
            <ListFeed
              key={item?.url}
              title={item?.title}
              description={item?.description}
              urlToImage={{uri: item.urlToImage != null ? item.urlToImage : 'https://image.shutterstock.com/image-vector/404-not-found-problem-disconnect-600w-721322569.jpg'}}
              publishedAt={item?.publishedAt}
              //Use this at news detail screen
              name={item?.source.name}
              author={item?.author}
              url={item?.url}
              content={item?.content}
            />
          ))
        }
        {
          value && filteredData.length===0 ? 
            <Image style={{width:'100%', height:500}} source={require('../assets/NoResultFound.png')} resizeMode='contain' />
          : console.log(false)
        }

      </ScrollView>
    </View>
  );
};

export default NewsFeedScreen;
