import { AsyncStorage } from 'react-native'
import { client } from '../libs/api'

export const login = async (name, password) => {
  try{
    const loginRes = await client.post('/login', {
      name,
      password
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

export const register = async (name, password, alamat, phone) => {
  try{
    const registerRes = await client.post('/register', {
      name,
      password,
      alamat,
      phone
    })
    console.log(registerRes.data)
    if(registerRes.data.affectedRows > 0){
      return registerRes.data
    } else{
      return { error: 'register failed' }
    }
  } catch(error){
    console.log('Error on Register', error)
    return { error: error.response.data }
  }
}

export const logout = async () => {
  await AsyncStorage.clear()
  return { success: true }
}

export const getProfile = async () => {
  try{
    const profileRes = await client.get('/profil')
    console.log(profileRes.data)
    return profileRes.data
  } catch(error){
    console.log('Error on Get Profile', error.response.data)
  }
}