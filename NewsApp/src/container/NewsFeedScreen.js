import { View, Text, Button, ScrollView, Alert } from 'react-native';
import React from 'react';
import ListFeed from '../components/ListFeed';
import { dummyData } from '../constants/dummyData';
import { styles } from '../constants/styles';

const NewsFeedScreen = () => {
  return (
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
  );
};

export default NewsFeedScreen;
