const initialState = {
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
  message: '',
  token: '',
  detail: '',
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'LOGIN_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
        isFulfilled: false,
      };
    case 'LOGIN_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        message: action.payload.data.message,
        detail: action.payload.data.detail,
        token: action.payload.data.token,
      };

    default:
      return state;
  }
};

export default auth;
