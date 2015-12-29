import CSSCore from 'fbjs/lib/CSSCore';
import ReactTransitionEvents from 'react/lib/ReactTransitionEvents';
import React, {Component, PropTypes, dangerouslySetInnerHTML} from 'react';
import classnames from 'classnames';
import {config} from './config';

import {_bind, hasProperty, mapToIcon, onCSSTransitionEnd} from './utils';


export default class ToastrBox extends Component {
  static displayName = 'ToastrBox'

  static propTypes = {
    toastr: PropTypes.object.isRequired,
    timeOut: PropTypes.number,
    transition: PropTypes.object
  }

  static defaultProps = {
    timeOut: 5000,
    transition: {
      in: 'bounceIn',
      out: 'bounceOut'
    }
  }

  constructor(props) {
    super(props);
    _bind(
      this,
      'mouseEnter',
      'mouseLeave',
      'handleClick',
      '_removeToastr',
      '_onAnimationComplite',
      '_setTransition',
      '_clearTransition',
      '_setIntervalId',
      '_setIsHiding',
      '_renderMessage'
    );
  }

  componentWillMount() {
    this.isHiding = false;
    this.intervalId = null;
  }

  componentDidMount() {
    const {timeOut, toastr} = this.props;
    const time = hasProperty(toastr.options, 'timeOut') ? toastr.options.timeOut : timeOut;

    if (toastr.type !== 'message') {
      this._setIntervalId(setTimeout(this._removeToastr, time));
    } 

    this._setTransition();
    onCSSTransitionEnd(this.toastrBox, this._onAnimationComplite);
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearTimeout(this.intervalId);
    }
  }

  handleClick(e) {
    e.preventDefault();
    this._removeToastr();
  }

  mouseEnter() {
    if (this.intervalId) {
      clearTimeout(this.intervalId);
      this._setIntervalId(null);
      if (this.isHiding) {
        this._setIsHiding(false);
      }
    }
  }

  mouseLeave() {
    const {toastr} = this.props;
    if(this.isHiding || toastr.type == 'message') {
      return;
    }

    this._setIntervalId(setTimeout(this._removeToastr, 1000));
  }

  _onAnimationComplite(e) {
    e.stopPropagation()
    const {remove, toastr} = this.props;
    const {options} = toastr;

    if (this.isHiding) {
      this._setIsHiding(false);
      remove(toastr.id);

      if (hasProperty(options, 'onHideComplete')) {
        options.onHideComplete && options.onHideComplete();
      }
    } else if (!this.isHiding) {
      if (hasProperty(options, 'onShowComplete')) {
        options.onShowComplete && options.onShowComplete();
      }
    }
  }

  _removeToastr() {
    if (this.isHiding) {
      return;
    }
    this._setIsHiding(true);
    this._setTransition(true);
  }

  _setTransition(hide) {
    const node = this.toastrBox;
    const animationType = hide ? this.props.transition.out : this.props.transition.in;

    const onEndListener = (e) => {
      if (e && e.target !== node) {
        return;
      }

      CSSCore.removeClass(node, animationType);
    };

    onCSSTransitionEnd(this.toastrBox, this._onAnimationComplite);
    CSSCore.addClass(node, animationType);
  }

  _clearTransition() {
    const node = this.toastrBox;
    const {transition} = this.props;
    CSSCore.removeClass(node, transition.in);
    CSSCore.removeClass(node, transition.out);
  }

  _setIntervalId(intervalId) {
    this.intervalId = intervalId;
  }

  _setIsHiding(val) {
    this.isHiding = val;
  }

  _renderMessage() {
    const {toastr} = this.props;

    if (toastr.type == 'message') {
      return <div className="message"><p dangerouslySetInnerHTML={{__html: toastr.message}}></p></div>
    }

    return <div className="message">{toastr.message}</div>
  }

  render() {
    const {toastr} = this.props;
    let classIcon = null;
    const classes = classnames('toastr', 'animated', toastr.type);

    if (hasProperty(toastr.options, 'icon')) {
      classIcon = mapToIcon(toastr.options.icon);
    } else {
      classIcon = mapToIcon(toastr.type);
    }

    const iconClasses = classnames('icon', classIcon);

    return (
      <div
        className={classes}
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
        ref={(ref) => this.toastrBox = ref}>

        <div className="icon-holder">
          <div className={iconClasses}></div>
        </div>
        <div className="message-holder" onClick={this.handleClick}>
          {toastr.title &&
          <div className="title">{toastr.title}</div>}
          {this._renderMessage()}
        </div>
        <button onClick={this.handleClick} className="close icon-close-round"></button>
      </div>
    );
  }
}