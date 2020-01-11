const initialState = {
  users: [],
  isLoading: false,
  isLoadingUpdate: false,
  isFulfilled: false,
  isRejected: false,
};

const users = (state = initialState, action) => {
  switch (action.type) {
    // get users
    case 'GET_USERS_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'GET_USERS_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'GET_USERS_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        users: action.payload.data,
      };
    case 'GET_USERS_UPDATE_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'GET_USERS_UPDATE_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'GET_USERS_UPDATE_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        users: action.payload.data,
      };

    default:
      return state;
  }
};

export default users;
