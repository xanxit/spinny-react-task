import {applyMiddleware,createStore,combineReducers,compose} from 'redux';

import thunk from 'redux-thunk';

import { itemsReducer } from './reducer/itemsReducer';

const initialState = {
    items : [],
}

const reducer = combineReducers({
    items : itemsReducer
})

const composeEnhancer = window.__REACT_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducer,initialState,composeEnhancer(applyMiddleware(thunk)));

export default store;