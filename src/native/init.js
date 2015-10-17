import request from './utils/request.js';
import createStage from './createStage.js';
import {endpoint} from '../config.js';

export default init;

function init() {
  var stage = createStage();
  request(endpoint + 'labels.json', {
    responseType: 'json'
  }).then(setLabels)
    .then(downloadTest)
    .then(setHistogram);

  function setLabels(res) {
    stage.setLabels(res);
  }

  function downloadTest() {
    return request(endpoint + 'test.json', {
      responseType: 'json'
    });
  }

  function setHistogram(res) {
    stage.setHistogram(res);
  }
}
