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

export const addNewCD = async(name, stock, harga, genre_id) => {
  try{
    const addCdRes = await client.post('/cd', {
      name,
      stock,
      harga,
      genre_id
    })
    if(addCdRes.data){
      return addCdRes.data
    }
  } catch(error){
    console.log('Error on add CD', error)
  }
}