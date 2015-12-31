import React, {Component, PropTypes} from 'react';
import {connect}            from 'react-redux';
import {bindActionCreators} from 'redux';
import classnames           from 'classnames';

import ToastrBox            from './ToastrBox';
import ToastrConfirm        from './ToastrConfirm';
import * as tActions        from './actions';
import {EE}                 from './toastrEmitter';
import config               from './config';

import {checkPositionName, isMobile, _bind, hasProperty} from './utils.js';

const mapStateToProps = (state) => ({
  toastr: state.toastr
});

export class ReduxToastr extends Component {
  static displayName = 'ReduxToastr'

  static propTypes = {
    toastr: PropTypes.object,
    options: PropTypes.object,
    position: PropTypes.string,
    newestOnTop: PropTypes.bool,
    timeOut: PropTypes.number,
    confirm: PropTypes.object
  }

  static defaultProps = {
    position: 'top-right',
    newestOnTop: true,
    confirm: {
      okText: 'ok',
      onCancelText: 'cancel'
    }
  }

  constructor(props) {
    super(props);
    this.actions = bindActionCreators(tActions, this.props.dispatch);
    config.set('newestOnTop', this.props.newestOnTop);

    _bind(
      this,
      'handleRemoveToastr',
      'handleHideConfirm'
    );
  }

  componentDidMount() {
    const onAddToastr = (toastr) => {
      this.actions.addToastrAction(toastr);
    };

    const onCleanToastr = () => {
      if (this.props.toastr.toastrs.length) {
        this.actions.clean();
      }
    };
    const confirm = (obj) => {
      // Fire if we don't have any active confirm
      if (!this.props.toastr.confirm.show) {
        this.actions.confirm(obj.message, obj.options);
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

  handleRemoveToastr(id) {
    this.actions.remove(id);
  }

  handleHideConfirm() {
    this.actions.hideConfirm();
  }

  render() {
    const toastrPosition = checkPositionName(this.props.position);
    const classes = classnames('redux-toastr', toastrPosition, {mobile: isMobile});
    const {toastr, confirm} = this.props;

    const confirmOkText = hasProperty(confirm, 'okText') ? confirm.okText : 'ok';
    const confirmCancelText = hasProperty(confirm, 'cancelText') ? confirm.cancelText : 'cancel';

    return (
      <div className={classes}>
        <ToastrConfirm
          hideConfirm={this.handleHideConfirm}
          confirm={toastr.confirm}
          okText={confirmOkText}
          cancelText={confirmCancelText}/>

        {toastr.toastrs.map((item) => {
          return (
            <ToastrBox
              key={item.id}
              toastr={item}
              timeOut={this.props.timeOut}
              remove={this.handleRemoveToastr}/>
          );
        })}
      </div>
    );
  }
}

export default connect(mapStateToProps)(ReduxToastr);