import React, {Component, PropTypes}  from 'react';
import {Provider}                     from 'react-redux';

import ReduxToastr, {toastr}          from 'redux-toastr';


export default class App extends Component {
  static displayName = 'App'

  static propTypes = {
    store: PropTypes.object.isRequired
  }

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Provider store={this.props.store}>
        <div className="wrapper" style={{textAlign: 'center', padding: 50}}>
          <button
            style={{margin: 20}}
            className="btn btn-success"
            onClick={() => {
              toastr.success(
                'YOU SHALL LOVE YOUR NEIGHBOR and hate your enemy',
                'But I say to you, love your enemies and pray for those who persecute you...',
                {
                  timeOut: 8000,
                  onShowComplete: () => {
                    console.log('on show complete'); 
                  },
                  onHideComplete: () => {
                    console.log('on hide complete'); 
                  }
                }
              )}
            }
            type="button">Toastr success</button>
          <button
            className="btn btn-danger"
            onClick={() => toastr.clean()}
            type="button">Clean toastr</button>
          <ReduxToastr />
        </div>
      </Provider>
    );
  }
}