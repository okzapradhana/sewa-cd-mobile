import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { color } from '../libs/metrics'

class Card extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.wrapper}>
          {this.props.title ?
            <View style={styles.title}>
              <Text style={styles.textTitle}>{this.props.title}</Text>
            </View>
            :
            ''}
          <View style={styles.content}>
            {this.props.children}
          </View>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  wrapper: {
    flex: 1,
    borderRadius: 10,
    elevation: 3,
    minHeight: 100,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  title: {
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 10,
    backgroundColor: color.primary,
    justifyContent: 'flex-start',
  },
  textTitle: {
    color: color.white,
    fontSize: 15,
    fontWeight: 'bold'
  },
  content: {
    padding: 10,
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
})

export default Card