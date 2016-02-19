import React, {Component, PropTypes} from 'react';
import {connect}            from 'react-redux';
import classnames           from 'classnames';

import ToastrBox            from './ToastrBox';
import ToastrConfirm        from './ToastrConfirm';
import * as tActions        from './actions';
import {EE}                 from './toastrEmitter';
import config               from './config';

import {checkPositionName, hasProperty} from './utils.js';

@connect(state => ({
  toastr: state.toastr
}), tActions)
export default class ReduxToastr extends Component {
  static displayName = 'ReduxToastr';

  static propTypes = {
    toastr: PropTypes.object,
    options: PropTypes.object,
    position: PropTypes.string,
    newestOnTop: PropTypes.bool,
    timeOut: PropTypes.number,
    confirm: PropTypes.object
  };

  static defaultProps = {
    position: 'top-right',
    newestOnTop: true,
    timeOut: 5000,
    confirm: {
      okText: 'ok',
      onCancelText: 'cancel'
    }
  };

  constructor(props) {
    super(props);
    config.set('timeOut', this.props.timeOut);
    config.set('newestOnTop', this.props.newestOnTop);
  }

  componentDidMount() {
    const onAddToastr = (toastr) => {
      this.props.addToastrAction(toastr);
    };

    const onCleanToastr = () => {
      if (this.props.toastr.toastrs.length) {
        this.props.clean();
      }
    };
    const confirm = (obj) => {
      // Fire if we don't have any active confirm
      if (!this.props.toastr.confirm.show) {
        this.props.confirm(obj.message, obj.options);
      }
    };

    EE.on('toastr/confirm', confirm);
    EE.on('add/toastr', onAddToastr);
    EE.on('clean/toastr', onCleanToastr);
  }

  componentWillUnmount() {
    EE.removeListener('toastr/confirm');
    EE.removeListener('add/toastr');
    EE.removeListener('clean/toastr');
  }

  handleRemoveToastr = (id) => {
    this.props.remove(id);
  };

  handleHideConfirm = () => {
    this.props.hideConfirm();
  };

  render() {
    const toastrPosition = checkPositionName(this.props.position);
    const classes = classnames('redux-toastr', toastrPosition);
    const {toastr, confirm} = this.props;

    const confirmOkText = hasProperty(confirm, 'okText') ? confirm.okText : 'ok';
    const confirmCancelText = hasProperty(confirm, 'cancelText') ? confirm.cancelText : 'cancel';

    const confirmProps = {
      hideConfirm: this.handleHideConfirm,
      confirm: toastr.confirm,
      okText: confirmOkText,
      cancelText: confirmCancelText
    };

    return (
      <div className={classes}>
        <ToastrConfirm {...confirmProps}/>

        {toastr.toastrs.map((item) => {
          const props = {
            key: item.id,
            toastr: item,
            timeOut: this.props.timeOut,
            remove: this.handleRemoveToastr
          };
          return (
            <ToastrBox {...props}/>
          );
        })}
      </div>
    );
  }
}
