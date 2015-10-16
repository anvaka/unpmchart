import request from './lib/request.js';
import createStage from './lib/createStage.js';

const endpoint = 'http://localhost:9003/';

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
  debugger;
  stage.setHistogram(res);
}
