export default mainReducer;
let initialState = {};

function mainReducer(state = initialState, action) {
  if (action.type === 'legend') {
    return Object.assign({}, state, {
      legend: action.legend
    });
  }

  return state;
}
