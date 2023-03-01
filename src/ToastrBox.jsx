import React, {isValidElement} from 'react'; //  eslint-disable-line no-unused-vars
import PropTypes from 'prop-types';
import classnames from 'classnames';
import ProgressBar from './ProgressBar';
import Icon from './Icon';

import {onCSSTransitionEnd, _bind} from './utils';

export default class ToastrBox extends React.Component {
  static displayName = 'ToastrBox';

  static propTypes = {
    item: PropTypes.shape({
      options: PropTypes.shape({
        transitionIn: PropTypes.string,
        transitionOut: PropTypes.string
      })
    })
  };

  constructor(props) {
    super(props);

    let {
      transitionIn,
      transitionOut
    } = props.item.options;

    this.isHiding = false;
    this.shouldClose = false;
    this.intervalId = null;
    this.ignoreIsHiding = false;

    this.transitionIn = transitionIn || this.props.transitionIn;
    this.transitionOut = transitionOut || this.props.transitionOut;
    // an identifier to facilitate aria labelling for a11y for multiple instances of the component family in the DOM
    this.id = props.item.a11yId || Math.floor(Math.random() * 9999);

    this.state = {progressBar: null};

    _bind(
      [
        'renderSubComponent',
        'renderIcon',
        'renderToastr',
        'renderCloseButton',
        'renderMessage',
        '_onAnimationComplete',
        '_removeToastr',
        '_setTransition',
        '_clearTransition',
        '_setIntervalId',
        '_setIsHiding',
        '_setShouldClose'
      ],
      this
    );
  }

  componentDidMount() {
    const {item} = this.props;
    if (this.props.inMemory[item.id]) return;

    const timeOut = this._getItemTimeOut();

    if (timeOut) {
      this._setIntervalId(setTimeout(this._removeToastr, timeOut));
    }

    if (timeOut && item.options.progressBar) {
      this.setState({progressBar: {duration: this._getItemTimeOut()}});
    }

    this._setTransition();
    onCSSTransitionEnd(this.toastrBoxElement, this._onAnimationComplete);
    this.props.addToMemory(item.id);

    if (this.closeButton !== undefined && !item.options.disableCloseButtonFocus) {
      this.closeButton.focus();
    }
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearTimeout(this.intervalId);
    }
    // when toast unloads the toast close button automatically focuses on the next toast control (if any)
    // need to add a micro delay to allow the DOM to recycle
    setTimeout(function() {
      const toastrControls = document.querySelectorAll('.toastr-control:not(.disable-auto-focus)');
      if (toastrControls.length) {
        toastrControls[0].focus();
      }
    }, 50);
  }

  get isToastrClickable() {
    const {onToastrClick, closeOnToastrClick} = this.props.item.options;
    const hasOnToastrClick = !!onToastrClick;

    return hasOnToastrClick || closeOnToastrClick;
  }

  handlePressEnterOrSpaceKeyToastr = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      this.handleClickToastr(e);
    }
  };

  handlePressEnterOrSpaceKeyCloseButton = (e) => {
    if (e.key === ' ' || e.key === 'Enter') {
      this.handleClickCloseButton(e);
    }
  };

  handleClickToastr = () => {
    let {onToastrClick, closeOnToastrClick} = this.props.item.options;
    this.ignoreIsHiding = true;

    if (onToastrClick) {
      onToastrClick();
    }

    if (closeOnToastrClick) {
      this._setShouldClose(true);
      this._removeToastr();
    }
  };

  handleClickCloseButton = (e) => {
    let {onCloseButtonClick} = this.props.item.options;
    e.stopPropagation();

    this.ignoreIsHiding = true;

    if (onCloseButtonClick) {
      onCloseButtonClick();
    }

    this._setShouldClose(true);
    this._removeToastr();
  };

  mouseEnter = () => {
    const {removeOnHover} = this.props.item.options;

    if (!removeOnHover && this.intervalId) return;

    clearTimeout(this.intervalId);

    this._setIntervalId(null);
    this._setIsHiding(false);

    const {progressBar} = this.props.item.options;
    const timeOut = this._getItemTimeOut();

    if (timeOut && progressBar) {
      this.setState({progressBar: null});
    }
  };

  mouseLeave = () => {
    const {removeOnHover, removeOnHoverTimeOut} = this.props.item.options;

    if (!this.isHiding && (removeOnHover || this.shouldClose)) {
      const interval = removeOnHover === true ? (removeOnHoverTimeOut || 1000) : removeOnHover;
      this._setIntervalId(setTimeout(this._removeToastr, interval));

      const {progressBar} = this.props.item.options;
      const timeOut = this._getItemTimeOut();

      if (timeOut && progressBar) {
        this.setState({progressBar: {duration: interval}});
      }
    }
  };

  renderSubComponent() {
    const {
      id,
      options
    } = this.props.item;

    const removeCurrentToastrFunc = () => this.props.remove(id);

    if (isValidElement(options.component)) {
      return React.cloneElement(options.component, {
        remove: removeCurrentToastrFunc
      });
    }

    return (
      <options.component remove={removeCurrentToastrFunc}/>
    );
  }

  renderIcon() {
    const {
      type,
      options
    } = this.props.item;

    if (isValidElement(options.icon)) {
      return React.cloneElement(options.icon);
    }

    const iconName = (type === 'light') ? options.icon : type;
    return <Icon name={iconName} />;
  }

  renderCloseButton() {
    let closeButtonAttributes = {
      tabIndex: 0,
      role: 'button',
      onKeyPress: this.handlePressEnterOrSpaceKeyCloseButton
    };
    if (this.isToastrClickable) {
      closeButtonAttributes = {};
    }
    return (
      <div
        className={classnames('close-toastr', 'toastr-control', {
          'disable-auto-focus': this.props.item.options.disableCloseButtonFocus
        })}
        aria-label="toast"
        onClick={this.handleClickCloseButton}
        ref={ref => this.closeButton = ref}
        {...closeButtonAttributes}
      >
        <span>&#x2715;</span>
      </div>
    );
  }

  renderToastr() {
    const {
      type,
      options,
      message,
      title
    } = this.props.item;

    const ariaAttributes = {};

    if (title) {
      ariaAttributes['aria-labelledby'] = `dialogTitle-${this.id}`;
    }

    if (message) {
      ariaAttributes['aria-describedby'] = `dialogDesc-${this.id}`;
    }

    return (
      <div>
        <div className="rrt-left-container">
          <div className="rrt-holder">
            {this.renderIcon()}
          </div>
        </div>
        {options.status && type === 'light' && <div className={classnames('toastr-status', options.status)}/>}
        <div className="rrt-middle-container" role="alertdialog" {...ariaAttributes}>
          {title && <div id={`dialogTitle-${this.id}`} className="rrt-title">{title}</div>}
          {message && <div id={`dialogDesc-${this.id}`} className="rrt-text">{message}</div>}
          {options.component && this.renderSubComponent()}
        </div>

        <div className="rrt-right-container">
          {options.showCloseButton && this.renderCloseButton()}
        </div>
        {this.state.progressBar ? <ProgressBar {...this.state.progressBar}/> : null}
      </div>
    );
  }

  renderMessage() {
    const {
      title,
      message,
      options
    } = this.props.item;

    return (
      <div>
        <div className="rrt-title">
          {title}
          {this.renderCloseButton()}
        </div>
        <div className="rrt-text">
          {message}
          {options.component && this.renderSubComponent()}
        </div>
      </div>
    );
  }

  toastr() {
    if (this.props.item.type === 'message') {
      return this.renderMessage();
    }

    return this.renderToastr();
  }

  _getItemTimeOut() {
    const {item} = this.props;
    let {timeOut} = item.options;
    if (typeof timeOut === 'undefined') {
      timeOut = this.props.timeOut;
    }

    return timeOut;
  }

  _onAnimationComplete() {
    const {remove, item} = this.props;
    const {options, id} = item;

    if (this.isHiding || this.ignoreIsHiding) {
      this._setIsHiding(false);
      this.ignoreIsHiding = false;
      remove(id);
      if (options.onHideComplete) {
        options.onHideComplete();
      }
    } else if (!this.isHiding && options.onShowComplete) {
      options.onShowComplete();
    }
  }

  _removeToastr() {
    if (!this.isHiding) {
      this._setIsHiding(true);
      this._setTransition(true, false);
      onCSSTransitionEnd(this.toastrBoxElement, this._onAnimationComplete);
    }
  }

  _setTransition(hide, autoRemove = true) {
    const animationType = hide ? this.transitionOut : this.transitionIn;

    const onEndListener = (e) => {
      if (e && e.target == this.toastrBoxElement) {
        this.toastrBoxElement.classList.remove(animationType);
      }
    };

    if (this.toastrBoxElement) {
      if (autoRemove) {
        onCSSTransitionEnd(this.toastrBoxElement, onEndListener);
      }
      this.toastrBoxElement.classList.add(animationType);
    }
  }

  _clearTransition() {
    if (this.toastrBoxElement) {
      this.toastrBoxElement.classList.remove(this.transitionIn, this.transitionOut);
    }
  }

  _setIntervalId(intervalId) {
    this.intervalId = intervalId;
  }

  _setIsHiding(val) {
    this.isHiding = val;
  }

  _setShouldClose(val) {
    this.shouldClose = val;
  }

  render() {
    const {
      options,
      type
    } = this.props.item;

    let toastrClickAttributes = {};
    if (this.isToastrClickable) {
      toastrClickAttributes.role = 'button';
      toastrClickAttributes.tabIndex = 0;
      toastrClickAttributes.onClick = this.handleClickToastr;
      toastrClickAttributes.onKeyPress = this.handlePressEnterOrSpaceKeyToastr;
    }

    return (
      <div
        ref={(ref) => this.toastrBoxElement = ref}
        className={classnames(
          'toastr',
          'animated',
          'rrt-' + type,
          options.className
        )}

        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
        {...toastrClickAttributes}
      >
        {this.toastr()}
      </div>
    );
  }
}
