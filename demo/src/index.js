import React          from 'react';
import {render}       from 'react-dom';
import App            from './App';

import {createStore, combineReducers}  from 'redux';
import {reducer as toastrReducer}      from 'react-redux-toastr';

const reducers = {
  toastr: toastrReducer
};

const reducer = combineReducers(reducers);
const store = createStore(reducer);
const target = document.getElementById('app');

render(<App store={store} />, target);