import CSSCore from 'fbjs/lib/CSSCore';
import React, {Component, PropTypes, isValidElement} from 'react'; //  eslint-disable-line no-unused-vars
import cn from 'classnames';
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
    } = props.item;

    this.isHiding = false;
    this.intervalId = null;

    this.transitionIn = transitionIn || this.props.transitionIn;
    this.transitionOut = transitionOut || this.props.transitionOut;

    this.state = {progressBar: null};
    _bind(
      [
        'renderSubComponent',
        'renderIcon',
        '_onAnimationComplete',
        '_removeToastr',
        '_setTransition',
        '_clearTransition',
        '_setIntervalId',
        '_setIsHiding'
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
    if (!this.isHiding && this.props.item.type !== 'message' && removeOnHover == true) {
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
    return <Icon name={type} />;
  }

  _getItemTimeOut() {
    const {item} = this.props;
    let {timeOut} = item.options;
    if (typeof timeOut === 'undefined' && item.type !== 'message') {
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

  render() {
    const {
      options,
      type,
      message,
      title
    } = this.props.item;

    return (
      <div
        ref={(ref) => this.toastrBox = ref}
        className={cn(
          'toastr',
          'animated',
          type,
          options.className
        )}
        onMouseEnter={this.mouseEnter.bind(this)}
        onMouseLeave={this.mouseLeave.bind(this)}
      >
        <div className="toastr-left-container">{this.renderIcon()}</div>

        <div className="toastr-middle-container">
          {title && <div className="title">{title}</div>}
          {message && <div className="message">{message}</div>}
          {options.component && this.renderSubComponent()}
        </div>

        <div className="toastr-right-container">
          {options.showCloseButton &&
            <button
              type="button"
              className="close-toastr"
              onClick={this.handleClick.bind(this)}
            >
              x
            </button>
          }
        </div>
        {this.state.progressBar ? <ProgressBar {...this.state.progressBar}/> : null}
      </div>
    );
  }
}
