'use strict';
import React from 'react';
import createStore from './store';
import App from './App';
import ReactDOM from "react-dom/client";

const store = createStore();
const root = ReactDOM.createRoot(document.getElementById("app"));

root.render(
    <App store={store} />
);
