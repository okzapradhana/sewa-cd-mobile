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
import NavigationService from '../libs/NavigationService';
import { Button, Toast, Modal } from 'antd-mobile-rn';
import {
  getPenyewaan,
  updatePenyewaan
} from '../controllers/PenyewaanController';
import moment from 'moment-timezone';
import User from '../model/User';
import { observer } from 'mobx-react';

class Penyewaan extends Component {
  state = {
    allSewa: [],
    refreshData: false,
    isLoading: true,
    visible: false,
    sewa_id: '',
    end_date: '',
    return_date: '',
    total: ''
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

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  componentDidMount = async () => {
    await this.getSewaList();
  };

  getSewaList = async () => {
    if (User.type === 'admin') {
      const allSewa = await getPenyewaan();
      this.setState({ allSewa: allSewa, isLoading: false });
    } else {
      const allSewa = await getPenyewaanUser();
      this.setState({ allSewa: allSewa, isLoading: false });
    }
  };

  returnCD = async () => {
    const { sewa_id, end_date, return_date, total } = this.state;
    const res = await updatePenyewaan(sewa_id, end_date, return_date, total);
    if (res) {
      this.setState({ visible: false });
      Toast.success('CD berhasil dikembalikan', 2);
      this.componentDidMount();
    } else {
      this.setState({ visible: false });
      Toast.fail('CD gagal dikembalikan', 2);
    }
  };

  renderContent = item => {
    const startDate = moment(item.time_start)
      .tz('America/Los_Angeles')
      .format('YYYY-MM-DD HH:mm:ss');
    const endDate = moment(item.time_end)
      .tz('America/Los_Angeles')
      .format('YYYY-MM-DD HH:mm:ss');
    const returnDate = moment(item.time_return)
      .tz('America/Los_Angeles')
      .format('YYYY-MM-DD HH:mm:ss');
    const nowDate = moment()
      .tz('America/Los_Angeles')
      .format('YYYY-MM-DD HH:mm:ss');
    console.log(nowDate);
    return (
      <Card
        clickable={User.type === 'admin' ? true : false}
        minHeight={100}
        title={`Id: ${item.id}`}
        extraContent={
          User.type === 'admin' ? (
            item.time_return === null ? (
              <View style={{ flexDirection: 'row', padding: 8 }}>
                <Button
                  onClick={() =>
                    this.setState({
                      visible: true,
                      sewa_id: item.id,
                      end_date: endDate,
                      return_date: nowDate,
                      total: item.total
                    })
                  }
                  style={styles.buttonStyle}
                >
                  <Text style={{ color: 'white' }}>Return</Text>
                </Button>
              </View>
            ) : (
              <View style={{ flexDirection: 'row', padding: 8 }}>
                <Button
                  onClick={() =>
                    this.setState({
                      visible: true,
                      sewa_id: item.id,
                      end_date: endDate,
                      return_date: returnDate,
                      total: item.total
                    })
                  }
                  disabled
                  style={styles.buttonStyle}
                >
                  <Text style={{ color: 'white' }}>Sudah Dikembalikan</Text>
                </Button>
              </View>
            )
          ) : (
            ''
          )
        }
      >
        <View style={{ flex: 1, flexDirection: 'column' }}>
          <View style={styles.cardContent}>
            <Text>{`Denda: Rp. ${item.denda}`}</Text>
            <Text>{`Total: ${item.total}`}</Text>
          </View>
          <View
            style={{
              flex: 1,
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center'
            }}
          >
            <View style={{ flex: 1, flexDirection: 'column', marginTop: 10 }}>
              <Text style={{ fontWeight: 'bold' }}>Waktu Pinjam</Text>
              <Text>{startDate}</Text>
              <Text style={{ fontWeight: 'bold', marginTop: 20 }}>
                Batas Akhir Pinjam
              </Text>
              <Text>{endDate}</Text>
              <Text style={{ fontWeight: 'bold', marginTop: 20 }}>
                Waktu Kembali
              </Text>
              <Text>
                {item.time_return === null ? 'Belum dikembalikan' : returnDate}
              </Text>
            </View>
          </View>
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
        {User.type === 'admin' && (
          <Modal
            title="Return Confirm"
            transparent
            onClose={this.onClose}
            maskClosable
            visible={this.state.visible}
            closable
          >
            <View style={{ minHeight: 80 }}>
              <Text>Are you sure want to return the CD ?</Text>
              <View
                style={{
                  flex: 1,
                  marginTop: 20,
                  flexDirection: 'row',
                  justifyContent: 'space-between'
                }}
              >
                <Button
                  type="warning"
                  style={{ width: 90 }}
                  onClick={this.onClose}
                >
                  No
                </Button>
                <Button
                  type="primary"
                  style={{ width: 90 }}
                  onClick={this.returnCD}
                >
                  Yes
                </Button>
              </View>
            </View>
          </Modal>
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

export default observer(Penyewaan);
