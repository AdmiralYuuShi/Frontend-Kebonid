import axios from 'axios';
import {API_KEY_URL} from 'react-native-dotenv';

export const fetchDetailStore = id => ({
  type: 'GET_STORE',
  payload: axios.get(`${API_KEY_URL}/store/${id}`),
});
export const fetchUpdateStore = (id, data) => ({
  type: 'GET_STORE_UPDATE',
  payload: axios.patch(`${API_KEY_URL}/store/${id}`, data),
});
export const fetchAddStore = (data, config) => ({
  type: 'GET_STORE_ADD',
  payload: axios.post(`${API_KEY_URL}/store`, data, config),
});
export const fetchUpdatePhotoStore = (id, data, config) => ({
  type: 'GET_STORE_PHOTO_UPDATE',
  payload: axios.patch(`${API_KEY_URL}/store/${id}`, data, config),
});
