export default mainReducer;
let initialState = {
  files: [
    'test',
    'test-clean',
    'deps-count',
    'dev-deps-count',
    'license'
  ],
  selectedFile: 'test'
};

function mainReducer(state = initialState, action) {
  if (action.type === 'legend') {
    return Object.assign({}, state, {
      legend: action.legend
    });
  }
  if (action.type === 'fileChanged') {
    return Object.assign({}, state, {
      selectedFile: action.name
    });
  }

  return state;
}
