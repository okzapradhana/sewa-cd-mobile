import React, { Component } from 'react';
import {
  View,
  Text,
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Clipboard
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { color } from '../libs/metrics';
import Card from '../components/Card';
import { getDiscount } from '../controllers/DiskonController';
import NavigationService from '../libs/NavigationService';
import FloatingButton from '../components/FloatingButton';
import { Button } from 'antd-mobile-rn';
import { observer } from 'mobx-react';
import User from '../model/User';

class Diskon extends Component {
  state = {
    discounts: [],
    refreshData: false,
    isLoading: true
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'Diskon',
    drawerLabel: 'Diskon',

    headerStyle: {
      backgroundColor: color.primary
    },
    headerLeft: (
      <View style={{ paddingLeft: 15 }}>
        <Ionicons
          name="md-menu"
          size={30}
          color={color.white}
          onPress={() => navigation.openDrawer()}
        />
      </View>
    ),
    headerTintColor: color.white
  });

  _copyCode = async code => {
    await Clipboard.setString(code);
    alert('Copied to Clipboard!');
  };

  renderContent = item => {
    return (
      <Card
        clickable={User.type === 'user' ? true : false}
        title={`Code: ${item.code}`}
        minHeight={150}
        extraContent={
          User.type === 'user' ? (
            <View style={{ flexDirection: 'row', padding: 8 }}>
              <Button
                onClick={() => this._copyCode(item.code)}
                style={styles.buttonStyle}
              >
                <Text style={{ color: 'white' }}>Copy Code</Text>
              </Button>
            </View>
          ) : (
            ''
          )
        }
      >
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View style={styles.codeAndDisc}>
            <Text>{`Disc Value: ${item.discount}`}</Text>
          </View>
        </View>
      </Card>
    );
  };

  _getDiscount = async () => {
    const discounts = await getDiscount();
    this.setState({ discounts, isLoading: false });
  };

  _onPressFloatingButton = () => {
    NavigationService.navigate('AddDiskon');
  };

  componentDidMount = async () => {
    await this._getDiscount();
  };

  render() {
    const { isLoading, discounts, refreshData } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingIndicator}>
            <ActivityIndicator size="large" color={color.primary} />
          </View>
        ) : (
          <FlatList
            contentContainerStyle={{ padding: 8 }}
            refreshing={refreshData}
            onRefresh={() => this._getDiscount()}
            data={discounts}
            renderItem={({ item }) => this.renderContent(item)}
            keyExtractor={item => item.code.toString()}
          />
        )}
        {User.type === 'admin' && (
          <FloatingButton onPress={() => this._onPressFloatingButton()} />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  codeAndDisc: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  buttonStyle: {
    flex: 1,
    backgroundColor: 'black'
  }
});

export default observer(Diskon);
