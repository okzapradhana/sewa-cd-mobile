import { client } from '../libs/api';

export const getPenyewaan = async () => {
  try {
    const sewaRes = await client.get('/allpeminjaman');
    if (sewaRes.data) {
      return sewaRes.data;
    }
  } catch (error) {
    console.log('Error on get sewa', error);
  }
};

export const getPenyewaanUser = async () => {
  try {
    const sewaRes = await client.get('/peminjaman');
    if (sewaRes.data) {
      return sewaRes.data;
    }
  } catch (error) {
    console.log('Error on get sewa', error);
  }
};

export const addPenyewaan = async (
  user_id,
  cd_id,
  discount_id,
  time_end,
  time_return
) => {
  try {
    const addSewaRes = await client.post('/peminjaman', {
      user_id,
      cd_id,
      discount_id,
      time_end,
      time_return
    });
    if (addSewaRes.data.affectedRows > 0) {
      return addSewaRes.data;
    }
  } catch (error) {
    console.log('Error on add sewa', error);
  }
};

export const updatePenyewaan = async (
  id_sewa,
  time_end,
  time_return,
  total
) => {
  try {
    const updateSewaRes = await client.put(`/pengembalian/${id_sewa}`, {
      time_end,
      time_return,
      total
    });
    if (updateSewaRes.data) {
      return updateSewaRes.data;
    }
  } catch (error) {
    console.log('Error on update sewa', error);
  }
};
