'use strict';

import './index.less';
import './../src/less/index.less';
import React, {Component, PropTypes, dangerouslySetInnerHTML} from 'react'; // eslint-disable-line no-unused-vars
import {Provider} from 'react-redux';
import ReduxToastr, {toastr} from './../src/';
import DevTools from './containers/DevTools';
import config from './../config';

import LongText from './largetext';
import loremIpsum from 'lorem-ipsum';

const MyComp = props => {
  console.log('props', props);
  setTimeout(() => {
    props.remove();
    console.log('## remove toastr with the remove func.');
  }, 4000);
  return <h2>Hello {props.name}</h2>;
};

MyComp.displayName = 'comp';

class MyConfirmComp extends Component {
  render() {
    return <div>{loremIpsum({count: 5})}</div>;
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
            <button type="button" className="btn btn-success" onClick={this.add.bind(this)}>success</button>
            <button type="button" className="btn btn-primary" onClick={() => toastr.info('## Info', loremIpsum())}>info</button>
            <button
              type="button"
              className="btn btn-danger"
              onClick={() => toastr.error('## Error', {
                timeOut: 0,
                component: (<MyComp name="Jesus" />)
              })}>error</button>
            <button type="button" className="btn btn-warning" onClick={() => toastr.warning('## Warning ����', loremIpsum())}>warning</button>
            <button type="button" className="btn btn-default" onClick={() => toastr.message('## Message', {component: messageComp})}>message</button>
            <button type="button" className="btn btn-default" onClick={() => toastr.confirm(<MyConfirmComp />)}>confirm</button>

            <button
              type="button"
              className="btn btn-default"
              onClick={() => toastr.warning(loremIpsum({count: 5}), {
                timeOut: 0,
                removeOnHover: false,
                removeOnClick: false
              })}>Don't hide on hover and don't remove on click</button>
          </div>
          {this.renderDev()}
        </div>
      </Provider>
    );
  }
}
