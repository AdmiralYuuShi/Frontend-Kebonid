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

    // add product
    case 'ADD_PRODUCT_PENDING': {
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    }

    case 'ADD_PRODUCT_FULFILLED': {
      return {
        ...state,
        products: [...state.products, action.payload.data],
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
      };
    }

    case 'ADD_PRODUCT_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    }

    // delete products
    case 'DELETE_PRODUCT_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'DELETE_PRODUCT_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'DELETE_PRODUCT_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        products: [],
      };

    // update product
    case 'UPDATE_PRODUCT_PENDING': {
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    }

    case 'UPDATE_PRODUCT_FULFILLED': {
      return {
        ...state,
        products: action.payload.data,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
      };
    }

    case 'UPDATE_PRODUCT_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    }

    default:
      return state;
  }
};

export default products;
