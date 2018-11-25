import { client } from '../libs/api'

export const getUsers = async() => {
  try{
    const usersRes = await client.get('/users')
    if(usersRes.data){
      return usersRes.data
    }
  } catch(error){
    console.log('Error on get all user', error)
  }
}