import createStage from './createStage.js';
import bus from './bus.js';

export default init;

function init() {
  var stage = createStage();

  bus.on('receiveFile', downloadNewFile);
  bus.on('receiveHistogram', setHistogram);

  function setLabels(res) {
    stage.setLabels(res);
  }

  function setHistogram(action) {
    stage.setHistogram(action.content);
  }

  function downloadNewFile(action) {
    if (action.name === 'labels.json') {
      stage.setLabels(action.content);
    }
  }
}
