import React, { Component } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { color } from '../libs/metrics';
import InputItem from 'antd-mobile-rn/lib/input-item'
import Toast from 'antd-mobile-rn/lib/toast'
import { RkButton } from 'react-native-ui-kitten'
import NavigationService from '../libs/NavigationService';
import { addNewGenre } from '../controllers/GenreController'

class AddGenre extends Component {

  state = {
    name: '',
    isLoadingSubmit: false,
  }

  static navigationOptions = () => ({
    title: 'Tambah Genre',
    drawerLabel: 'Tambah Genre',

    headerStyle: {
      backgroundColor: color.primary,
    },
    headerTintColor: color.white,
  })



  _addGenre = async () => {
    const { name } = this.state
    this.setState({ isLoadingSubmit: true })
    console.log('Name', name)
    const addGenreResp = await addNewGenre(name)
    this.setState({ isLoadingSubmit: false })
    if (addGenreResp.affectedRows > 0) {
      Toast.success('Berhasil tambah Genre', 2)
      NavigationService.navigate('Genre')
    } else{
      Toast.fail('Gagal tambah Genre', 2)
    }
  }

  render() {
    const { isLoadingSubmit, name } = this.state
    return (
      <View style={styles.container}>
        <InputItem
          clear
          style={styles.input}
          value={name}
          onChange={(value) => this.setState({ name: value })}
          placeholder="Name"
        >
          Genre Name
        </InputItem>
        
        {!isLoadingSubmit ? (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <RkButton
              onPress={this._addGenre}
              style={{ marginTop: 10, width: 300, backgroundColor: color.primary }}
            >
              Add Genre
            </RkButton>
          </View>
        )
          :
          (
            <View style={styles.loadingIndicator}>
              <ActivityIndicator
                size="large"
                color={color.primary}
              />
            </View>
          )}

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  input: {
    marginTop: 15
  },
  loadingIndicator: {
    justifyContent: 'center',
    alignItems: 'center',
  },
})

export default AddGenre
