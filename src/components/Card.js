import React, { Component } from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { color } from '../libs/metrics'

/*Card Component
  Props: title , minHeight
*/

class Card extends Component {
  render() {
    return (
      <View style={styles.container}>
        <View style={[styles.wrapper, this.props.minHeight ? {minHeight: this.props.minHeight} : {minHeight: 200}]}>
          {this.props.title &&
            <View style={styles.title}>
              <Text style={styles.textTitle}>{this.props.title}</Text>
            </View>
          }
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
    justifyContent: "center"
  },
  wrapper: {
    flex: 1,
    borderRadius: 10,
    elevation: 2,
    marginTop: 20,
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
  }
})

export default Card