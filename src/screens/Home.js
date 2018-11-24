import React, { Component } from 'react'
import { View, Text, Image, FlatList } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { getCD } from '../controllers/CDController';
import Card from '../components/Card';
import { color } from '../libs/metrics';

class Home extends Component {

  state = {
    allCd: []
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Home',
    drawerLabel: 'Home',

    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerLeft:
      <View style={{ paddingLeft: 15 }}>
        <Ionicons
          name="md-menu"
          size={30}
          color="white"
          onPress={() => navigation.openDrawer()}
        />
      </View>,
    headerTintColor: '#fff',
  })

  componentDidMount = async () => {
    const allCd = await getCD()
    this.setState({ allCd: allCd })
  };

  renderContent = (item) => {
    return (
      <Card title={item.name}>
        <Text>{`Price: Rp. ${item.harga}`}</Text>
        <Text>{`Stock: ${item.stock}`}</Text>
      </Card>
    )
  }

  render() {
    return (
      <View>
        <FlatList
          data={this.state.allCd}
          renderItem={({ item }) => this.renderContent(item)}
          keyExtractor={item => item.id.toString()}
        />
      </View>
    )
  }
}

export default Home