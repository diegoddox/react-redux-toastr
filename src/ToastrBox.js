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

  static defaultProps = {
    transition: {
      in: 'bounceIn',
      out: 'bounceOut'
    }
  };

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.isHiding = false;
    this.intervalId = null;
  }

  componentDidMount() {
    const {toastr} = this.props;
    let {timeOut} = toastr.options;
    if (typeof timeOut === 'undefined' && toastr.type !== 'message') {
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

  handleClick = (e) => {
    e.preventDefault();
    this._removeToastr();
  };

  mouseEnter = () => {
    if (this.intervalId) {
      clearTimeout(this.intervalId);
      this._setIntervalId(null);
      if (this.isHiding) {
        this._setIsHiding(false);
      }
    }
  };

  mouseLeave = () => {
    const {toastr} = this.props;
    if (this.isHiding || toastr.type == 'message') {
      return;
    }

    this._setIntervalId(setTimeout(this._removeToastr, 1000));
  };

  _onAnimationComplite = () => {
    const {remove, toastr} = this.props;
    const {options} = toastr;

    if (this.isHiding) {
      this._setIsHiding(false);
      remove(toastr.id);
      if (options.onHideComplete) {
        options.onHideComplete();
      }
    } else if (!this.isHiding) {
      if (options.onShowComplete) {
        options.onShowComplete();
      }
    }
  };

  _removeToastr = () => {
    if (this.isHiding) {
      return;
    }
    this._setIsHiding(true);
    this._setTransition(true);
    onCSSTransitionEnd(this.toastrBox, this._onAnimationComplite);
  };

  _setTransition = (hide) => {
    const node = this.toastrBox;
    const animationType = hide ? this.props.transition.out : this.props.transition.in;

    const onEndListener = (e) => {
      if (e && e.target !== node) {
        return;
      }

      CSSCore.removeClass(node, animationType);
    };

    onCSSTransitionEnd(this.toastrBox, onEndListener);
    CSSCore.addClass(node, animationType);
  };

  _clearTransition = () => {
    const node = this.toastrBox;
    const {transition} = this.props;
    CSSCore.removeClass(node, transition.in);
    CSSCore.removeClass(node, transition.out);
  };

  _setIntervalId = (intervalId) => {
    this.intervalId = intervalId;
  };

  _setIsHiding = (val) => {
    this.isHiding = val;
  };

  renderMessage = () => {
    const {toastr} = this.props;
    if (toastr.type == 'message') {
      return <div className="message"><p dangerouslySetInnerHTML={{__html: toastr.message}}></p></div>;
    }
    return <div className="message">{toastr.message}</div>;
  };

  render() {
    const {toastr} = this.props;
    const classes = classnames('toastr', 'animated', toastr.type);
    const icons = classnames('icon-holder', toastr.options.icon);
    return (
      <div
        className={classes}
        onMouseEnter={this.mouseEnter}
        onMouseLeave={this.mouseLeave}
        ref={(ref) => this.toastrBox = ref}>

        <div className={icons}></div>
        <div className="message-holder" onClick={this.handleClick}>
          {toastr.title &&
            <div className="title">{toastr.title}</div>}
          {this.renderMessage()}
        </div>
        <button onClick={this.handleClick} className="close icon-close-round"></button>
      </div>
    );
  }
}
