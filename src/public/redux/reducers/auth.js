const initialState = {
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
  message: '',
  token: '',
  detail: '',
  users: [],
};

const auth = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN_PENDING':
    case 'SIGNUP_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'LOGIN_REJECTED':
    case 'SIGNUP_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
        isFulfilled: false,
        message: action.payload.response.data.message,
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
        user: action.payload.data.user,
      };
    case 'SIGNUP_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        users: action.payload.data.user,
        message: action.payload.data.message,
      };
    case 'LOGOUT':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        message: null,
        detail: null,
        token: null,
      };
    default:
      return state;
  }
};

export default auth;
