/**
 * Expose dispatcher to the native world of three.js
 * TODO: Looks like I just want to expose mainStore...
 */
let mainStore;

export default dispatch;

dispatch.initDispatcher = function init(store) {
  if (!store || typeof store.dispatch !== 'function') {
    throw new Error('Dispatcher should be initialized with the main redux store');
  }

  if (mainStore) {
    throw new Error('The dispatcher was already initialzed');
  }

  mainStore = store;
};

dispatch.subscribe = function(cb) {
  // TODO: 2:30 am, need to check args
  return mainStore.subscribe(cb);
};

dispatch.getState = function () {
  return mainStore.getState();
};

function dispatch(action) {
  if (!mainStore) {
    throw new Error('AppDispatcher should be initialized before it can be used');
  }
  mainStore.dispatch(action);
}
