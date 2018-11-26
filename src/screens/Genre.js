import React, { Component } from 'react'
import { View, Text, ActivityIndicator, FlatList, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { color } from '../libs/metrics';
import Card from '../components/Card';
import { getGenre } from '../controllers/GenreController'
import FloatingButton from '../components/FloatingButton'
import NavigationService from '../libs/NavigationService';

class Genre extends Component {

  state = {
    genres: [],
    refreshData: false,
    isLoading: true
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Genre',
    drawerLabel: 'Genre',

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
      <Card title={`Id: ${item.id}`} minHeight={150}>
        <View style={styles.genreWrapper}>
          <Text style={styles.genreName}>{item.name}</Text>
        </View>
      </Card>
    )
  }

  _getGenre = async () => {
    const genres = await getGenre()
    this.setState({ genres, isLoading: false })
  }

  _onPressFloatingButton = () => {
    NavigationService.navigate('AddGenre');
  };

  componentDidMount = async () => {
    await this._getGenre()
  }

  render() {
    const { isLoading, genres, refreshData } = this.state
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
              onRefresh={() => this._getGenre()}
              data={genres}
              renderItem={({ item }) => this.renderContent(item)}
              keyExtractor={item => item.id.toString()}
            />
          )}
        <FloatingButton onPress={() => this._onPressFloatingButton()} />
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
  genreWrapper: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  genreName: {
    fontWeight: 'bold',
    fontSize: 15
  }
})

export default Genre