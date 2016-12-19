import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import cn from 'classnames';
import ToastrBox from './ToastrBox';
import ToastrConfirm from './ToastrConfirm';
import * as actions from './actions';
import {EE} from './toastrEmitter';
import config from './config';
import {updateConfig, _bind} from './utils';

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
    transitionOut: PropTypes.string,
    preventDuplicates: PropTypes.bool
  };

  static defaultProps = {
    position: 'top-right',
    newestOnTop: true,
    timeOut: 5000,
    progressBar: false,
    transitionIn: 'bounceIn',
    transitionOut: 'bounceOut',
    preventDuplicates: false,
    confirmOptions: {
      transitionIn: 'bounceInDown',
      transitionOut: 'bounceOutUp',
      okText: 'ok',
      cancelText: 'cancel',
      disableCancel: false
    }
  };

  toastrFired = {};

  constructor(props) {
    super(props);
    updateConfig(config, this.props);
    _bind('_addToMemory', this);
  }

  componentDidMount() {
    const {add, showConfirm, clean, removeByType} = this.props;
    EE.on('toastr/confirm', showConfirm);
    EE.on('add/toastr', add);
    EE.on('clean/toastr', clean);
    EE.on('removeByType/toastr', removeByType);
  }

  componentWillUnmount() {
    EE.removeListener('toastr/confirm');
    EE.removeListener('add/toastr');
    EE.removeListener('clean/toastr');
    EE.removeListener('removeByType/toastr');
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
      <div className={cn('redux-toastr', this.props.position, this.props.className)}>
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

export default connect(
  state => ({
    toastr: state.toastr ? state.toastr : state.get('toastr')
  }),
  actions
)(ReduxToastr);
