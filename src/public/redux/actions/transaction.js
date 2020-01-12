import axios from 'axios';

export const getTransaction = (url) => ({
  type: 'GET_TRANSACTION',
  payload: axios.get(url),
});