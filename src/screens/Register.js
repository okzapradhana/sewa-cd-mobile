import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { RkButton, RkTextInput } from 'react-native-ui-kitten'


class Register extends Component {

  state = {
    nama: '',
    username: '',
    password: '',
    alamat: '',
    noTelp: ''
  }

  static navigationOptions = {
    title: 'Register',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
  }
  
  items = [
    {
      id: 1,
      key: 'nama',
      placeholder: 'Name'
    },
    {
      id: 2,
      key: 'alamat',
      placeholder: 'Alamat'
    },
    {
      id: 3,
      key: 'username',
      placeholder: 'Username'
    },
    {
      id: 4,
      key: 'password',
      placeholder: 'Password'
    },
    {
      id: 5,
      key: 'No Telp',
      placeholder: 'Nomor Telp'
    },
  ]

  renderContent = () => {
    return this.items.map((item) => {
      const { value } = item
      return (
        <RkTextInput
          key={item.id}
          onChangeText={(text) => this.setState({ [item.key]: text })}
          style={styles.input}
          value={this.state[item.key]}
          placeholder={item.placeholder}
          rkType="bordered" />
      )
    })
  }

  render() {
    const { navigate } = this.props.navigation
    return (
      <View style={styles.container}>
        <Text style={styles.title}>SEWA CD</Text>
        {this.renderContent()}
        <RkButton
          style={{ marginTop: 10, width: 250, backgroundColor: '#f4511e' }}
        >
          Register
        </RkButton>
        <Text
          style={{ marginTop: 10 }}
          onPress={() => navigate('Login')}>
          Already have account? Sign In here
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
    width: 250
  },
  title: {
    flex: 0.5,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#f4511e'
  }
})

export default Register