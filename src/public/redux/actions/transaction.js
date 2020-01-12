import axios from 'axios';

export const getTransaction = (url) => ({
  type: 'GET_TRANSACTION',
  payload: axios.get(url),
});

export const createTransaction = (url, data) => ({
  type: 'CREATE_TRANSACTION',
  payload: axios.post(url, data),
})