import React from 'react';
import PropTypes from 'prop-types';
import {onCSSTransitionEnd, _bind, keyCode, isBrowser} from './utils';
import Button from './Button';

const ENTER = 13;
const ESC = 27;

export default class ToastrConfirm extends React.Component {
  static displayName = 'ToastrConfirm';
  static propTypes = {
    confirm: PropTypes.shape({
      options: PropTypes.shape({
        transitionIn: PropTypes.string,
        transitionOut: PropTypes.string
      })
    })
  };

  constructor(props) {
    super(props);
    const {
      confirmOptions,
      confirm
    } = this.props;

    const {
      okText,
      cancelText,
      transitionIn,
      transitionOut,
      disableCancel
    } = confirm.options;

    this.okText = okText || confirmOptions.okText;
    this.cancelText = cancelText || confirmOptions.cancelText;
    this.transitionIn = transitionIn || confirmOptions.transitionIn || props.transitionIn;
    this.transitionOut = transitionOut || confirmOptions.transitionOut || props.transitionOut;
    this.disableCancel = disableCancel || confirmOptions.disableCancel;
    _bind('setTransition removeConfirm handleOnKeyUp handleOnKeyDown', this);
    this.isKeyDown = false;
    // an identifier to facilitate aria labelling for a11y for multiple instances of the component family in the DOM
    this.id = Math.floor(Math.random() * 9999);

  }

  componentDidMount() {
    this.isHiding = false;
    this.hasClicked = false;
    this.confirmHolderElement.focus();

    if (this.props.confirm.show) {
      this.setTransition(true);
    }
    // when toast loads the toast close button automatically focuses on the toast control
    if (this.closeButton !== undefined) {
      this.closeButton.focus();
    }
  }

  componentWillUnmount() {
    // when toast unloads the toast close button automatically focuses on the next toast control (if any)
    // need to add a micro delay to allow the DOM to recycle
    setTimeout(function() {
      if (document.getElementsByClassName('toastr-control').length > 0) {
        document.getElementsByClassName('toastr-control')[0].focus();
      }
    }, 50);
  }

  handleOnKeyDown(e) {
    if (keyCode(e) == ENTER) {
      e.preventDefault();
    }
    this.isKeyDown = true;
  }

  handleButtonClick(callback) {
    if (this.hasClicked) return;
    this.hasClicked = true;

    const onAnimationEnd = () => {
      this.removeConfirm();
      if (callback) {
        callback();
      }
    };

    this.setTransition();
    onCSSTransitionEnd(this.confirmElement, onAnimationEnd);
  }

  handleConfirmClick() {
    const callback = this.props.confirm.options ? this.props.confirm.options.onOk : null;
    this.handleButtonClick(callback);
  }

  handleCancelClick() {
    const callback = this.props.confirm.options ? this.props.confirm.options.onCancel : null;
    this.handleButtonClick(callback);
  }

  setTransition(add) {
    if (add) {
      this.isHiding = false;
      this.confirmElement.classList.add(this.transitionIn);
      if (isBrowser()) return document.querySelector('body').classList.add('toastr-confirm-active');
    }

    this.isHiding = true;
    this.confirmElement.classList.remove(this.transitionIn);
    this.confirmElement.classList.add(this.transitionOut);
  }

  removeConfirm() {
    this.isHiding = false;
    this.props.hideConfirm();
    if (isBrowser()) return document.querySelector('body').classList.remove('toastr-confirm-active');
  }

  handleOnKeyUp(e) {
    const code = keyCode(e);
    if (code == ESC && !this.disableCancel) {
      this.handleCancelClick();
    } else if (code == ESC && this.disableCancel) {
      this.handleConfirmClick();
    } else if (code == ENTER && this.isKeyDown) {
      this.isKeyDown = false;
      this.handleConfirmClick();
    }
  }

  containsOkButton(buttons) {
    return buttons && buttons.filter(button => button.ok === true).length > 0;
  }

  containsCancelButton(buttons) {
    return buttons && buttons.filter(button => button.cancel === true).length > 0;
  }

  getCustomButtonHandler(config) {
    if (config.ok === true) {
      return this.handleConfirmClick.bind(this);
    }
    if (config.cancel === true) {
      return this.handleCancelClick.bind(this);
    }
    return () => this.handleButtonClick(config.handler);
  }

  getCustomButtonText(config) {
    if (config.ok === true) {
      return this.okText;
    }
    if (config.cancel === true) {
      return this.cancelText;
    }
    return config.text;
  }

  getCustomButtonClassName(config) {
    if (config.ok === true) {
      return 'rrt-ok-btn';
    }
    if (config.cancel === true) {
      return 'rrt-cancel-btn';
    }
    return config.className;
  }

  render() {
    const {
      options,
      message
    } = this.props.confirm;

    return (
      <div
        className="rrt-confirm-holder"
        tabIndex="-1"
        ref={ref => this.confirmHolderElement = ref}
        onKeyDown={this.handleOnKeyDown}
        onKeyUp={this.handleOnKeyUp}
        role="alert"
      >
        <div className="rrt-confirm animated" ref={ref => this.confirmElement = ref} role="alertdialog" aria-describedby={`dialogDesc-${this.id}`}>
          {message && <div className="rrt-message" id={`dialogDesc-${this.id}`}>{message}</div>}
          {options.component && <options.component/>}
          <div className="rrt-buttons-holder">
            {!this.containsOkButton(options.buttons) &&
              <Button tabIndex="0" ref={ref => this.closeButton = ref} className="rrt-ok-btn toastr-control" onClick={() => this.handleConfirmClick()}>
                {this.okText}
              </Button>
            }
            {!this.disableCancel && !this.containsCancelButton(options.buttons) &&
              <Button  tabIndex="0" ref={ref => this.closeButton = ref} className="rrt-cancel-btn toastr-control" onClick={this.handleCancelClick.bind(this)}>
                {this.cancelText}
              </Button>
            }
            {options.buttons && options.buttons.map((button, index) => {
              if (button.cancel === true && this.disableCancel) {
                return null;
              }

              const handler = this.getCustomButtonHandler(button);
              const text = this.getCustomButtonText(button);
              const className = this.getCustomButtonClassName(button);

              return <Button tabIndex="0" className={className} onClick={handler} key={index}>{text}</Button>;
            })}
          </div>
        </div>
        <div className="shadow"></div>
      </div>
    );
  }
}
