import { client } from '../libs/api'

export const getGenre = async () => {
  try{
    const genreRes = await client.get('/genre')
    console.log('Res get genre' , genreRes.data)
    if(genreRes.data){
      return genreRes.data
    }
  } catch(error){
    console.log('Error on Get Genre', error)
  }
}