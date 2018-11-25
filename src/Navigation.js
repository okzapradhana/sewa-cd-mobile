import { createDrawerNavigator, createSwitchNavigator, createAppContainer, createStackNavigator  } from 'react-navigation'
import Register from './screens/Register'
import Login from './screens/Login'
import Diskon from './screens/Diskon'
import Home from './screens/Home'
import Profile from './screens/Profile';
import Genre from './screens/Genre'
import AddCD from './screens/AddCD'
import Users from './screens/Users'
import { color } from './libs/metrics';

const HomeStack = createStackNavigator({
  Home: Home,
  AddCD: AddCD
})

const ProfileStack = createStackNavigator({
  Profile: Profile
})

const DiskonStack = createStackNavigator({
  Diskon: Diskon
})

const GenreStack = createStackNavigator({
  Genre: Genre
})

const UsersStack = createStackNavigator({
  Users: Users
})

const HomeNavigator = createDrawerNavigator({
  Home: HomeStack,
  Diskon: DiskonStack,
  Genre: GenreStack,
  Profile: ProfileStack,
  Users: UsersStack
},
  {
    drawerPosition: 'left',
    initialRouteName: 'Home',
    drawerBackgroundColor: '#f4511e',
    contentOptions:{
      activeTintColor: color.white,
      inactiveTintColor: color.whiteTransparency
    }
  }
)

const AppNavigator = createSwitchNavigator({
  Login: { screen: Login },
  Register: { screen: Register },
  Home: { screen: HomeNavigator }
})

export default createAppContainer(AppNavigator)