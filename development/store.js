'use strict';

import React from 'react'; // eslint-disable-line no-unused-vars
import {createStore, compose} from 'redux';
import DevTools from './containers/DevTools';
import rootReducers from './reducer';

export default function configStore(initialState) {
  let createStoreWithMiddleware;
  createStoreWithMiddleware = compose(DevTools.instrument());

  const store = createStoreWithMiddleware(createStore)(rootReducers, initialState);

  // This we only use in development.
  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const nextRootReducers = require('./reducer');
      store.replaceReducer(nextRootReducers);
    });
  }

  return store;
}
