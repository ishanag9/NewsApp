import { View, Text, Button, ScrollView, Alert, Image, ActivityIndicator, FlatList, TouchableOpacity } from 'react-native';
import React, { useEffect, useState } from 'react';
import ListFeed from '../components/ListFeed';
import { dummyData } from '../constants/dummyData';
import { styles } from '../constants/styles';
import FormInput from '../components/FormInput';
import icons from '../constants/icons';
import { FONTS } from '../constants/theme';
import { getGenArticlesIN } from '../service/news';
import Feather from 'react-native-vector-icons/Feather'
// import IconAntDesign from 'react-native-vector-icons/AntDesign';
// import ModalDropdown from 'react-native-modal-dropdown';
import ModalComponent from '../components/ModalComponent';
import { country } from '../constants/locationData';
import TextButton from '../components/TextButton';
import RadioButton from 'react-native-radio-button';
// import RadioForm from 'react-native-simple-radio-button';
// import RadioGroup from 'react-native-radio-buttons-group';

const NewsFeedScreen = () => {
  const [value, setValue] = useState('');
  const [valueError, setValueError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [countryCode, setCountryCode] = useState('in');
  // const [sorting, setSorting] = useState('Newest');

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

  const openModal = () => {
    setShowModal(true);
  }

  const onDismiss = () => {
    setShowModal(false);
  }

  const onRadioPress = (index) => {
    setSelectedIndex(index)
    // setCountryCode(code)
    // console.log(index)
    // console.log(countryCode)
  }
  const renderItem = ({item, index}) => {
    // console.log("Item", item);
    return(
      <View style={{flex: 1, flexDirection: "row", justifyContent:'space-between', margin:'2%'}}>
        <TouchableOpacity>
          <Text style={{...FONTS.h3}}>{item.title}</Text>
        </TouchableOpacity>
          <RadioButton
            animation={'bounceIn'}
            // value={item.index}
            size={14}
            isSelected={selectedIndex === index }
            onPress={() => {onRadioPress(index)}}
          />
      </View>
    )
  }

  return (
    <View style={{flex:1}}>
      {/* {console.log(data)} */}
      <View style={styles.headerWrapper}>
        <Text style={{...FONTS.h2,color:'#fff', margin:'3.5%'}}>MyNEWS</Text>
        {/* <Text style={{...FONTS.h3,color:'#fff', marginLeft:'55%'}}>{countryCode}</Text> */}
        <Feather style={{marginRight:'3.5%'}} name="map-pin" size={22} color='white' onPress={() => openModal()}/>
        {/* <Feather style={{marginRight:'3.5%'}} name="map-pin" size={22} color='white' onPress={() => this.bs.current.snapPoints(0)}/> */}
      </View>

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
          {/* Implement sorting functionality */}
          {/* <Text style={{...FONTS.h4, color:'#303F60', fontWeight:'500'}}>Sort: </Text>
          <TouchableOpacity style={{...FONTS.h4, color:'#303F60', fontWeight:'500'}} onPress={handleSorting()}>
            <Text>af</Text>
          </TouchableOpacity> */}
          {/* <ModalDropdown options={['Newest', 'Oldest']}>
            <Text>Dropdown</Text>
          </ModalDropdown> */}
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
          value && filteredData && filteredData.length===0 ?
            <Image style={{width:'100%', height:500}} source={require('../assets/NoResultFound.png')} resizeMode='contain' />
            : console.log('string value')
        }

      </ScrollView>

      {showModal && (
        <ModalComponent onDismiss={onDismiss}>
          <View style={{margin:'2%'}}>
            <Text style={{...FONTS.h3, borderBottomWidth:1, borderBottomColor:'#E8E8E8', paddingBottom:10, fontWeight:'800', marginBottom:'3%'}}>Choose your location</Text>
            <FlatList
                data={country}
                keyExtractor={item => item.code}
                renderItem={renderItem}
                extraData={selectedIndex}
                // renderItem={({item}) => 
                //   <TouchableOpacity onPress={() => handleLocation(item.code)}>
                //     <Text style={{...FONTS.h3}}>{item.title}</Text>
                //   </TouchableOpacity>
                // }
            />
            {/* {console.log(countryCode)} */}
    
            <TextButton
            label="Apply"
            // Disable the button if needed(for user to put right details first)
            buttonContainerStyle={{
              height:55,
              alignItems:'center',
              marginLeft: '22%',
              marginRight: '22%',
              marginTop: '3%',
              marginBottom: '3%',
              borderRadius: 8,
              // backgroundColor: '#0C54BE'
            }}
            onPress={() => {Alert.alert('To be implemented...'), setShowModal(false)}}
          />
          </View>
        </ModalComponent>
      )}
    </View>
  );
};

export default NewsFeedScreen;
