'use strict';
import React from 'react';
import {render} from 'react-dom';
import createStore from './store';
import App from './App';

const store = createStore();
const target = document.getElementById('app');

render(<App store={store} />, target);
