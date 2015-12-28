import React, {Component, PropTypes} from 'react';
import ReactTransitionEvents from 'react/lib/ReactTransitionEvents';
import CSSCore from 'fbjs/lib/CSSCore';
import {_bind, hasProperty} from './utils';
import Button from './Button';

export default class ToastrConfirm extends Component {
  static displayName = 'ToastrConfirm'

  static propTypes = {
    confirm: PropTypes.object.isRequired,
    onConfirmText: PropTypes.string,
    onCancelText: PropTypes.string
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

    this.isHiding = false;
  }

  componentDidUpdate() {
    if (this.props.confirm.show) {
      this._setTransition(true);
    }

    ReactTransitionEvents.addEndEventListener(this.confirm, this._onConfirmAnimationComplete);
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

    ReactTransitionEvents.addEndEventListener(this.confirm, this._onConfirmAnimationComplete);
  }

  _onConfirmAnimationComplete(e) {
    e.stopPropagation();
    if (this.isHiding) {
      //this._removeConfirm();
    }
    console.log('animation done');
    ReactTransitionEvents.removeEndEventListener(this.confirm, this._onConfirmAnimationComplete);
  }

  _removeConfirm() {
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
              <button
                type="button"
                className="ok"
                onClick={e => this.handleConfirmClick(e)}>confirm</button>
            </li>
            <li>
              <Button
                classname="cancel"
                onClick={e => this.handleCancelClick(e)}>cancel</Button>
            </li>
          </ul>
        </div>
        <div className="shadow"></div>
      </div>
    );
  }
}