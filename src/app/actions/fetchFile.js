/**
 * Download array of npm package names
 */
import fetch from 'isomorphic-fetch';
import {endpoint} from '../../config.js';
import requestStarted from './requestStarted.js';

export function fetchFile(fileName) {
  return dispatch => {
    let url = `${endpoint}${fileName}`;
    dispatch(requestStarted(url));
    return fetch(url)
      .then(req => req.json())
      .then(json => dispatch(receiveFile(fileName, json)))
      .then(_ => dispatch(fetchHistogramIfNeeded('all-npm')));
  };
}

export function fetchHistogramIfNeeded(name) {
  return (dispatch, getState) => {
    dispatch({ type: 'histogramNameChanged', name: name });
    let histogram = getHistogram(getState(), name);
    if (!histogram) {
      return dispatch(fetchHistogram(name));
    } else {
      dispatch(receiveHistogram(name, histogram));
    }
  };
}

function getHistogram(state, name) {
  return state.mainPage.histogram && state.mainPage.histogram[name];
}

function fetchHistogram(name) {
  return dispatch => {
    let url = `${endpoint}${name}.json`;
    dispatch(requestStarted(url));
    return fetch(url)
      .then(req => req.json())
      .then(json => dispatch(receiveHistogram(name, json)));
  };
}

function receiveHistogram(name, content) {
  return {
    type: 'receiveHistogram',
    name,
    content
  };
}

function receiveFile(name, content) {
  return {
    type: 'receiveFile',
    name,
    content
  };
}
