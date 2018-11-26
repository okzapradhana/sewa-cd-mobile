import React from 'react';
import { YellowBox } from 'react-native';
import NavigationService from './src/libs/NavigationService';
import AppNavigator from './src/Navigation';

export default class App extends React.Component {
  componentDidMount = () => {
    YellowBox.ignoreWarnings(['Require cycle', 'Warning: Failed']);
  };

  render() {
    return <AppNavigator ref={ref => NavigationService.setTopNavigator(ref)} />;
  }
}
