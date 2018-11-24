import { createDrawerNavigator, createSwitchNavigator, createAppContainer, createStackNavigator  } from 'react-navigation'
import Register from './screens/Register'
import Login from './screens/Login'
import Diskon from './screens/Diskon'
import Home from './screens/Home'

const HomeStack = createStackNavigator({
  Home: Home
})

const DiskonStack = createStackNavigator({
  Diskon: Diskon
})

const HomeNavigator = createDrawerNavigator({
  Home: HomeStack,
  Diskon: DiskonStack
},
  {
    drawerPosition: 'left',
    initialRouteName: 'Home',
    drawerBackgroundColor: '#f4511e',
    contentOptions:{
      activeTintColor: 'white',
      inactiveTintColor: 'white'
    }
  }
)

const AppNavigator = createSwitchNavigator({
  Login: { screen: Login },
  Register: { screen: Register },
  Home: { screen: HomeNavigator }
})

export default createAppContainer(AppNavigator)