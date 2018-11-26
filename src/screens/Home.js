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
import { getProfile } from '../controllers/UserController';
import Card from '../components/Card';
import { color } from '../libs/metrics';
import FloatingButton from '../components/FloatingButton';
import NavigationService from '../libs/NavigationService';
import Toast from 'antd-mobile-rn/lib/toast';
import { Button, WhiteSpace, Modal, Checkbox, InputItem } from 'antd-mobile-rn';
import { RkButton } from 'react-native-ui-kitten';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { addPenyewaan } from '../controllers/PenyewaanController';
import moment from 'moment';
import User from '../model/User';
import { observer } from 'mobx-react';

class Home extends Component {
  state = {
    user_id: '',
    cd_id: '',
    date_start: '',
    date_end: '',
    allCd: [],
    refreshData: false,
    isLoading: true,
    isDateTimePickerVisible: false,
    visible: false,
    isChecklist: false,
    code: ''
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
    const user = await getProfile();
    console.log('Id user', user[0].id);
    this.setState({ user_id: user[0].id });
  };

  _onPressFloatingButton = () => {
    NavigationService.navigate('AddCD');
  };

  _showDateTimePicker = () => this.setState({ isDateTimePickerVisible: true });

  _hideDateTimePicker = () => this.setState({ isDateTimePickerVisible: false });

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  _handleDatePicked = date => {
    console.log('A date has been picked: ', moment(date).format('MM-DD-YYYY'));
    console.log('Now date', moment().format('MM-DD-YYYY'));
    const nowDate = moment().format('YYYY-MM-DD');
    const endDate = moment(date).format('YYYY-MM-DD');
    this.setState({ date_start: nowDate, date_end: endDate });
    this._hideDateTimePicker();
  };

  _addPenyewaan = () => {
    const { user_id, cd_id, date_start, date_end } = this.state;
    const res = await addPenyewaan(user_id, cd_id, date_start, date_end);
  };

  renderContent = item => {
    return (
      <Card
        clickable
        minHeight={100}
        title={`${item.name}`}
        extraContent={
          <View style={{ flexDirection: 'row', padding: 8 }}>
            <RkButton
              style={styles.buttonStyle1}
              rkType="warning"
              onPress={() => this.setState({ visible: true, cd_id: item.id })}
            >
              <Text style={{ color: 'white' }}>Rent</Text>
            </RkButton>
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
    console.log('USER', User.type);
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
        <Modal
          title="Rent"
          transparent
          onClose={this.onClose}
          maskClosable
          visible={this.state.visible}
          closable
        >
          <View style={{ paddingVertical: 20 }}>
            <Button type="primary" onClick={this._showDateTimePicker}>
              Duration
            </Button>
            <InputItem
              disabled
              style={styles.input}
              value={this.state.date_end}
            />
            <WhiteSpace />
            <Checkbox
              checked={this.state.isChecklist}
              style={{ tintColor: '#f00' }}
              onChange={event => {
                this.setState({ isChecklist: event.target.checked });
              }}
            >
              Use Code
            </Checkbox>
            {this.state.isChecklist && (
              <InputItem
                clear
                style={styles.input}
                value={this.state.code}
                onChange={value => this.setState({ code: value })}
                placeholder="Code"
              >
                Code
              </InputItem>
            )}
          </View>
          <Button type="warning" onClick={() => this._addPenyewaan()}>
            Rent!
          </Button>
          <DateTimePicker
            isVisible={this.state.isDateTimePickerVisible}
            onConfirm={this._handleDatePicked}
            onCancel={this._hideDateTimePicker}
          />
        </Modal>
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
  cardContent: {
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  buttonStyle1: {
    flex: 1
  }
});

export default observer(Home);
