import axios from 'axios';

export const getCart = url => ({
  type: 'GET_CART',
  payload: axios.get(url),
});

export const addCart = (url, data) => ({
  type: 'ADD_CART',
  payload: axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  }),
});

export const deleteCart = url => ({
  type: 'DELETE_CART',
  payload: axios.delete(url),
});
