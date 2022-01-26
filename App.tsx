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
                    onPress={() =>
                      navigation.navigate('Details', {
                        username: item.login,
                        imageLink: item.avatar_url,
                        accountType: item.type,
                      })
                    }>
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

function DetailScreen({route}) {
  const {username, imageLink, accountType} = route.params;
  return (
    <SafeAreaView style={styles.detailContainer}>
      <Image
        style={styles.detailImage}
        source={{
          uri: imageLink,
        }}
      />
      <View style={styles.detailTextContainer}>
        <Text style={styles.detailTextTitle}>Username</Text>
        <Text style={styles.detailText}>{username}</Text>
        <Text style={styles.detailTextTitle}>User Type</Text>
        <Text style={styles.detailText}>{accountType}</Text>
      </View>
    </SafeAreaView>
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
  detailImage: {
    display: 'flex',
    flex: 1,
    width: '100%',
    height: '50%',
    resizeMode: 'contain',
  },
  detailContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  detailTextContainer: {
    display: 'flex',
    padding: 20,
  },
  detailText: {
    fontFamily: 'sans-serif',
    fontWeight: 'bold',
    color: 'black',
    fontSize: 24,
  },
  detailTextTitle: {
    color: 'gray',
    fontSize: 36,
  },
});

export default App;
