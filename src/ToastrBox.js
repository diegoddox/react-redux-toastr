import CSSCore from 'fbjs/lib/CSSCore';
import React, {Component, PropTypes, isValidElement} from 'react'; //  eslint-disable-line no-unused-vars
import classnames from 'classnames';
import ProgressBar from './ProgressBar';
import Icon from './Icon';

import {onCSSTransitionEnd, _bind} from './utils';

export default class ToastrBox extends Component {
  static displayName = 'ToastrBox';

  static propTypes = {
    item: PropTypes.object.isRequired
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
    onCSSTransitionEnd(this.toastrBox, this._onAnimationComplete);
    this.props.addToMemory(item.id);
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearTimeout(this.intervalId);
    }
  }

  handleClick() {
    let {onCloseButtonClick} = this.props.item.options;

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
      this._setIntervalId(setTimeout(this._removeToastr, 1000));

      const {progressBar} = this.props.item.options;
      const timeOut = this._getItemTimeOut();

      if (timeOut && progressBar) {
        this.setState({progressBar: {duration: 1000}});
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
        <div className="toastr-left-container">
          <div className="holder">
            {this.renderIcon()}
          </div>
        </div>
        {options.status && type === 'light' && <div className={classnames('toastr-status', options.status)}/>}
        <div className="toastr-middle-container">
          {title && <div className="title">{title}</div>}
          {message && <div className="message">{message}</div>}
          {options.component && this.renderSubComponent()}
        </div>

        <div className="toastr-right-container">
          {options.showCloseButton && this.renderCloseButton()}
        </div>
        {this.state.progressBar ? <ProgressBar {...this.state.progressBar}/> : null}
      </div>
    );
  }

  renderMessage() {
    const {
      title,
      message
    } = this.props.item;

    return (
      <div>
        <div className="title">
          {title}
          {this.renderCloseButton()}
        </div>
        <div className="message">{message}</div>
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

    if (this.isHiding) {
      this._setIsHiding(false);
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
      onCSSTransitionEnd(this.toastrBox, this._onAnimationComplete);
    }
  }

  _setTransition(hide) {
    const node = this.toastrBox;
    const animationType = hide ? this.transitionOut : this.transitionIn;

    const onEndListener = (e) => {
      if (e && e.target == node) {
        CSSCore.removeClass(node, animationType);
      }
    };

    onCSSTransitionEnd(this.toastrBox, onEndListener);
    CSSCore.addClass(node, animationType);
  }

  _clearTransition() {
    const node = this.toastrBox;
    CSSCore.removeClass(node, this.transitionIn);
    CSSCore.removeClass(node, this.transitionOut);
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
        ref={(ref) => this.toastrBox = ref}
        className={classnames(
          'toastr',
          'animated',
          type,
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
