const initialState = {
  wishlist: [],
  isLoading: false,
  isLoadingUpdate: false,
  isFulfilled: false,
  isRejected: false,
};

const wishlist = (state = initialState, action) => {
  switch (action.type) {
    // get wishlist
    case 'GET_WISHLISTS_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'GET_WISHLISTS_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'GET_WISHLISTS_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        wishlist: action.payload.data.result,
      };

    // add product
    case 'ADD_WISHLIST_PENDING': {
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    }

    case 'ADD_WISHLIST_FULFILLED': {
      return {
        ...state,
        wishlist: [...state.wishlist, action.payload.data],
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
      };
    }

    case 'ADD_WISHLIST_REJECTED': {
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    }

    // delete wishlist
    case 'DELETE_WISHLIST_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'DELETE_WISHLIST_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'DELETE_WISHLIST_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        wishlist: [],
      };

    default:
      return state;
  }
};

export default wishlist;
