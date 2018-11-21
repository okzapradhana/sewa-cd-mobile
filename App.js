import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {RkButton } from 'react-native-ui-kitten'

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>PPK</Text>
        <RkButton>Button</RkButton>

      </View>
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
});
