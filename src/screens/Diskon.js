import React, { Component } from 'react'
import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { color } from '../libs/metrics';

class Diskon extends Component{
  
  static navigationOptions = ({ navigation }) => ({
    title: 'Diskon',
    drawerLabel: 'Diskon',

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

export default Diskon