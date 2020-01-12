import axios from 'axios';

export const getAllWishlist = url => ({
  type: 'ALL_WISHLIST',
  payload: axios.get(url),
});
