import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RkButton } from 'react-native-ui-kitten'
import { createStackNavigator, createAppContainer  } from 'react-navigation'
import Register from './screens/Register'
import Login from './screens/Login'

export default class App extends React.Component {
  render() {
    return (
      <AppContainer/>
    );
  }
}

const AppNavigator = createStackNavigator({
  Login: { screen: Login },
  Register: { screen: Register }
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
