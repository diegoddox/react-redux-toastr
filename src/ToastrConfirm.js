import React, {Component, PropTypes} from 'react';
import CSSCore from 'fbjs/lib/CSSCore';
import {_bind, onCSSTransitionEnd, returnFuncFromObj} from './utils';
import Button from './Button';

export default class ToastrConfirm extends Component {
  static displayName = 'ToastrConfirm'

  static propTypes = {
    confirm: PropTypes.object.isRequired,
    okText: PropTypes.string,
    cancelText: PropTypes.string
  }

  constructor(props) {
    super(props);
    _bind(
      this,
      'handleConfirmClick',
      'handleCancelClick',
      '_removeConfirm',
      '_setTransition',
      '_onConfirmAnimationComplete'
    );
  }

  componentDidUpdate() {
    this.isHiding = false;

    if (this.props.confirm.show) {
      this._setTransition(true);
    }
  }

  handleConfirmClick(e) {
    e.preventDefault();
    const {options} = this.props.confirm;
    returnFuncFromObj(options, 'onOk');
    this._setTransition();
  }

  handleCancelClick(e) {
    e.preventDefault();
    const {options} = this.props.confirm;
    returnFuncFromObj(options, 'onCancel');
    this._setTransition();
  }

  _setTransition(add) {
    const nodeConfirmHolder = this.confirmHolder;
    const body = document.querySelector('body');

    if (add) {
      CSSCore.removeClass(nodeConfirmHolder, 'hide');
      CSSCore.addClass(body, 'toastr-confirm-active');
      CSSCore.addClass(this.confirm, 'bounceInDown');
      this.isHiding = false;
    } else {
      CSSCore.addClass(this.confirm, 'bounceOutUp');
      this.isHiding = true;
    }

    onCSSTransitionEnd(this.confirm, this._onConfirmAnimationComplete);
  }

  _onConfirmAnimationComplete() {
    if (this.isHiding) {
      this._removeConfirm();
    }
  }

  _removeConfirm() {
    this.isHiding = false;
    CSSCore.addClass(this.confirmHolder, 'hide');
    CSSCore.removeClass(this.confirm, 'bounceOutUp');
    CSSCore.removeClass(this.confirm, 'bounceInDown');

    CSSCore.removeClass(document.querySelector('body'), 'toastr-confirm-active');
    this.props.hideConfirm();
  }

  render() {
    const {okText, cancelText} = this.props;
    return (
      <div className="confirm-holder hide fadeIn" ref={(ref) => this.confirmHolder = ref}>
        <div className="confirm animated" ref={(ref) => this.confirm = ref}>
          {this.props.confirm &&
          <div className="message">{this.props.confirm.message}</div>}
          <ul>
            <li>
              <Button
                className="ok"
                onClick={e => this.handleConfirmClick(e)}>{okText}</Button>
            </li>
            <li>
              <Button
                className="cancel"
                onClick={e => this.handleCancelClick(e)}>{cancelText}</Button>
            </li>
          </ul>
        </div>
        <div className="shadow animated" ref={(ref) => this.confirmShadow = ref}></div>
      </div>
    );
  }
}