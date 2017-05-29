import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {onCSSTransitionEnd, keyCode, isBrowser} from './utils';
import Button from './Button';
import {TRANSITIONS} from './constants';

const ENTER = 13;
const ESC = 27;

export default class ToastrConfirm extends React.PureComponent {
  static displayName = 'ToastrConfirm';

  static propTypes = {
    confirm: PropTypes.object.isRequired,
    transitionIn: PropTypes.oneOf(TRANSITIONS.in),
    transitionOut: PropTypes.oneOf(TRANSITIONS.out)
  };

  constructor(props) {
    super(props);

    this.state = {
      note: '',
    };

    const {
      confirmOptions,
      confirm
    } = this.props;

    const {
      okText,
      cancelText,
      transitionIn,
      transitionOut,
      disableCancel,
      enableNote,
    } = confirm.options;

    this.okText = okText || confirmOptions.okText;
    this.cancelText = cancelText || confirmOptions.cancelText;
    this.transitionIn = transitionIn || confirmOptions.transitionIn || props.transitionIn;
    this.transitionOut = transitionOut || confirmOptions.transitionOut || props.transitionOut;
    this.disableCancel = disableCancel || confirmOptions.disableCancel;
    this.isKeyDown = false;
    this.enableNote = enableNote || confirmOptions.enableNote;

    this.setTransition = ::this.setTransition;
    this.removeConfirm = ::this.removeConfirm;
    this.handleOnKeyUp = ::this.handleOnKeyUp;
    this.handleOnKeyDown = ::this.handleOnKeyDown;
    this.handleConfirmClick = ::this.handleConfirmClick;
    this.handleCancelClick = ::this.handleCancelClick;
    this.handleNoteChange = ::this.handleNoteChange;
  }

  componentDidMount() {
    this.isHiding = false;
    this.hasClicked = false;

    if (this.enableNote) {
      this.noteInput.focus();
    } else {
      this.confirmHolderElement.focus();
    }

    if (this.props.confirm.show) {
      this.setTransition(true);
    }
  }

  handleOnKeyDown(e) {
    if (keyCode(e) === ENTER) {
      e.preventDefault();
    }
    this.isKeyDown = true;
  }

  handleConfirmClick() {
    if (this.enableNote && this.props.confirm.options.requiredNote && !this.state.note) return;
    if (this.hasClicked) return;
    this.hasClicked = true;

    const { options } = this.props.confirm;
    const onAnimationEnd = () => {
      this.removeConfirm();
      if (options && options.onOk) {
        if (this.enableNote) {
          options.onOk({ note: this.state.note });
        } else {
          options.onOk();
        }
      }
    };

    this.setTransition();
    onCSSTransitionEnd(this.confirmElement, onAnimationEnd);
  }

  handleCancelClick() {
    if (this.hasClicked) return;
    this.hasClicked = true;

    const { options } = this.props.confirm;
    const onAnimationEnd = () => {
      this.removeConfirm();
      if (options && options.onCancel) {
        if (this.enableNote) {
          options.onCancel({ note: this.state.note });
        } else {
          options.onCancel();
        }
      }
    };

    this.setTransition();
    onCSSTransitionEnd(this.confirmElement, onAnimationEnd);
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
    if (code === ESC && !this.disableCancel) {
      this.handleCancelClick();
    } else if (code === ESC && this.disableCancel) {
      this.handleConfirmClick();
    } else if ((code === ENTER && this.isKeyDown)) {
      this.isKeyDown = false;
      this.handleConfirmClick();
    }
  }

  handleNoteChange(e) {
    this.setState({ note: e.target.value })
    if (this.props.confirm.options.hasOwnProperty('onChangeNote')) {
      this.props.confirm.options.onChangeNote(e.target.value)
    }
  }

  setConfirmHolderElementRef = ref => this.confirmHolderElement = ref;

  setConfirmElementRef = ref => this.confirmElement = ref;

  setNoteInputElementRef = ref => this.noteInput = ref;

  render() {
    return (
      <div
        className="confirm-holder"
        tabIndex="-1"
        ref={this.setConfirmHolderElementRef}
        onKeyDown={this.handleOnKeyDown}
        onKeyUp={this.handleOnKeyUp}
        role="alert"
      >
        <div className="confirm animated" ref={this.setConfirmElementRef}>
          <div className="message">{this.props.confirm.message}</div>
          {this.enableNote &&
          <div className="note">
            {this.props.confirm.options.noteLabel &&
            <label htmlFor="toastr-note">{this.props.confirm.options.noteLabel}</label>
            }
            <input
              id="toastr-note"
              type="text"
              ref={this.setNoteInputElementRef}
              placeholder={this.props.confirm.options.notePlaceholder}
              value={this.state.note}
              onChange={this.handleNoteChange}
            />
          </div>
          }
          <Button
            disabled={this.enableNote && this.props.confirm.options.requiredNote && !this.state.note}
            className={classnames('ok-btn', { 'full-width': this.disableCancel })}
            onClick={this.handleConfirmClick}
          >
            {this.okText}
          </Button>
          {!this.disableCancel &&
          <Button className="cancel-btn" onClick={this.handleCancelClick}>
            {this.cancelText}
          </Button>
          }
        </div>
        <div className="shadow" />
      </div>
    );
  }
}
