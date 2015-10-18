/**
 * Download array of npm package names
 */
import fetch from 'isomorphic-fetch';
import {endpoint} from '../../config.js';
import requestStarted from './requestStarted.js';
import receiveFile from './receiveFile.js';

export function fetchFile(fileName) {
  return dispatch => {
    let url = `${endpoint}${fileName}`;
    dispatch(requestStarted(url));
    return fetch(url)
      .then(req => req.json())
      .then(json => dispatch(receiveFile(fileName, json)));
  };
}

export function fetchHistogramIfNeeded(name) {
  return (dispatch, getState) => {
    dispatch({ type: 'fileChanged', name: name });
    if (shouldFetch(getState(), name)) {
      return dispatch(fetchHistogram(name));
    }
  };
}

function shouldFetch(state, name) {
  return !state.mainPage.histograms ||
        !state.mainPage.histograms[name];
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
