import CSSCore from 'fbjs/lib/CSSCore';
import React, {Component, PropTypes, dangerouslySetInnerHTML} from 'react'; //  eslint-disable-line no-unused-vars
import classnames from 'classnames';

import {onCSSTransitionEnd} from './utils';
import config from './config';

export default class ToastrBox extends Component {
  static displayName = 'ToastrBox';

  static propTypes = {
    toastr: PropTypes.object.isRequired,
    transition: PropTypes.object
  };

  constructor(props) {
    super(props);
    this.isHiding = false;
    this.intervalId = null;
    this.transitionIn = 'bounceIn';
    this.transitionOut = 'bounceOut'
  }

  componentDidMount() {
    const {item} = this.props;
    let {timeOut} = item.options;
    if (typeof timeOut === 'undefined' && item.type !== 'message') {
      timeOut = config.get('timeOut');
    }

    if (timeOut) {
      this._setIntervalId(setTimeout(this._removeToastr, timeOut));
    }

    this._setTransition();
    onCSSTransitionEnd(this.toastrBox, this._onAnimationComplite);
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearTimeout(this.intervalId);
    }
  }

  handleClick = () => {
    this._removeToastr();
  };

  mouseEnter = () => {
    clearTimeout(this.intervalId);
    this._setIntervalId(null);
    this._setIsHiding(false);
  };

  mouseLeave = () => {
    if (this.isHiding || this.props.item.type !== 'message') {
      this._setIntervalId(setTimeout(this._removeToastr, 1000));
    }
  };

  _onAnimationComplite = () => {
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
  };

  _removeToastr = () => {
    if (!this.isHiding) {
      this._setIsHiding(true);
      this._setTransition(true);
      onCSSTransitionEnd(this.toastrBox, this._onAnimationComplite);
    }
  };

  _setTransition = (hide) => {
    const node = this.toastrBox;
    const animationType = hide ? this.transitionOut : this.transitionIn;

    const onEndListener = (e) => {
      if (e && e.target == node) {
        CSSCore.removeClass(node, animationType);
      }
    };

    onCSSTransitionEnd(this.toastrBox, onEndListener);
    CSSCore.addClass(node, animationType);
  };

  _clearTransition = () => {
    const node = this.toastrBox;
    CSSCore.removeClass(node, this.transitionIn);
    CSSCore.removeClass(node, this.transitionOut);
  };

  _setIntervalId = (intervalId) => {
    this.intervalId = intervalId;
  };

  _setIsHiding = (val) => {
    this.isHiding = val;
  };

  renderMessage = () => {
    const {message, type} = this.props.item;
    return type == 'message' ? <p dangerouslySetInnerHTML={{__html: message}}></p> : message;
  };

  render() {
    const {title, type, options} = this.props.item;
    const classes = classnames('toastr', 'animated', type, options.icon);
    return (
      <div
        className={classes}
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
        onClick={() => this.handleClick()} 
        ref={(ref) => this.toastrBox = ref}>
        <div className="message-holder">
          {title && <div className="title">{title}</div>}
          <div className="message">{this.renderMessage()}</div>
        </div>
      </div>
    );
  }
}
