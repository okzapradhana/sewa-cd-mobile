import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Card from '../components/Card';
import { color } from '../libs/metrics';
import FloatingButton from '../components/FloatingButton';
import NavigationService from '../libs/NavigationService';
import { Button } from 'antd-mobile-rn';
import { getPenyewaan } from '../controllers/PenyewaanController';

class Penyewaan extends Component {
  state = {
    allSewa: [],
    refreshData: false,
    isLoading: true
  };

  static navigationOptions = ({ navigation }) => ({
    title: 'Penyewaan',
    drawerLabel: 'Penyewaan',

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
    await this.getSewaList();
  };

  getSewaList = async () => {
    const allSewa = await getPenyewaan();
    console.log('Fetch Sewa List');
    this.setState({ allSewa: allSewa, isLoading: false });
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
    const { allSewa, isLoading } = this.state;
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
              onRefresh={() => this.getSewaList()}
              data={allSewa}
              renderItem={({ item }) => this.renderContent(item)}
              keyExtractor={item => item.id.toString()}
            />
          </View>
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
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  buttonStyle: {
    flex: 1,
    backgroundColor: 'black'
  }
});

export default Penyewaan;