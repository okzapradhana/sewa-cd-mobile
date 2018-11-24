import React from 'react';
import { StyleSheet } from 'react-native';
import NavigationService from './src/libs/NavigationService';
import AppNavigator from './src/Navigation';

export default class App extends React.Component {
  render() {
    return (
      <AppNavigator ref={ref => NavigationService.setTopNavigator(ref)}/>
    );
  }
}

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
