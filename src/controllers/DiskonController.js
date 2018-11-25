import { client } from '../libs/api';

export const getDiscount = async() => {
  try {
    const discRes = await client.get('/discount')
    console.log('Response from get discount ' , discRes)
    if (discRes.data) {
      return discRes.data
    }
  } catch(error){
    console.log('Error on Get Discount')
  }
}

export const addNewDiscount = async(code, quota, discount) => {
  try{
    const addDiscRes = await client.post('/discount', {
      code,
      quota,
      discount
    })
    if(addDiscRes.data){
      return addDiscRes.data
    }
  } catch(error){
    console.log('Error on add Disc', error)
  }
}