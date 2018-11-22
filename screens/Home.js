import React, { Component } from 'react'
import { View } from 'react-native'
import { createDrawerNavigator, createAppContainer } from 'react-navigation'
import { Ionicons } from '@expo/vector-icons'

class Home extends Component {

  static navigationOptions = {
    title: 'Home',
    drawerLabel: 'Home',

    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerLeft: 
    <View style={{paddingLeft: 15}}>
      <Ionicons
        name="md-menu"
        size={30}
        color="white"
        onPress={() => this.props.navigation.openDrawer()}
      />
    </View>,
    headerTintColor: '#fff',
  }

  render() {
    return (
      <View>

      </View>
    )
  }
}

export default createDrawerNavigator({
  Home: { screen: Home },
},
  {
    drawerPosition: 'left',
    initialRouteName: 'Home',
    drawerBackgroundColor: '#f4511e'
  }
)