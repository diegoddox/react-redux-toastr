import React, {Component, PropTypes} from 'react';
import ReactTransitionEvents from 'react/lib/ReactTransitionEvents';
import CSSCore from 'fbjs/lib/CSSCore';
import {_bind, hasProperty, onCSSTransitionEnd} from './utils';
import Button from './Button';

export default class ToastrConfirm extends Component {
  static displayName = 'ToastrConfirm'

  static propTypes = {
    confirm: PropTypes.object.isRequired,
    onConfirmText: PropTypes.string,
    onCancelText: PropTypes.string
  }

  static defaultProps = {
    onConfirmText: 'ok',
    onCancelText: 'cancel'
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

  handleConfirmClick() {
    const {confirm} = this.props;
    if (confirm.options && hasProperty(confirm.options, 'onConfirm')) {
      confirm.options.onConfirm && confirm.options.onConfirm();
    }
    this._setTransition();
  }

  handleCancelClick(e) {
    const {confirm} = this.props;
    if (confirm.options && hasProperty(confirm.options, 'onCancel')) {
      confirm.options.onCancel && confirm.options.onCancel();
    }

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

  _onConfirmAnimationComplete(e) {
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
    return (
      <div className="confirm-holder hide fadeIn" ref={(ref) => this.confirmHolder = ref}>
        <div className="confirm animated" ref={(ref) => this.confirm = ref}>
          {this.props.confirm &&
          <div className="message">{this.props.confirm.message}</div>}
          <ul>
            <li>
              <Button
                className="ok"
                onClick={e => this.handleConfirmClick(e)}>{this.props.onConfirmText}</Button>
            </li>
            <li>
              <Button
                className="cancel"
                onClick={e => this.handleCancelClick(e)}>{this.props.onCancelText}</Button>
            </li>
          </ul>
        </div>
        <div className="shadow animated" ref={(ref) => this.confirmShadow = ref}></div>
      </div>
    );
  }
}