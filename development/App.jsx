import './index.scss';
import './../src/styles/index.scss';
import React from 'react';
import {Provider} from 'react-redux';
import ReduxToastr from '../src';
import Menu from './Menu';

export default function App(props) {
  return (
    <Provider store={props.store}>
      <div className="wrapper">
        <ReduxToastr preventDuplicates position="bottom-left"/>
        <Menu />
      </div>
    </Provider>
  );
}
