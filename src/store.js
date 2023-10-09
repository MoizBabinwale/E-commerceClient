// store.js
import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk'; // Middleware for handling asynchronous actions
import rootReducer from './reducer/reducer';

const store = createStore(rootReducer, applyMiddleware(thunkMiddleware));

export default store;
