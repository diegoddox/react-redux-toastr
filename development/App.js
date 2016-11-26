import './index.scss';
import './../src/styles/index.scss';
import React, {Component, PropTypes, dangerouslySetInnerHTML} from 'react'; // eslint-disable-line no-unused-vars
import {Provider} from 'react-redux';
import ReduxToastr from './../src/';
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

  render() {
    return (
      <Provider store={this.props.store}>
        <div className="wrapper">
          <ReduxToastr
            preventDuplicates={true}
          />
          <Menu />
        </div>
      </Provider>
    );
  }
}
