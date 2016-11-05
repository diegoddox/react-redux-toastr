'use strict';

import './index.less';
import './../src/less/index.less';
import React, {Component, PropTypes, dangerouslySetInnerHTML} from 'react'; // eslint-disable-line no-unused-vars
import {Provider} from 'react-redux';
import ReduxToastr, {toastr} from './../src/';
import DevTools from './containers/DevTools';
import config from './../config';
import Menu from './Menu';

export default class App extends Component {
  static displayName = 'ReduxToastr';

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

  toastrWithAvatar() {
    toastr.success('Message from Marley', 'Donec id elit non mi porta gravida at eget metus. Lorem ipsum dolor sit amet, consectetur adipiscing elit.', {
      icon: (
        <div className="toastr-avatar">
          <img src="./assets/bob.jpg" />
        </div>
      ),
      timeOut: 0,
      removeOnHover: false,
      showCloseButton: false,
      progressBar: true
    });
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <div className="wrapper">
          <ReduxToastr
            newestOnTop={false}
            preventDuplicates={true}
          />
          <Menu />
        </div>
      </Provider>
    );
  }
}
