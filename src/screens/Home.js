import React, { Component } from 'react'
import { View, Text, StyleSheet, ScrollView, FlatList, RefreshControl, ActivityIndicator } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { getCD } from '../controllers/CDController';
import Card from '../components/Card';
import { color } from '../libs/metrics';

class Home extends Component {

  state = {
    allCd: [],
    refreshData: false,
    isLoading: true
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    drawerLabel: 'Home',

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

  componentDidMount = async () => {
    await this.getCDList()
  }

  getCDList = async () => {
    const allCd = await getCD()
    console.log('Fetch CD List')
    this.setState({ allCd: allCd, isLoading: false })
  }

  renderContent = (item) => {
    return (
      <Card minHeight={100} title={item.name}>
        <View style={styles.cardContent}>
          <Text>{`Price: Rp. ${item.harga}`}</Text>
          <Text>{`Stock: ${item.stock}`}</Text>
        </View>
      </Card>
    )
  }


  render() {
    const { allCd, isLoading } = this.state
    return (
      <View style={styles.container}>
        {isLoading ? (
          <View style={styles.loadingIndicator}>
            <ActivityIndicator
              size="large"
              color={color.primary}
            />
          </View>
        ) :
          (
            <FlatList
              refreshing={this.state.refreshData}
              onRefresh={() => this.getCDList()}
              data={allCd}
              renderItem={({ item }) => this.renderContent(item)}
              keyExtractor={item => item.id.toString()}
            />
          )
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    paddingBottom: 30,
  },
  loadingIndicator: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContent:{
    flexDirection: 'row',
    justifyContent: 'space-around',
  }
})

export default Home