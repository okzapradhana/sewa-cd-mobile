import React, { Component } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { color } from '../libs/metrics';


/*FloatingButton Component
  Props:
  onPress: void
*/

export class FloatingButton extends Component {
  render() {
    return (
      <TouchableOpacity
        style={styles.button}
        onPress={this.props.onPress}
      >
        <View style={styles.icon}>
          <Ionicons name="md-add" color={color.white} size={30} />
        </View>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    width: 60,
    height: 60,
    borderRadius: 100,
    backgroundColor: color.darkOrange,
    position: 'absolute',
    right: 30,
    bottom: 60,
    elevation: 2,
  },
  icon: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center'
  }
})

export default FloatingButton
