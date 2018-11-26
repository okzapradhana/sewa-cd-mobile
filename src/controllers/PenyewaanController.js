import { client } from '../libs/api'

export const getPenyewaan = async() => {
  try{
    const sewaRes = await client.get('/peminjaman')
    if(sewaRes.data){
      return sewaRes.data
    }
  } catch(error) {
    console.log('Error on get sewa', error)
  }
}

export const addPenyewaan = async(user_id, cd_id, time_start, time_end, price, denda, discount, total) => {
  try{
    const addSewaRes = await client.post('/peminjaman',{
      user_id,
      cd_id,
      time_start,
      time_end,
      price,
      denda,
      discount,
      total
    })
    if(addSewaRes.data){
      return addSewaRes.data
    }
  } catch(error){
    console.log('Error on add sewa', error)
  }
}