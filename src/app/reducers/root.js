import { combineReducers } from 'redux';

function mainPage(state = {}, action) {
  console.log(action.type);
  if (action.type === 'legend') {
    return Object.assign({}, state, {
      legend: action.legend
    });
  }
  if (action.type === 'hover') {
    return Object.assign({}, state, {
      tooltip: getTooltipData(state, action.data)
    });
  }

  if (action.type === 'histogramNameChanged') {
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
    // TODO: doh, is this really how you have to do it?
    return {
      ...state,
      histogram: {
        ...state.histogram,
        [action.name]: action.content
      }
    };
  }

  if (action.type === 'receiveFile' && action.name === 'labels.json') {
    let npmHisto =  {
      'npm': action.content.map(toIndex)
    };

    return Object.assign({}, state, {
      labels: action.content,
      histogram: {
        'all-npm': npmHisto
      }
    });
  }

  return state;
}

function buildIndex(histogram) {
  var index = [];
  Object.keys(histogram).sort(byCount).forEach(function (name) {
    index.push({
      length: histogram[name].length,
      name: name
    });
  });

  return index;

  function byCount(x, y) {
    return histogram[y].length - histogram[x].length;
  }
}

const rootReducer = combineReducers({
  mainPage
});

export default rootReducer;

function createGroupDetails(state, name) {
  var response = {};
  var histogram = getHistogram(state);
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

function getHistogram(state) {
  return state.histogram && state.histogram[state.selectedFile];
}

function toIndex(_, index) {
  return index;
}

function getTooltipData(state, data) {
  if (!data || !data.index) {
    return null;
  }
  var label = state.labels[data.index];

  return {
    name: label,
    x: data.x,
    y: data.y
  };
}
