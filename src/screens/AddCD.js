import React, { Component } from 'react'
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'
import { color } from '../libs/metrics';
import InputItem from 'antd-mobile-rn/lib/input-item'
import PickerView from 'antd-mobile-rn/lib/picker-view';
import Toast from 'antd-mobile-rn/lib/toast'
import { RkButton } from 'react-native-ui-kitten'
import { addNewCD } from '../controllers/CDController';
import NavigationService from '../libs/NavigationService';

const dataset = [
  [
    {
      label: 'Select Genre',
      value: ''
    },
  ],
  [
    {
      label: 'Action',
      value: 2,
    },
    {
      label: 'Horror',
      value: 5,
    },
    {
      label: 'Romance',
      value: 6
    },
    {
      label: 'Comedy',
      value: 7
    },
    {
      label: 'Documentary',
      value: 8
    }
  ],
];

class AddCD extends Component {

  state = {
    name: '',
    stock: '',
    price: '',
    genreId: undefined,
    genres: [],
    isLoadingSubmit: false,
  }

  static navigationOptions = () => ({
    title: 'Tambah CD',
    drawerLabel: 'Tambah CD',

    headerStyle: {
      backgroundColor: color.primary,
    },
    headerTintColor: color.white,
  })



  _addCD = async () => {
    const { name, stock, price, genreId } = this.state
    this.setState({ isLoadingSubmit: true })
    console.log('Genre Id', parseInt(genreId[1]))
    console.log('Name', name)
    console.log('Stock', stock)
    console.log('Price', price)
    const addCDResp = await addNewCD(name, stock, price, parseInt(genreId[1]))
    this.setState({ isLoadingSubmit: false })
    if (addCDResp.affectedRows > 0) {
      Toast.success('Berhasil tambah CD', 2)
      NavigationService.navigate('Home')
    } else{
      Toast.fail('Gagal tambah CD', 2)
    }
  }

  _onChange = (value) => {
    console.log(parseInt(value[1]))
    this.setState({
      genreId: value
    })
  }

  render() {
    const { isLoadingSubmit, name, stock, price, genreId } = this.state
    return (
      <View style={styles.container}>
        <InputItem
          clear
          style={styles.input}
          value={name}
          onChange={(value) => this.setState({ name: value })}
          placeholder="CD Name"
        >
          CD Name
        </InputItem>
        <InputItem
          clear
          style={styles.input}
          value={stock}
          type="number"
          onChange={(value) => this.setState({ stock: value })}
          placeholder="Stock"
        >
          Stock
        </InputItem>
        <InputItem
          clear
          style={styles.input}
          value={price}
          type="number"
          onChange={(value) => this.setState({ price: value })}
          placeholder="Price"
        >
          Price
        </InputItem>

        <PickerView
          onChange={this._onChange}
          value={genreId}
          data={dataset}
          cascade={false}
        />
        {!isLoadingSubmit ? (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <RkButton
              onPress={this._addCD}
              style={{ marginTop: 10, width: 300, backgroundColor: color.primary }}
            >
              Add CD
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

export default AddCD
