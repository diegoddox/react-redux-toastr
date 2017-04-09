import React from 'react'; // eslint-disable-line no-unused-vars
import {createStore} from 'redux';
import rootReducers from './reducer';

export default function configStore(initialState) {
  const store = createStore(
    rootReducers,
    initialState,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );


  if (module.hot) {
    module.hot.accept('./reducer', () => {
      const nextRootReducers = require('./reducer');
      store.replaceReducer(nextRootReducers);
    });
  }

  return store;
}
