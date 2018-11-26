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

export const addNewGenre = async (name) => {
  try{
    const addGenreRes = await client.post('/genre',{
      name
    })
    if(addGenreRes.data){
      return addGenreRes.data
    }
  } catch(error) {
    console.log('Error on Add Genre' , error)
  }
}