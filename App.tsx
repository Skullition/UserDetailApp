import React, {Component} from 'react';
import {
  Alert,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';

export default class Users extends Component {
  constructor({props}: {props: any}) {
    super(props);
    this.state = {
      data: [
        {
          id: 1,
          color: '#FF4500',
          icon: 'https://bootdey.com/img/Content/avatar/avatar1.png',
          name: 'User 1',
          tags: ['tag 1', 'tag 2', 'tag 3', 'Mobile dev', 'RN', 'Bootdey'],
        },
        {
          id: 2,
          color: '#87CEEB',
          icon: 'https://bootdey.com/img/Content/avatar/avatar2.png',
          name: 'User 2',
          tags: ['tag 1', 'tag 2', 'tag 3', 'Dey-Dey', 'Developer'],
        },
        {
          id: 3,
          color: '#4682B4',
          icon: 'https://bootdey.com/img/Content/avatar/avatar3.png',
          name: 'User 3',
          tags: ['tag 1', 'tag 2', 'tag 3'],
        },
        {
          id: 4,
          color: '#6A5ACD',
          icon: 'https://bootdey.com/img/Content/avatar/avatar4.png',
          name: 'User 4',
          tags: ['tag 1', 'tag 2', 'tag 3'],
        },
        {
          id: 5,
          color: '#FF69B4',
          icon: 'https://bootdey.com/img/Content/avatar/avatar5.png',
          name: 'User 5',
          tags: ['tag 1', 'tag 2', 'tag 3'],
        },
        {
          id: 6,
          color: '#00BFFF',
          icon: 'https://bootdey.com/img/Content/avatar/avatar6.png',
          name: 'User 6',
          tags: ['tag 1', 'tag 2', 'tag 3'],
        },
        {
          id: 7,
          color: '#00FFFF',
          icon: 'https://bootdey.com/img/Content/avatar/avatar1.png',
          name: 'User 7',
          tags: ['tag 1', 'tag 2', 'tag 3'],
        },
        {
          id: 8,
          color: '#20B2AA',
          icon: 'https://bootdey.com/img/Content/avatar/avatar2.png',
          name: 'User 8',
          tags: ['tag 1', 'tag 2', 'tag 3'],
        },
        {
          id: 9,
          color: '#191970',
          icon: 'https://bootdey.com/img/Content/avatar/avatar3.png',
          name: 'User 9',
          tags: ['tag 1', 'tag 2', 'tag 3'],
        },
      ],
    };
  }

  cardClickEventListener = (item: {name: string}) => {
    Alert.alert(item.name);
  };

  render() {
    return (
      <View style={styles.container}>
        <FlatList
          style={styles.notificationList}
          data={this.state.data}
          keyExtractor={item => {
            return item.id;
          }}
          renderItem={({item}) => {
            return (
              <TouchableOpacity
                style={[styles.card, {borderColor: item.color}]}
                onPress={() => {
                  this.cardClickEventListener(item);
                }}>
                <View style={styles.cardContent}>
                  <Image
                    style={[styles.image, styles.imageContent]}
                    source={{uri: item.icon}}
                  />
                  <Text style={styles.name}>{item.name}</Text>
                </View>
              </TouchableOpacity>
            );
          }}
        />
      </View>
    );
  }
}

const getDataFromApi = async () => {
  const apiURL = 'https://api.github.com/users';
  const response = await axios.get(apiURL);
  //console.log(response.data);
  return response.data;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB',
  },
  formContent: {
    flexDirection: 'row',
    marginTop: 30,
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    height: 45,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    margin: 10,
  },
  icon: {
    width: 30,
    height: 30,
  },
  iconBtnSearch: {
    alignSelf: 'center',
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  notificationList: {
    marginTop: 20,
    padding: 10,
  },
  card: {
    paddingTop: 10,
    paddingBottom: 10,
    marginTop: 5,
    backgroundColor: '#FFFFFF',
    flexDirection: 'column',
    borderTopWidth: 40,
    marginBottom: 20,
  },
  cardContent: {
    flexDirection: 'row',
    marginLeft: 10,
  },
  imageContent: {
    marginTop: -40,
  },
  tagsContent: {
    marginTop: 10,
    flexWrap: 'wrap',
  },
  image: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    alignSelf: 'center',
  },
  btnColor: {
    padding: 10,
    borderRadius: 40,
    marginHorizontal: 3,
    backgroundColor: '#eee',
    marginTop: 5,
  },
});
