import axios from 'axios';
import {API_KEY_URL} from 'react-native-dotenv';

export const fetchDetailUsers = id => ({
  type: 'GET_USERS',
  payload: axios.get(`${API_KEY_URL}/customers/${id}`),
});
export const fetchUpdateUsers = (id, data) => ({
  type: 'GET_USERS_UPDATE',
  payload: axios.put(`${API_KEY_URL}/customers/${id}`, data),
});
export const fetchUpdatePhotoUsers = (id, data, config) => ({
  type: 'GET_USERS_PHOTO_UPDATE',
  payload: axios.put(`${API_KEY_URL}/customers/editPhoto/${id}`, data, config),
});
