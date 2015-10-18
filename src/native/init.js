import createStage from './createStage.js';
import bus from './bus.js';

export default init;

function init() {
  var stage = createStage();

  bus.on('receiveHistogram', setHistogram);

  function setHistogram(action) {
    stage.setHistogram(action.content);
  }
}
