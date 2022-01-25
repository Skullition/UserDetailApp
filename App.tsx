import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight,
  View,
} from 'react-native';
import axios from 'axios';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function HomeScreen({navigation}) {
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
    <View>
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
                <View style={styles.card_template}>
                  <TouchableHighlight
                    onPress={() => navigation.navigate('Details')}>
                    <Image
                      style={styles.card_image}
                      source={{
                        // @ts-ignore
                        uri: item.avatar_url,
                      }}
                    />
                  </TouchableHighlight>
                  <View style={styles.text_container}>
                    <Text style={styles.card_title}>{item.login}</Text>
                  </View>
                </View>
              </SafeAreaView>
            );
          }}
        />
      )}
    </View>
  );
}

function DetailScreen() {
  return (
    <View>
      <Text>hi</Text>
    </View>
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Details" component={DetailScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card_template: {
    marginTop: 35,
    boxShadow: '10px 10px 17px -12px rgba(0,0,0,0.75)',
  },
  card_image: {
    width: 250,
    height: 250,
    borderRadius: 10,
  },
  text_container: {
    position: 'absolute',
    width: 250,
    height: 30,
    bottom: 0,
    padding: 5,
    backgroundColor: 'rgba(0,0,0, 0.3)',
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  card_title: {
    color: 'white',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

export default App;
