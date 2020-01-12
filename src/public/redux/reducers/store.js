const initialState = {
  store: [],
  isLoading: false,
  isLoadingUpdate: false,
  isFulfilled: false,
  isRejected: false,
};

const store = (state = initialState, action) => {
  switch (action.type) {
    // get store
    case 'GET_STORE_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'GET_STORE_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'GET_STORE_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        store: action.payload.data,
      };
    case 'GET_STORE_UPDATE_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'GET_STORE_UPDATE_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'GET_STORE_UPDATE_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        store: action.payload.data,
      };
    case 'GET_STORE_ADD_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'GET_STORE_ADD_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'GET_STORE_ADD_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        store: action.payload.data,
      };
    case 'GET_STORE_PHOTO_UPDATE_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'GET_STORE_PHOTO_UPDATE_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'GET_STORE_PHOTO_UPDATE_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        store: action.payload.data,
      };

    default:
      return state;
  }
};

export default store;
