'use strict';

import './index.less';
import './toastr/less/index.less';
import React, {Component, PropTypes, dangerouslySetInnerHTML} from 'react'; // eslint-disable-line no-unused-vars
import {Provider} from 'react-redux';
import ReduxToastr, {toastr} from './toastr/';
import DevTools from './containers/DevTools';
import config from './../config';

import LongText from './largetext';
import loremIpsum from 'lorem-ipsum';

class comp extends Component {
  static displayName = 'MMC';
  render() {
    return (
        <h2>hej</h2>
    );
  }
}

class messageComp extends Component {
  static displayName = 'MMCmessageComp';
  render() {
    return <div dangerouslySetInnerHTML={{__html: LongText}} />;
  }
}

export default class App extends Component {
  static displayName = 'ReduxModalDev';

  static propTypes = {
    store: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    this.renderDev = this.renderDev.bind(this);
  }

  renderDev() {
    if (config.env !== 'production') {
      return <DevTools />;
    }
  }

  add() {
    toastr.success('success', loremIpsum());
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <div className="wrapper">
          <ReduxToastr />
          <div className="content">
            <button type="button" onClick={this.add.bind(this)}>success</button>
            <button type="button" onClick={() => toastr.info('## Info', loremIpsum())}>info</button>
            <button type="button" onClick={() => toastr.error('## Error', {timeOut: 4000, component: comp})}>error</button>
            <button type="button" onClick={() => toastr.warning('## Warning', loremIpsum())}>warning</button>
            <button type="button" onClick={() => toastr.message('## Message', {component: messageComp})}>message</button>
            <button type="button" onClick={() => toastr.confirm('## confirm')}>confirm</button>
          </div>
          {this.renderDev()}
        </div>
      </Provider>
    );
  }
}
