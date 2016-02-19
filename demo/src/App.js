import React, {Component, PropTypes}  from 'react';
import loremIpsum                     from 'lorem-ipsum';
import {Provider}                     from 'react-redux';
import ReduxToastr, {toastr}          from 'react-redux-toastr';

export default class App extends Component {
  static displayName = 'ReduxToastrDemo';

  static propTypes = {
    store: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
  }

  render() {
    const toastrOptions = {
      timeOut: 20000,
      onShowComplete: () => console.log('SHOW: animation is done'),
      onHideComplete: () => console.log('HIDE: animation is done')
    }

    const messageOptions = {
      onShowComplete: () => console.log('SHOW: animation is done'),
      onHideComplete: () => console.log('HIDE: animation is done')
    };

    const confirmOptions = {
      onOk: () => console.log('OK: clicked'),
      onCancel: () => console.log('CANCEL: clicked')
    };

    const img = '<img src="http://diegoddox.github.io/redux-toastr/img/demo.jpg">';
    const largeMessageText = loremIpsum({count: 2}) + img + loremIpsum({count: 3});

    return (
      <Provider store={this.props.store}>
        <div className="wrapper">
          <h1>Redux Toastr Demo</h1>
          <hr/>
          <button
            className="btn btn-default"
            onClick={() => toastr.confirm('Are you sure?', confirmOptions)}>Confirm</button>

          <button
            className="btn btn-default"
            onClick={() => toastr.message('News baby', largeMessageText, messageOptions)}
            >Message</button>

          <button
            className="btn btn-success"
            onClick={() => toastr.success('Title', 'Love is what we need', toastrOptions)}>Success</button>

          <button
            className="btn btn-primary"
            onClick={() => toastr.info('info')}>Info</button>

          <button
            className="btn btn-warning"
            onClick={() => toastr.warning('hej')}>Warning</button>

          <button
            className="btn btn-danger"
            onClick={() => toastr.error('no baby')}>Error</button>

          <button
            className="btn btn-danger"
            onClick={() => toastr.clean()}>Clean</button>

          <ReduxToastr />
        </div>
      </Provider>
    );
  }
}