/**
 * Expose dispatcher to the native world of three.js
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

function dispatch(action) {
  if (!mainStore) {
    throw new Error('AppDispatcher should be initialized before it can be used');
  }
  mainStore.dispatch(action);
}
