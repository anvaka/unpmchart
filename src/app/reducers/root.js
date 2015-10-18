import { combineReducers } from 'redux';

function mainPage(state = {}, action) {
  if (action.type === 'legend') {
    return Object.assign({}, state, {
      legend: action.legend
    });
  }

  if (action.type === 'fileChanged') {
    return Object.assign({}, state, {
      selectedFile: action.name,
      selectedGroup: undefined
    });
  }

  if (action.type === 'selectedGroupChanged') {
    return Object.assign({}, state, {
      selectedGroup: createGroupDetails(state, action.name)
    });
  }

  if (action.type === 'receiveHistogram') {
    return Object.assign({}, state, {
      histogram: {
        [action.name]: action.content
      }
    });
  }

  if (action.type === 'receiveFile' && action.name === 'labels.json') {
    return Object.assign({}, state, {
      labels: action.content
    });
  }


  return state;
}

function labels(state = {}, action) {

  return state;
}

const rootReducer = combineReducers({
  mainPage
});

export default rootReducer;

function createGroupDetails(state, name) {
  var response = {};
  var histogram = state.histogram && state.histogram[state.selectedFile];
  var members = histogram && histogram[name];
  if (!members) return response;

  members = members.map(toName);
  return {
    name,
    members
  };

  function toName(index) {
    return state.labels[index];
  }
}
