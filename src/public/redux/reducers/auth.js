const initialState = {
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
  message: '',
  token: '',
  detail: '',
  data: '',
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
        user: action.payload.data.user,
      };
    case 'FORGOT_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'FORGOT_REJECTED':
    return {
        ...state,
        isLoading: false,
        isRejected: true,
        isFulfilled: false,
        data: action.payload.response,
      };
    case 'FORGOT_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        data: action.payload.data,
      };
      case 'RESET_PENDING':
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFulfilled: false,
        };
      case 'RESET_REJECTED':
      return {
          ...state,
          isLoading: false,
          isRejected: true,
          isFulfilled: false,
          data: action.payload.response.data.message,
        };
      case 'RESET_FULFILLED':
        return {
          ...state,
          isLoading: false,
          isFulfilled: true,
          isRejected: false,
          data: action.payload.data,
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
