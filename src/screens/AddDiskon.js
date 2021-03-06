import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { color } from '../libs/metrics';
import InputItem from 'antd-mobile-rn/lib/input-item';
import Toast from 'antd-mobile-rn/lib/toast';
import { RkButton } from 'react-native-ui-kitten';
import NavigationService from '../libs/NavigationService';
import { addNewDiscount } from '../controllers/DiskonController';

class AddDiskon extends Component {
  state = {
    code: '',
    discount: '',
    isLoadingSubmit: false
  };

  static navigationOptions = () => ({
    title: 'Tambah Diskon',
    drawerLabel: 'Tambah Diskon',

    headerStyle: {
      backgroundColor: color.primary
    },
    headerTintColor: color.white
  });

  _addDiscount = async () => {
    const { code, discount } = this.state;
    this.setState({ isLoadingSubmit: true });
    console.log('Code', code);
    console.log('Discount', discount);
    const addDiscResp = await addNewDiscount(code, discount);
    this.setState({ isLoadingSubmit: false });
    if (addDiscResp.affectedRows > 0) {
      Toast.success('Berhasil tambah Diskon', 2);
      NavigationService.navigate('Diskon');
    } else {
      Toast.fail('Gagal tambah Diskon', 2);
    }
  };

  render() {
    const { isLoadingSubmit, code, discount } = this.state;
    return (
      <View style={styles.container}>
        <InputItem
          clear
          style={styles.input}
          value={code}
          onChange={value => this.setState({ code: value })}
          placeholder="Code"
        >
          Code
        </InputItem>
        <InputItem
          clear
          style={styles.input}
          value={discount}
          type="number"
          onChange={value => this.setState({ discount: value })}
          placeholder="Discount"
        >
          Discount
        </InputItem>

        {!isLoadingSubmit ? (
          <View style={{ justifyContent: 'center', alignItems: 'center' }}>
            <RkButton
              onPress={this._addDiscount}
              style={{
                marginTop: 10,
                width: 300,
                backgroundColor: color.primary
              }}
            >
              Add Discount
            </RkButton>
          </View>
        ) : (
          <View style={styles.loadingIndicator}>
            <ActivityIndicator size="large" color={color.primary} />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  input: {
    marginTop: 15
  },
  loadingIndicator: {
    justifyContent: 'center',
    alignItems: 'center'
  }
});

export default AddDiskon;
