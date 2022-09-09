import { combineReducers, applyMiddleware, legacy_createStore as createStore } from 'redux';
import ThunkMiddleware from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';

import cartItems from './reducers/cartItem';

const reducers = combineReducers({
    cartItems: cartItems
})

const store = createStore(
    reducers,
    composeWithDevTools(applyMiddleware(ThunkMiddleware))
)

export default store;