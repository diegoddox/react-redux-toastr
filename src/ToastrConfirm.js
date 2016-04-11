'use strict';

import React, {Component, PropTypes} from 'react';
import cn from 'classnames';
import CSSCore from 'fbjs/lib/CSSCore';
import {onCSSTransitionEnd} from './utils';
import Button from './Button';

export default class ToastrConfirm extends Component {
  static displayName = 'ToastrConfirm';

  static propTypes = {
    confirm: PropTypes.object.isRequired,
    confirmOptions: PropTypes.object
  };

  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    this.isHiding = false;

    if (this.props.confirm.show) {
      this._setTransition(true);
    }
  }

  handleConfirmClick() {
    const {options} = this.props.confirm;
    const onAnimationEnd = () => {
      this._removeConfirm();
      if (options && options.onOk) {
        options.onOk();
      }
    };

    this._setTransition();
    onCSSTransitionEnd(this.confirm, onAnimationEnd);
  }

  handleCancelClick() {
    const {options} = this.props.confirm;
    const onAnimationEnd = () => {
      this._removeConfirm();
      if (options && options.onCancel) {
        options.onCancel();
      }
    };

    this._setTransition();
    onCSSTransitionEnd(this.confirm, onAnimationEnd);
  }

  _setTransition = (add) => {
    const body = document.querySelector('body');

    if (add) {
      this.isHiding = false;
      CSSCore.addClass(body, 'toastr-confirm-active');
      CSSCore.addClass(this.confirm, 'bounceInDown');
      return;
    }

    this.isHiding = true;
    CSSCore.addClass(this.confirm, 'bounceOutUp');
  };

  _removeConfirm = () => {
    this.isHiding = false;
    this.props.hideConfirm();
    const body = document.querySelector('body');
    CSSCore.removeClass(this.confirm, 'bounceOutUp');
    CSSCore.removeClass(this.confirm, 'bounceInDown');
    CSSCore.removeClass(body, 'toastr-confirm-active');
  };

  render() {
    const classes = cn('confirm-holder', {active: this.props.confirm.show});
    return (
      <div className={classes}>
          <div className="confirm animated" ref={ref => this.confirm = ref}>
            <div className="message">{this.props.confirm.message}</div>
            <Button onClick={this.handleConfirmClick.bind(this)}>
              {this.props.confirmOptions.okText}
            </Button>
            <Button onClick={this.handleCancelClick.bind(this)}>
              {this.props.confirmOptions.cancelText}
            </Button>
          </div>
        <div className="shadow"></div>
      </div>
    );
  }
}
