const initialState = {
  products: [],
  isLoading: false,
  isLoadingUpdate: false,
  isFulfilled: false,
  isRejected: false,
};

const products = (state = initialState, action) => {
  switch (action.type) {
    // get products
    case 'GET_PRODUCTS_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'GET_PRODUCTS_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'GET_PRODUCTS_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        products: action.payload.data.data,
      };

    default:
      return state;
  }
};

export default products;
