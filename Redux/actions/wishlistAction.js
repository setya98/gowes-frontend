import { ADD_TO_WISHLIST, REMOVE_TO_WISHLIST } from '../constant';

export const addToWishlist = (payload) => {
    return {
        type: ADD_TO_WISHLIST,
        payload
    }
}

export const removeToWishlist = (payload) => {
    return {
        type: REMOVE_TO_WISHLIST,
        payload
    }
}