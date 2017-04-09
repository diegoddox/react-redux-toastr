import './index.scss';
import './../src/styles/index.scss';
import React from 'react'; // eslint-disable-line no-unused-vars
import {Provider} from 'react-redux';
import ReduxToastr from './../src/';
import Menu from './Menu';

export default (props) => (
  <Provider store={props.store}>
    <div className="wrapper">
      <ReduxToastr preventDuplicates/>
      <Menu />
    </div>
  </Provider>
);
