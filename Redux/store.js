import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly'

import cartItems from './reducers/cartItem'
import wishlistItems from './reducers/wishlistItem';

const reducers = combineReducers({
    cartItems: cartItems,
    wishlistItems: wishlistItems
})

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(thunkMiddleware))
)

export default store;