import { NavigationActions } from 'react-navigation'

let _navigator;

function setTopNavigator(navigator) {
  _navigator = navigator;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params
    })
  )
}

export default {
  navigate,
  setTopNavigator
}