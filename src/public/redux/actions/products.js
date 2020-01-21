import axios from 'axios';

export const getProducts = url => ({
  type: 'GET_PRODUCTS',
  payload: axios.get(url),
});

export const addProduct = (url, data) => ({
  type: 'ADD_PRODUCT',
  payload: axios.post(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
});

export const updateProduct = (url, data) => ({
  type: 'UPDATE_PRODUCT',
  payload: axios.patch(url, data, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  }),
});

export const deleteProduct = url => ({
  type: 'DELETE_PRODUCT',
  payload: axios.delete(url),
});
