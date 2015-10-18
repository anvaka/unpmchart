export default startReact;

import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import MainView from './views/Main.js';

function startReact(store) {
  let rootElement = document.getElementById('react-root');
  render(
    <Provider store={store}>
      <MainView />
    </Provider>,
    rootElement
  );
}
