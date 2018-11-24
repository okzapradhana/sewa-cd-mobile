import Axios from 'axios'
import { AsyncStorage } from 'react-native'

export const client = Axios.create({
  baseURL: 'http://35.231.37.40:3000/api',
  headers: { 'Content-Type': 'application/json', Accept: 'application/json' }
})

export const readLocalAuthToken = async () => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    client.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  return token;
};

export const removeLocalAuthToken = async () => {
  await AsyncStorage.clear();
  client.defaults.headers.common['Authorization'] = null;
};