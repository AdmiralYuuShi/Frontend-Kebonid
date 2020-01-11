import axios from 'axios';

export const login = (url, data) => ({
  type: 'LOGIN',
  payload: axios.post(url, data),
});
export const signUp = (url, data) => ({
  type: 'SIGNUP',
  payload: axios.post(url, data),
});
export const logout = _ => ({
  type: 'LOGOUT',
});
