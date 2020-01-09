import axios from 'axios';

export const getProducts = url => ({
  type: 'GET_PRODUCTS',
  payload: axios.get(url),
});
