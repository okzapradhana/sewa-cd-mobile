import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { RkButton, RkTextInput } from 'react-native-ui-kitten'
import NavigationService from '../libs/NavigationService';
import { AsyncStorage } from 'react-native'
import { login } from '../controllers/UserController';
import { readLocalAuthToken } from '../libs/api';

class Login extends Component {

  state = {
    name: '',
    password: ''
  }

  static navigationOptions = {
    title: 'Login',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
  }

  componentDidMount = async() => {
    const token = await readLocalAuthToken()
    if(token){
      NavigationService.navigate('Home')
    }
  }

  login = async() => {
    const { name, password } = this.state
    const res = await login(name, password)
    if(res.error === ''){
      NavigationService.navigate('Home')
    }
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <Text style={styles.title}>SEWA CD</Text>
        <RkTextInput
          onChangeText={(value) => this.setState({ name: value })}
          style={styles.input}
          value={this.state.name}
          rkType="bordered"
          placeholder="Name"
           />
        <RkTextInput
          onChangeText={(value) => this.setState({ password: value })}
          style={styles.input}
          value={this.state.password}
          rkType="bordered"
          placeholder="Password" />
        <RkButton
          onPress={this.login}
          style={{ marginTop: 10, width: 250, backgroundColor: '#f4511e' }}
          >
          Login
        </RkButton>
        <Text
          style={{ marginTop: 10 }}
          onPress={() => navigate('Register')}>
          Don't have account yet? Create account here
        </Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center'
  },
  input: {
    borderColor: '#f4511e',
    padding: 5,
    paddingLeft: 10,
    width: 250,
    borderRadius: 10,
  },
  title: {
    flex: 0.5,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#f4511e'
  }
})

export default Login