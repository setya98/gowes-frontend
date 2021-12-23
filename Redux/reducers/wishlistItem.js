import {
    ADD_TO_WISHLIST,
    REMOVE_TO_WISHLIST,
} from '../constant';

const wishlistItems = (state = [], action) => {
    switch (action.type) {
        case ADD_TO_WISHLIST:
            return [...state, action.payload]
        case REMOVE_TO_WISHLIST:
            return state.filter(cartItem => cartItem !== action.payload)
    }
    return state;
}

export default wishlistItems;