import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  FlatList,
  RefreshControl,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { getCD } from '../controllers/CDController';
import Card from '../components/Card';
import { color } from '../libs/metrics';
import FloatingButton from '../components/FloatingButton';
import NavigationService from '../libs/NavigationService';
import Toast from 'antd-mobile-rn/lib/toast';
import { Button } from 'antd-mobile-rn';

class Home extends Component {
  state = {
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
  };

  getCDList = async () => {
    const allCd = await getCD();
    console.log('Fetch CD List');
    this.setState({ allCd: allCd, isLoading: false });
  };

  addtoCart = async () => {
    Toast.success('Berhasil tambah cart', 2);
  };

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
            <Button style={styles.buttonStyle} onClick={this.addtoCart}>
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
              keyExtractor={item => item.id && item.id.toString()}
            />
          </View>
        )}
        <FloatingButton onPress={() => this._onPressFloatingButton()} />
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

export default Home;
