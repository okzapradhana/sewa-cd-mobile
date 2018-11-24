import { client } from '../libs/api'

export const getCD = async() => {
  try{
    const cdRes = await client.get('/cd')
    console.log(cdRes.data)
    return cdRes.data 
  } catch(error){
    console.log('Error on CD', error)
  }
}