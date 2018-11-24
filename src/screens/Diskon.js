import React, { Component } from 'react'
import { View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'

class Diskon extends Component{
  
  static navigationOptions = ({ navigation }) => ({
    title: 'Diskon',
    drawerLabel: 'Diskon',

    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerLeft:
      <View style={{ paddingLeft: 15 }}>
        <Ionicons
          name="md-menu"
          size={30}
          color="white"
          onPress={() => navigation.openDrawer()}
        />
      </View>,
    headerTintColor: '#fff',
  })
  
  render(){
    return(
      <View>

      </View>
    )
  }
}

export default Diskon