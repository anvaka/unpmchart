import request from './utils/request.js';
import createStage from './createStage.js';
import {endpoint} from '../config.js';
import dispatcher from '../dispatcher.js';

export default init;

function init() {
  var stage = createStage();
  let file = getSelectedFile();

  request(endpoint + 'labels.json', {
    responseType: 'json'
  }).then(setLabels)
    .then(downloadTest);

  dispatcher.subscribe(downloadNewFile);

  function setLabels(res) {
    stage.setLabels(res);
  }

  function downloadTest() {
    return download('test');
  }

  function setHistogram(res) {
    stage.setHistogram(res);
  }

  function downloadNewFile() {
    var newFile = getSelectedFile();
    if (newFile !== file) {
      file = newFile;
      download(file);
    }
  }

  function download(name) {
    return request(endpoint + `${name}.json`, {
      responseType: 'json'
    }).then(setHistogram);
  }
}

function getSelectedFile() {
  return dispatcher.getState().selectedFile;
}
