import React, { Component } from 'react';
import { View, StyleSheet, Text, TouchableWithoutFeedback } from 'react-native';
import { color } from '../libs/metrics';

/*Card Component
  Props: 
  title: String
  minHeight: number
  extraContent: void
  onPress: void
*/

class Card extends Component {
  state = {
    expanded: false
  };
  render() {
    return (
      <TouchableWithoutFeedback
        onPress={
          this.props.clickable &&
          (() => {
            this.props.extraContent
              ? this.setState(prev => ({ expanded: !prev.expanded }))
              : this.props.onPress();
          })
        }
      >
        <View style={styles.container}>
          <View
            style={[
              styles.wrapper,
              this.props.minHeight
                ? { minHeight: this.props.minHeight }
                : { minHeight: 200 }
            ]}
          >
            {this.props.title && (
              <View style={styles.title}>
                <Text style={styles.textTitle}>{this.props.title}</Text>
              </View>
            )}
            <View style={styles.content}>{this.props.children}</View>
            {this.state.expanded && (
              <View style={styles.extraContentContainer}>
                {this.props.extraContent}
              </View>
            )}
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowRadius: 5,
    shadowOpacity: 0.5
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
    justifyContent: 'flex-start'
  },
  textTitle: {
    color: color.white,
    fontSize: 15,
    fontWeight: 'bold'
  },
  content: {
    padding: 10,
    flex: 1
  },
  extraContentContainer: {
    minHeight: 50
  }
});

export default Card;
