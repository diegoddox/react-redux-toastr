import CSSCore from 'fbjs/lib/CSSCore';
import ReactTransitionEvents from 'react/lib/ReactTransitionEvents';
import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import _ from 'lodash';

import {_bind} from './utils';


export default class ToastrBox extends Component {
  static displayName = 'ToastrBox'

  static propTypes = {
    toastr: PropTypes.object.isRequired,
    timeOut: PropTypes.number,
    transition: PropTypes.object
  }

  static defaultProps = {
    timeOut: 4000,
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
      'removeToastr',
      '_setTransition',
      '_clearTransition',
      '_setIntervalId',
      '_setIsHiding'
    );
  }

  componentWillMount() {
    this.isHiding = false;
    this.intervalId = null;
  }

  componentDidMount() {
    this._setTransition();

    const node = this.toastrBox;
    const {remove, timeOut, toastr} = this.props;
    const time = _.has(toastr.options, 'timeOut') ? toastr.options.timeOut : timeOut;

    const onRemoveComplite = () => {
      if (this.isHiding) {
        this._setIsHiding(false);
        ReactTransitionEvents.removeEndEventListener(node, onRemoveComplite);
        remove(toastr.id);
      }
    };

    ReactTransitionEvents.addEndEventListener(node, onRemoveComplite);
    this._setIntervalId(setTimeout(this.removeToastr, time));
  }

  componentWillUnmount() {
    if (this.intervalId) {
      clearTimeout(this.intervalId);
    }
  }

  handleClick(e) {
    e.preventDefault();
    this.removeToastr();
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
    if (!this.isHiding) {
      this._setIntervalId(setTimeout(this.removeToastr, 1000));
    }
  }

  removeToastr() {
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
      ReactTransitionEvents.removeEndEventListener(node, onEndListener);
    };

    ReactTransitionEvents.addEndEventListener(node, onEndListener);
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

  render() {
    const {toastr} = this.props;
    let classIcon = null;
    const classes = classnames('redux-toastr-box', 'animated', toastr.type);

    if (_.has(toastr.options, 'icon')) {
      classIcon = toastr.options.icon;
    } else {
      classIcon = {
        'icon-information-circle': toastr.type == 'info',
        'icon-check-1': toastr.type == 'success',
        'icon-exclamation': toastr.type == 'warning',
        'icon-exclamation-alert': toastr.type == 'error'
      };
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
        <div className="redux-toastr-message-holder" onClick={this.handleClick}>
          {toastr.title &&
          <div className="title">{toastr.title}</div>}
          {toastr.message &&
          <div className="message">{toastr.message}</div>}
        </div>
        <button onClick={this.handleClick} className="close icon-close-round"></button>
      </div>
    );
  }
}