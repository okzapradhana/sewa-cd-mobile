import React, { Component } from 'react';
import { StyleSheet, Text, ActivityIndicator, View } from 'react-native';
import { RkButton, RkTextInput } from 'react-native-ui-kitten'
import { register } from '../controllers/UserController';
import NavigationService from '../libs/NavigationService';
import { Toast } from 'antd-mobile-rn/lib/button'

class Register extends Component {

  state = {
    nama: '',
    username: '',
    password: '',
    alamat: '',
    noTelp: '',
    isLoading: false
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
      key: 'password',
      placeholder: 'Password'
    },
    {
      id: 4,
      key: 'No Telp',
      placeholder: 'Nomor Telp'
    },
  ]

  registerUser = async() => {
    const { name, password, noTelp } = this.state
    this.setState({isLoading: true})
    const resRegist = await register(name, password, alamat, noTelp)
    this.setState({isLoading: false})
    if(resRegist.affectedRows === 1){
      Toast.success('Login berhasil', 1, () => NavigationService.navigate('Login'))
    }
  }

  renderContent = () => {
    return this.items.map((item) => {
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
    const { isLoading } = this.state
    return (
      <View style={styles.container}>
        <Text style={styles.title}>SEWA CD</Text>
        {this.renderContent()}
        {isLoading ? (
          <View style={styles.loadingIndicator}>
            <ActivityIndicator
              size="large"
              color={color.primary}
            />
          </View>
        ) : (
          <RkButton
              onPress={() => this.registerUser()}
              style={{ marginTop: 10, width: 250, backgroundColor: '#f4511e' }}
            >
              Register
          </RkButton>
        )}
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
  },
  loadingIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default Register