import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import axios from 'axios';

const App = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('https://api.github.com/users')
      .then(({data}) => {
        setData(data);
      })
      .catch(error => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  return (
    <View style={{flex: 1, padding: 24}}>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <FlatList
          data={data}
          keyExtractor={(item, index) => {
            return index.toString();
          }}
          renderItem={({item}) => {
            return (
              <SafeAreaView style={styles.container}>
                <Image
                  style={styles.image}
                  source={{
                    uri: item.avatar_url,
                  }}
                />
                <Text style={styles.item}>{item.login}</Text>
              </SafeAreaView>
            );
          }}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#554757',
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

export default App;
