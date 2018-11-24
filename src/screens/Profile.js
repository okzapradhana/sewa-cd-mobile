import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, Image } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { color } from '../libs/metrics';
import Card from '../components/Card';
import { getProfile } from '../controllers/UserController';
import { RkButton } from 'react-native-ui-kitten';
import { logout } from '../controllers/UserController'
import NavigationService from '../libs/NavigationService';

class Profile extends Component {

  state = {
    profile: '',
    refreshData: false,
    isLoading: true
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'Profile',
    drawerLabel: 'Profile',

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
    await this.getProfileDetail()
  }

  getProfileDetail = async () => {
    const profile = await getProfile()
    this.setState({ profile, isLoading: false })
    console.log('Profile State', this.state.profile)
  }

  renderContent = (item) => {
    return (
      <Card minHeight={200}>
        <View style={styles.cardContent}>
          <Text style={[styles.profileText, { fontWeight: 'bold' }]}>{item.name.toUpperCase()}</Text>
          <Text style={{ color: 'gray' }}>{item.alamat}</Text>
          <Image style={styles.profilePhoto} source={require("../../assets/user.png")} />
          <Text style={styles.profileText}>{item.phone}</Text>
        </View>
      </Card>
    )
  }

  logoutUser = async () => {
    const logoutRes = await logout()
    console.log("logout", logoutRes)
    NavigationService.navigate('Login')
  }

  render() {
    const { profile, isLoading } = this.state
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
            <View>
              <FlatList
                contentContainerStyle={{padding: 8}}
                refreshing={this.state.refreshData}
                onRefresh={() => this.getProfileDetail()}
                data={profile}
                renderItem={({ item }) => this.renderContent(item)}
                keyExtractor={item => item.id.toString()}
              />
              <View style={{ display: 'flex', alignSelf: 'center' }}>
                <RkButton
                  onPress={() => this.logoutUser()}
                  style={{ marginTop: 10, width: 250, backgroundColor: color.primary }}
                >
                  Logout
              </RkButton>
              </View>
            </View>
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
  cardContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  profileText: {
    fontSize: 20
  },
  profilePhoto: {
    width: 100,
    height: 100,
    margin: 20,
  }
})

export default Profile