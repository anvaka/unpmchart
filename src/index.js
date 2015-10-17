/**
 * Main entry point
 */
import {createStore} from 'redux';
import {initDispatcher} from './dispatcher.js';
import initNative from './native/init.js';
import mainReducer from './app/mainReducer.js';
import startReact from './app/startReact.js';

// first we need to init the global dipatcher
var store = createStore(mainReducer);
initDispatcher(store);
startReact(store);

// then we can create native three.js scene
initNative();
