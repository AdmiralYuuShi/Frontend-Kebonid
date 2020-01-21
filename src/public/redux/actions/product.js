import axios from 'axios';

export const getProduct = url => ({
  type: 'GET_PRODUCT',
  payload: axios.get(url),
});
