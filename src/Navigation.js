import { createDrawerNavigator, createSwitchNavigator, createAppContainer, createStackNavigator  } from 'react-navigation'
import Register from './screens/Register'
import Login from './screens/Login'
import Diskon from './screens/Diskon'
import Home from './screens/Home'
import Profile from './screens/Profile';
import { color } from './libs/metrics';

const HomeStack = createStackNavigator({
  Home: Home
})

const ProfileStack = createStackNavigator({
  Profile: Profile
})

const DiskonStack = createStackNavigator({
  Diskon: Diskon
})

const HomeNavigator = createDrawerNavigator({
  Home: HomeStack,
  Diskon: DiskonStack,
  Profile: ProfileStack
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