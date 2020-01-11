import axios from 'axios';

export const getWishlists = url => ({
  type: 'GET_WISHLISTS',
  payload: axios.get(url),
});

export const addWishlist = (url, data) => ({
  type: 'ADD_WISHLIST',
  payload: axios.post(url, data, {
    headers: {
      'Content-Type': 'application/json',
    },
  }),
});

export const deleteWishlist = url => ({
  type: 'DELETE_WISHLIST',
  payload: axios.delete(url),
});
