import axios from 'axios';

export const payment = (url, data) => ({
  type: 'PAY',
  payload: axios.post(url, data, { headers: { Authorization: 'Basic U0ItTWlkLXNlcnZlci16ZWlxNkhXTUwzLXIxUnV2MmRRTnRwNGk='}}),
});