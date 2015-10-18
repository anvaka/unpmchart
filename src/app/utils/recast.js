import bus from '../../native/bus.js';

export default store => next => action => {
  bus.fire(action.type, action);
  return next(action);
};
