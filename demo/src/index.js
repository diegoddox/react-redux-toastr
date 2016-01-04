import React          from 'react';
import {render}       from 'react-dom';
import App            from './App';

import {createStore, combineReducers}  from 'redux';
import {reducer as toastrReducer}      from 'redux-toastr';

const reducers = {
  toastr: toastrReducer
};

const reducer = combineReducers(reducers);
const store = createStore(reducer);
const target = document.getElementById('app');

const node = (<App store={store} />);
render(node, target);