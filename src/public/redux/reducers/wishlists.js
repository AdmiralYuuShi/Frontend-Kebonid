const initialState = {
  wishlists: [],
  isLoading: false,
  isLoadingUpdate: false,
  isFulfilled: false,
  isRejected: false,
};

const wishlists = (state = initialState, action) => {
  switch (action.type) {
    // get wishlist
    case 'ALL_WISHLIST_PENDING':
      return {
        ...state,
        isLoading: true,
        isRejected: false,
        isFulfilled: false,
      };
    case 'ALL_WISHLIST_REJECTED':
      return {
        ...state,
        isLoading: false,
        isRejected: true,
      };
    case 'ALL_WISHLIST_FULFILLED':
      return {
        ...state,
        isLoading: false,
        isFulfilled: true,
        isRejected: false,
        wishlists: action.payload.data.result,
      };

    default:
      return state;
  }
};

export default wishlists;
