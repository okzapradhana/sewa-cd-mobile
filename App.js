import React from 'react';
import { StyleSheet } from 'react-native';
import NavigationService from './src/libs/NavigationService';
import AppNavigator from './src/Navigation';

export default class App extends React.Component {

  componentDidMount = () => {
    console.ignoredYellowBox = ['Required cycle: ']    
  }

  render() {
    return (
      <AppNavigator ref={ref => NavigationService.setTopNavigator(ref)}/>
    );
  }
}
