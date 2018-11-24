import { AsyncStorage } from 'react-native'
import { client } from '../libs/api'

export const login = async (name, password) => {
  try{
    const loginRes = await client.post('/login', {
      name: name,
      password: password
    })
    console.log(loginRes.data)
    AsyncStorage.setItem('token', loginRes.data.token)
    client.defaults.headers.common['Authorization'] = `Bearer ${loginRes.data.token}`
    return { error: '' }
  } catch(error){
    console.log('Error on Login', error)
    return { error: error.response.data.status }
  }
}

export const getProfile = async () => {
  try{
    const profileRes = await client.get('/profil')
    console.log(profileRes.data)
  } catch(error){
    console.log('Error on Get Profile', error.response.data)
  }
}