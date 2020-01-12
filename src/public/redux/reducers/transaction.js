const initialState = {
  // transactions: {},
  total: [''],
  result: [''],
  isLoading: false,
  isLoadingUpdate: false,
  isFulfilled: false,
  isRejected: false,
  orderId: ''
};

const transaction = (state = initialState, action) => {
  switch (action.type) {
    // get product
    case 'GET_TRANSACTION_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'GET_TRANSACTION_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'GET_TRANSACTION_FULFILLED':
      return {
        ...state,
        // transactions: action.payload.data,
        total: action.payload.data.Total,
        result: action.payload.data.result,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
      };
      case 'CREATE_TRANSACTION_PENDING':
        return {
          ...state,
          isLoading: true,
          isRejected: false,
          isFulfilled: false,
        };
      case 'CREATE_TRANSACTION_REJECTED':
        return {
          ...state,
          isLoading: false,
          isRejected: true,
        };
      case 'CREATE_TRANSACTION_FULFILLED':
        return {
          ...state,
          // transactions: action.payload.data,
          orderId: action.payload.data.idGroup,
          isLoading: false,
          isFulfilled: true,
          isRejected: false,
        };
    default:
      return state;
  }
};

export default transaction;
