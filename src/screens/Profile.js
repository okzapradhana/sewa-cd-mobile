import React, { Component } from 'react';
import { View, Text } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { color } from '../libs/metrics';
import Card from '../components/Card';

class Profile extends Component{
  
  static navigationOptions = ({ navigation }) => ({
    title: 'Profile',
    drawerLabel: 'Profile',

    headerStyle: {
      backgroundColor: color.primary,
    },
    headerLeft:
      <View style={{ paddingLeft: 15 }}>
        <Ionicons
          name="md-menu"
          size={30}
          color={color.white}
          onPress={() => navigation.openDrawer()}
        />
      </View>,
    headerTintColor: color.white,
  })
  
  render(){
    return(
      <View>

      </View>
    )
  }
}

export default Profile