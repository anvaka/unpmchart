import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import recast from './utils/recast.js';
import rootReducer from './reducers/root.js';
import initialState from './state.js';

const createStoreWithMiddleware = applyMiddleware(thunkMiddleware, recast)(createStore);

export default function createMainStore() {
  return createStoreWithMiddleware(rootReducer, initialState);
}
