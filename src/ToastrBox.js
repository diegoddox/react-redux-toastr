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
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearTimeout(this.intervalId);
    }
  }

  handleClick() {
    let {onCloseButtonClick} = this.props.item.options;
    this.ignoreIsHiding = true;

    if (onCloseButtonClick) {
      onCloseButtonClick();
    }

    this._setShouldClose(true);
    this._removeToastr();
  }

  mouseEnter() {
    clearTimeout(this.intervalId);

    this._setIntervalId(null);
    this._setIsHiding(false);

    const {progressBar} = this.props.item.options;
    const timeOut = this._getItemTimeOut();

    if (timeOut && progressBar) {
      this.setState({progressBar: null});
    }
  }

  mouseLeave() {
    const {removeOnHover} = this.props.item.options;

    if (!this.isHiding && (removeOnHover || this.shouldClose)) {
      const interval = removeOnHover === true ? 1000 : removeOnHover;
      this._setIntervalId(setTimeout(this._removeToastr, interval));

      const {progressBar} = this.props.item.options;
      const timeOut = this._getItemTimeOut();

      if (timeOut && progressBar) {
        this.setState({progressBar: {duration: interval}});
      }
    }
  }

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
    return (
      <button
        type="button"
        className="close-toastr"
        onClick={this.handleClick.bind(this)}
      >
        &#x2715;
      </button>
    );
  }

  renderToastr() {
    const {
      type,
      options,
      message,
      title
    } = this.props.item;

    return (
      <div>
        <div className="rrt-left-container">
          <div className="rrt-holder">
            {this.renderIcon()}
          </div>
        </div>
        {options.status && type === 'light' && <div className={classnames('toastr-status', options.status)}/>}
        <div className="rrt-middle-container">
          {title && <div className="rrt-title">{title}</div>}
          {message && <div className="rrt-text">{message}</div>}
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
      this._setTransition(true);
      onCSSTransitionEnd(this.toastrBoxElement, this._onAnimationComplete);
    }
  }

  _setTransition(hide) {
    const animationType = hide ? this.transitionOut : this.transitionIn;

    const onEndListener = (e) => {
      if (e && e.target == this.toastrBoxElement) {
        this.toastrBoxElement.classList.remove(animationType);
      }
    };

    onCSSTransitionEnd(this.toastrBoxElement, onEndListener);
    this.toastrBoxElement.classList.add(animationType);
  }

  _clearTransition() {
    this.toastrBoxElement.classList.remove(this.transitionIn, this.transitionOut);
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

    return (
      <div
        ref={(ref) => this.toastrBoxElement = ref}
        className={classnames(
          'toastr',
          'animated',
          'rrt-' + type,
          options.className
        )}
        onMouseEnter={this.mouseEnter.bind(this)}
        onMouseLeave={this.mouseLeave.bind(this)}
      >
       {this.toastr()}
      </div>
    );
  }
}
