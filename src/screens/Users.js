import React, { Component } from 'react'
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { color } from '../libs/metrics';
import Card from '../components/Card';
import { getUsers } from '../controllers/UsersController';

class Users extends Component {

  state = {
    users: [],
    refreshData: false,
    isLoading: true
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Users',
    drawerLabel: 'Users',

    headerStyle: {
      backgroundColor: color.primary,
    },
    headerLeft:
      <View style={{ paddingLeft: 15 }}>
        <Ionicons
          name="md-menu"
          size={30}
          color={color.white}
          onPress={() => navigation.openDrawer()}
        />
      </View>,
    headerTintColor: color.white,
  })

  renderContent = (item) => {
    return (
      <Card title={item.name} minHeight={150}>
        <View style={{ display: 'flex', flexDirection: 'row' }}>
          <View style={styles.codeAndDisc}>
            <Text>{`Name: ${item.name}`}</Text>
          </View>
          <View style={styles.quota}>
            <Text>Address</Text>
            <Text>{item.alamat}</Text>
          </View>
          <Text>{item.phone}</Text>
        </View>
      </Card>
    )
  }

  _getUsers = async () => {
    const discounts = await getUsers()
    this.setState({ discounts, isLoading: false })
  }

  componentDidMount = async () => {
    await this._getUsers()
  }

  render() {
    const { isLoading, users, refreshData } = this.state
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingIndicator}>
            <ActivityIndicator
              size="large"
              color={color.primary}
            />
          </View>
        ) : (
            <FlatList
              contentContainerStyle={{ padding: 8 }}
              refreshing={refreshData}
              onRefresh={() => this._getUsers()}
              data={users}
              renderItem={({ item }) => this.renderContent(item)}
              keyExtractor={item => item.id.toString()}
            />
          )}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  codeAndDisc: {
    flex: 1,
    padding: 10,
    flexDirection: 'column',
    justifyContent: 'center'
  },
  quota: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center'
  }
})

export default Users