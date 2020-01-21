const initialState = {
  cart: [],
  totalPrice: '',
  isLoading: false,
  isLoadingUpdate: false,
  isFulfilled: false,
  isRejected: false,
};

const cart = (state = initialState, action) => {
  switch (action.type) {
    // get cart
    case 'GET_CART_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'GET_CART_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'GET_CART_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        cart: action.payload.data.items,
        totalPrice: action.payload.data.totalPrice,
      };

    // add CART
    case 'ADD_CART_PENDING': {
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    }

    case 'ADD_CART_FULFILLED': {
      return {
        ...state,
        cart: [...state.cart, action.payload.data],
        totalPrice: action.payload.data.totalPrice,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
      };
    }

    case 'ADD_CART_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    }

    // delete cart
    case 'DELETE_CART_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'DELETE_CART_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'DELETE_CART_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        cart: [],
      };

    case 'AMOUNT_PENDING': {
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    }

    case 'AMOUNT_FULFILLED': {
      return {
        ...state,
        cart: action.payload.data,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
      };
    }

    case 'AMOUNT_REJECTED': {
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

export default cart;
