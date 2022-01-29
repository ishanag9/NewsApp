import { View, Text, Button, ScrollView, Alert, Image, ActivityIndicator, FlatList, TouchableOpacity, TouchableHighlight } from 'react-native';
import React, { useEffect, useState } from 'react';
import ListFeed from '../components/ListFeed';
import { dummyData } from '../constants/dummyData';
import { styles } from '../constants/styles';
import FormInput from '../components/FormInput';
import icons from '../constants/icons';
import { FONTS } from '../constants/theme';
import { getGenArticlesIN } from '../service/news';
import Feather from 'react-native-vector-icons/Feather'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import ModalComponent from '../components/ModalComponent';
import {radio_props_categories, radio_props_country } from '../constants/modalData';
import TextButton from '../components/TextButton';

const NewsFeedScreen = () => {
  const [value, setValue] = useState('');
  const [valueError, setValueError] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [showLocModal, setShowLocModal] = useState(false);
  const [showCatModal, setShowCatModal] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [countryCode, setCountryCode] = useState('in');
  const [countryCodeInApi, setCountryCodeInApi] = useState('in');
  const [category, setCategory] = useState('general');
  const [categoryInApi, setCategoryInApi] = useState('general');
  const [radioBtnValueLoc, setRadioBtnValueLoc] = useState(0);
  const [radioBtnValueCat, setRadioBtnValueCat] = useState(0);
  const [sorting, setSorting] = useState('Newest');
  

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
      await getGenArticlesIN(countryCodeInApi, categoryInApi).then(data => {
        setData(data)
      },
      error =>{
        Alert.alert(error, ' Something went wrong.')
      })
      setIsLoading(false);
    }
    getData()
  },[countryCodeInApi, categoryInApi])
  

  useEffect(() => {
    if (data != null) {
      setFilteredData(data);
    }
  }, [data]);

  const onDismiss = () => {
    setShowLocModal(false);
    setShowCatModal(false);
    switch (categoryInApi) {
      case 'general':
        setRadioBtnValueCat(0);
        break;
      case 'business':
        setRadioBtnValueCat(1);
        break;
        case 'technology':
      setRadioBtnValueCat(2);
      break;
      case 'politics':
        setRadioBtnValueCat(3);
        break;
        case 'entertainment':
      setRadioBtnValueCat(4);
      break;
      default:
        break;
    }

    switch (countryCodeInApi) {
      case 'in':
        setRadioBtnValueLoc(0);
        break;
      case 'au':
        setRadioBtnValueLoc(1);
        break;
      case 'us':
        setRadioBtnValueLoc(2);
        break;
      case 'my':
        setRadioBtnValueLoc(3);
        break;
      default:
        break;
    }
  }

  const handleCountryCode = (value) => {
    setRadioBtnValueLoc(value);
    switch (value) {
      case 0:
        setCountryCode('in');
        break;
      case 1:
        setCountryCode('au');
        break;
      case 2:
        setCountryCode('us');
        break;
      case 3:
        setCountryCode('my');
        break;
      default:
        break;
    }
  }

  const handleApplyLocation = () => {
    setCountryCodeInApi(countryCode)
    setIsLoading(true)
    console.log(countryCodeInApi)
  }

  const handleNewsCategory = (value) => {
    setRadioBtnValueCat(value);
    switch (value) {
      case 0:
        setCategory('general');
        break;
      case 1:
        setCategory('business');
        break;
      case 2:
        setCategory('technology');
        break;
      case 3:
        setCategory('politics');
        break;
      case 4:
        setCategory('entertainment');
        break;  
      default:
        break;
    }
  }

  const handleApplyCategory = () => {
    setCategoryInApi(category)
    setIsLoading(true)
    console.log(categoryInApi)
  }

  const handleSorting = () => {
    if(sorting === 'Newest'){
      setSorting('Oldest')
    } else {
      setSorting('Newest')
    }
    filteredData.reverse()
  }

  return (
    <View style={{flex:1}}>

      {/* Custom Header */}
      <View style={styles.headerWrapper}>
        <Text style={{...FONTS.h2,color:'#fff', margin:'3.5%'}}>MyNEWS</Text>
        <Text style={{...FONTS.h3,color:'#fff', marginLeft:'53%'}}>{countryCodeInApi}</Text>
        <Feather style={{marginRight:'3.5%'}} name="map-pin" size={22} color='white' onPress={() => setShowLocModal(true)}/>
        {/* <Feather style={{marginRight:'3.5%'}} name="map-pin" size={22} color='white' onPress={() => this.bs.current.snapPoints(0)}/> */}
      </View>

      {/* Search bar */}
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
        }/>
        </View>

        {/* News container */}
        <View style={{
            flexDirection: "row",
            justifyContent: "flex-start",
            marginTop:'5%', marginLeft:'4%', marginRight:'4%'
            }}>
          <Text style={{...FONTS.h3, color:'#303F60', fontWeight:'800'}}>Top Headlines ➠ {categoryInApi[0].toUpperCase()+categoryInApi.substring(1)}</Text>
          {/* Implement sorting functionality */}
          {/* <Text style={{...FONTS.h4, color:'#303F60', fontWeight:'500'}}>Sort: </Text> */}
          <TouchableHighlight style={{...FONTS.h4, color:'#303F60',marginLeft:'94%', fontWeight:'500', position:'absolute'}} underlayColor='#F5F9FD' onPress={() => handleSorting()}>
            {sorting == 'Newest' ? 
              <MaterialCommunityIcons name='sort-bool-descending' size={22} color='#303F60'/>
              : <MaterialCommunityIcons name='sort-bool-ascending' size={22} color='#303F60'/>
            }
          </TouchableHighlight>
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
                //Using this data at news detail screen
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

      {/* Filter by category icon button */}
      <TextButton
        buttonContainerStyle={{
          width: 50,  
          height: 50,   
          borderRadius: 100,            
          backgroundColor: '#0C54BE',                                    
          position: 'absolute',                                          
          bottom: 20,                                                    
          right: 20,
        }}
        icon={icons.filter}
        iconPosition={"LEFT"}
        iconStyle={{ tintColor: "white"}}
        onPress={() => setShowCatModal(true)}
      />

      {/* Handling modal for location */}
      {showLocModal && (
        <ModalComponent onDismiss={() => onDismiss()}>
          <View style={{margin:'2%'}}>
            <Text style={{...FONTS.h3, borderBottomWidth:1, borderBottomColor:'#E8E8E8', paddingBottom:10, fontWeight:'800', marginBottom:'3%'}}>Choose your location</Text>
            <View>
              {radio_props_country.map(res => {
                return(
                  <View key={res.key} style={styles.radioContainer}>
                    <Text style={styles.radioText}>{res.text}</Text>
                    <TouchableOpacity
                      style={styles.radioCircle}
                      onPress={() => handleCountryCode(res.key)}>
                      {radioBtnValueLoc === res.key && <View style={styles.selectedRb} />}
                    </TouchableOpacity>
                  </View>
                )
              })}
            </View>
            {console.log(radioBtnValueLoc, ' ', countryCode)}
             
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
            onPress={() => {handleApplyLocation(), setShowLocModal(false)}}
          />
          </View>
        </ModalComponent>
      )}

      {/* Handling modal for categories */}
      {showCatModal && (
        <ModalComponent onDismiss={onDismiss}>
          <View style={{margin:'2%'}}>
            <Text style={{...FONTS.h3, borderBottomWidth:1, borderBottomColor:'#E8E8E8', paddingBottom:10, fontWeight:'800', marginBottom:'3%'}}>Choose your news category</Text>
            <View>
              {radio_props_categories.map(res => {
                return(
                  <View key={res.key} style={styles.radioContainer}>
                    <Text style={styles.radioText}>{res.text}</Text>
                    <TouchableOpacity
                      style={styles.radioCircle}
                      onPress={() => handleNewsCategory(res.key)}>
                      {radioBtnValueCat === res.key && <View style={styles.selectedRb} />}
                    </TouchableOpacity>
                  </View>
                )
              })}
            </View>
            {console.log(radioBtnValueCat, ' ', category)}
             
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
            onPress={() => {handleApplyCategory(), setShowCatModal(false)}}
          />
          </View>
        </ModalComponent>
      )}
    </View>
  );
};

export default NewsFeedScreen;
