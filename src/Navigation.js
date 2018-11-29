import { createDrawerNavigator, createSwitchNavigator, createAppContainer, createStackNavigator } from 'react-navigation'
import { color } from './libs/metrics';
import Register from './screens/Register'
import Login from './screens/Login'
import Diskon from './screens/Diskon'
import Home from './screens/Home'
import Profile from './screens/Profile';
import Genre from './screens/Genre'
import AddCD from './screens/AddCD'
import Users from './screens/Users'
import AddDiskon from './screens/AddDiskon'
import AddGenre from './screens/AddGenre';
import Penyewaan from './screens/Penyewaan';
import {observer} from 'mobx-react'

const HomeStack = createStackNavigator({
  Home: Home,
  AddCD: AddCD
})

const ProfileStack = createStackNavigator({
  Profile: Profile
})

const DiskonStack = createStackNavigator({
  Diskon: Diskon,
  AddDiskon: AddDiskon
})

const GenreStack = createStackNavigator({
  Genre: Genre,
  AddGenre: AddGenre
})

const UsersStack = createStackNavigator({
  Users: Users
})

const PenyewaanStack = createStackNavigator({
  Penyewaan: Penyewaan
})

const HomeNavigatorAdmin = createDrawerNavigator(
    {
      Home: HomeStack,
      Diskon: DiskonStack,
      Genre: GenreStack,
      Users: UsersStack,
      Profile: ProfileStack,
      Penyewaan: PenyewaanStack
    }          
  ,
  {
    drawerPosition: 'left',
    initialRouteName: 'Home',
    drawerBackgroundColor: '#f4511e',
    contentOptions: {
      activeTintColor: color.white,
      inactiveTintColor: color.whiteTransparency
    }
  }
)

const HomeNavigatorUser = createDrawerNavigator(
  {
    Home: HomeStack,
    Diskon: DiskonStack,
    Genre: GenreStack,
    Profile: ProfileStack,
    Penyewaan: PenyewaanStack
  }         
,
{
  drawerPosition: 'left',
  initialRouteName: 'Home',
  drawerBackgroundColor: '#f4511e',
  contentOptions: {
    activeTintColor: color.white,
    inactiveTintColor: color.whiteTransparency
  }
}
)

const AppNavigator = createSwitchNavigator({
  Login: { screen: Login },
  Register: { screen: Register },
  HomeAdmin: { screen:  HomeNavigatorAdmin },
  HomeUser: {screen: HomeNavigatorUser}
})

export default observer(createAppContainer(AppNavigator))