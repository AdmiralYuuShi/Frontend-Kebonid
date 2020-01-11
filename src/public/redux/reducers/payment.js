const initialState = {
  result: undefined,
  isLoading: false,
  isFulfilled: false,
  isRejected: false,
};

const payment = (state = initialState, action) => {
  switch (action.type) {
    case 'PAY_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'PAY_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'PAY_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        result: action.payload.data,
      };

    default:
      return state;
  }
};

export default payment;
