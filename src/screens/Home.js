import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  AsyncStorage
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getCD } from '../controllers/CDController';
import { getProfile } from '../controllers/UserController'
import Card from '../components/Card';
import { color } from '../libs/metrics';
import FloatingButton from '../components/FloatingButton';
import NavigationService from '../libs/NavigationService';
import Toast from 'antd-mobile-rn/lib/toast';
import { Button } from 'antd-mobile-rn';
import User from '../model/User';
import {observer} from 'mobx-react'

class Home extends Component {
  state = {
    user_id: '',
    allCd: [],
    refreshData: false,
    isLoading: true
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    drawerLabel: 'Home',

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

  componentDidMount = async () => {
    await this.getCDList();
    this.getCurrentUser();
  };

  getCDList = async () => {
    const allCd = await getCD();
    console.log('Fetch CD List');
    this.setState({ allCd: allCd, isLoading: false });
  };

  getCurrentUser = async () => {
    const user = await getProfile()
    console.log('Id user', user[0].id)
    this.setState({ user_id: user[0].id })
  }

  _onPressFloatingButton = () => {
    NavigationService.navigate('AddCD');
  };

  renderContent = item => {
    return (
      <Card
        minHeight={100}
        title={item.name}
        extraContent={
          <View style={{ flexDirection: 'row', padding: 8 }}>
            <Button style={styles.buttonStyle}>
              <Text style={{ color: 'white' }}>Buy</Text>
            </Button>
            <Button style={styles.buttonStyle}>
              <Text style={{ color: 'white' }}>Rent</Text>
            </Button>
          </View>
        }
      >
        <View style={styles.cardContent}>
          <Text>{`Price: Rp. ${item.harga}`}</Text>
          <Text>{`Stock: ${item.stock}`}</Text>
        </View>
      </Card>
    );
  };

  render() {
    console.log('USER', User.type)
    const { allCd, isLoading } = this.state;
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingIndicator}>
            <ActivityIndicator size="large" color={color.primary} />
          </View>
        ) : (
            <View>
              <FlatList
                contentContainerStyle={{ padding: 8 }}
                refreshing={this.state.refreshData}
                onRefresh={() => this.getCDList()}
                data={allCd}
                renderItem={({ item }) => this.renderContent(item)}
                keyExtractor={item => item.id.toString()}
              />
            </View>
          )}
        {User.type === 'admin' &&
          <FloatingButton onPress={() => this._onPressFloatingButton()} />
        }
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
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  buttonStyle: {
    flex: 1,
    backgroundColor: 'black'
  }
});

export default observer(Home);
