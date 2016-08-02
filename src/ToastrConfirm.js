'use strict';

import React, {Component, PropTypes} from 'react';
import cn from 'classnames';
import CSSCore from 'fbjs/lib/CSSCore';
import {onCSSTransitionEnd} from './utils';
import Button from './Button';
import config from './config';

export default class ToastrConfirm extends Component {
  static displayName = 'ToastrConfirm';

  static propTypes = {
    confirm: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    let {options} = props.confirm;

    this.okText = options.okText || config.confirm.okText;
    this.cancelText = options.cancelText || config.confirm.cancelText;
    this.transitionIn = options.transitionIn || config.confirm.transitionIn;
    this.transitionOut = options.transitionOut || config.confirm.transitionOut;
  }

  componentDidMount() {
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
      CSSCore.addClass(this.confirm, this.transitionIn);
      return;
    }

    this.isHiding = true;
    CSSCore.addClass(this.confirm, this.transitionOut);
  };

  _removeConfirm = () => {
    this.isHiding = false;
    this.props.hideConfirm();
    const body = document.querySelector('body');
    CSSCore.removeClass(body, 'toastr-confirm-active');
  };

  render() {
    const classes = cn('confirm-holder', {active: this.props.confirm.show});
    return (
      <div className={classes}>
          <div className="confirm animated" ref={ref => this.confirm = ref}>
            <div className="message">{this.props.confirm.message}</div>
            <Button onClick={this.handleConfirmClick.bind(this)}>
              {this.okText}
            </Button>
            <Button onClick={this.handleCancelClick.bind(this)}>
              {this.cancelText}
            </Button>
          </div>
        <div className="shadow"></div>
      </div>
    );
  }
}
