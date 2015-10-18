/**
 * Main entry point
 */
import { initDispatcher } from './dispatcher.js';
import initNative from './native/init.js';
import startReact from './app/startReact.js';
import createStore from './app/createMainStore.js';

// first we need to init the global dipatcher
let store = createStore();
initDispatcher(store);
startReact(store);

// then we can create native three.js scene
initNative();
