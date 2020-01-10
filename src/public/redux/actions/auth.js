import axios from 'axios';

export const login = (url, data) => ({
  type: 'LOGIN',
  payload: axios.post(url, data),
});

export const logout = _ => ({
  type: 'LOGOUT',
});
