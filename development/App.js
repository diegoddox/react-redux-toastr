import './index.scss';
import './../src/styles/index.scss';
import React, {Component, PropTypes, dangerouslySetInnerHTML} from 'react'; // eslint-disable-line no-unused-vars
import {Provider} from 'react-redux';
import ReduxToastr from './../src/';
import Menu from './Menu';

export default class App extends Component {
  static displayName = 'ReduxToastr';

  static propTypes = {
    store: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
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
