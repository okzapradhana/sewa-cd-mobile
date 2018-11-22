import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createStackNavigator, createAppContainer, createSwitchNavigator  } from 'react-navigation'
import Register from './screens/Register'
import Login from './screens/Login'
import Diskon from './screens/Diskon'
import Home from './screens/Home'

export default class App extends React.Component {
  render() {
    return (
      <AppContainer/>
    );
  }
}

const AppNavigator = createSwitchNavigator({
  Login: { screen: Login },
  Register: { screen: Register },
  Diskon: { screen: Diskon },
  Home: { screen: Home }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    marginTop: '20dp'
  }
});

const AppContainer = createAppContainer(AppNavigator)
