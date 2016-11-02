import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import cn from 'classnames';
import ToastrBox from './ToastrBox';
import ToastrConfirm from './ToastrConfirm';
import * as tActions from './actions';
import {EE} from './toastrEmitter';
import config from './config';

class ReduxToastr extends Component {
  static displayName = 'ReduxToastr';

  static propTypes = {
    toastr: PropTypes.object,
    options: PropTypes.object,
    position: PropTypes.string,
    newestOnTop: PropTypes.bool,
    timeOut: PropTypes.number,
    confirmOptions: PropTypes.object,
    progressBar: PropTypes.bool,
    transitionIn: PropTypes.string,
    transitionOut: PropTypes.string
  };

  static defaultProps = {
    position: 'top-right',
    newestOnTop: true,
    timeOut: 5000,
    progressBar: false,
    transitionIn: config.toastr.transitionIn,
    transitionOut: config.toastr.transitionOut
  };

  toastrFired = {};

  constructor(props) {
    super(props);
    //
    // config.toastr.timeOut = this.props.timeOut;
    // config.toastr.newestOnTop = this.props.newestOnTop;
    // config.confirm = {...config.confirm, ...this.props.confirmOptions};

    this._addToMemory = this._addToMemory.bind(this);
  }

  componentDidMount() {
    const {addToastrAction, showConfirm, clean} = this.props;
    EE.on('toastr/confirm', showConfirm);
    EE.on('add/toastr', addToastrAction);
    EE.on('clean/toastr', clean);
  }

  componentWillUnmount() {
    EE.removeListener('toastr/confirm');
    EE.removeListener('add/toastr');
    EE.removeListener('clean/toastr');
    this.toastrFired = {};
  }

  _addToMemory(id) {
    this.toastrFired[id] = true;
  }

  _renderToastrBox(item) {
    // Default options from props, but item can override them with own.
    const mergedItem = {
      ...item,
      options: {
        progressBar: this.props.progressBar,
        transitionIn: this.props.transitionIn,
        transitionOut: this.props.transitionOut,
        ...item.options
      }
    };

    return (
      <ToastrBox
        key={item.id}
        inMemory={this.toastrFired}
        addToMemory={this._addToMemory}
        item={mergedItem}
        {...this.props}
      />
    );
  }

  render() {
    return (
      <div className={cn('redux-toastr', this.props.position)}>
        {this.props.toastr.confirm &&
          <ToastrConfirm
            key={this.props.toastr.confirm.id}
            confirm={this.props.toastr.confirm}
            {...this.props}
          />
        }
        {this.props.toastr && this.props.toastr.toastrs.map(item => this._renderToastrBox(item))}
      </div>
    );
  }
}

export default connect(state => ({
  toastr: state.toastr ? state.toastr : state.get('toastr')
}), tActions)(ReduxToastr);
