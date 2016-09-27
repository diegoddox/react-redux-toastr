import CSSCore from 'fbjs/lib/CSSCore';
import React, {Component, PropTypes, isValidElement} from 'react'; //  eslint-disable-line no-unused-vars
import cn from 'classnames';

import {onCSSTransitionEnd} from './utils';
import config from './config';

export default class ToastrBox extends Component {
  static displayName = 'ToastrBox';

  static propTypes = {
    item: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);
    let {options} = props.item;
    this.isHiding = false;
    this.intervalId = null;
    this.transitionIn = options.transitionIn || config.toastr.transitionIn;
    this.transitionOut = options.transitionOut || config.toastr.transitionOut;
  }

  componentDidMount() {
    const {item} = this.props;
    if (this.props.inMemory[item.id]) return;

    let {timeOut} = item.options;
    if (typeof timeOut === 'undefined' && item.type !== 'message') {
      timeOut = config.toastr.timeOut;
    }

    if (timeOut) {
      this._setIntervalId(setTimeout(this._removeToastr, timeOut));
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
  }

  mouseLeave() {
    const {removeOnHover} = this.props.item.options;
    if (!this.isHiding && this.props.item.type !== 'message' && removeOnHover == true) {
      this._setIntervalId(setTimeout(this._removeToastr, 1000));
    }
  }

  _onAnimationComplete = () => {
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
      onCSSTransitionEnd(this.toastrBox, this._onAnimationComplete);
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

  _renderSubComponent = (SubComponent) => {
    const removeCurrentToastrFunc = () => this.props.remove(this.props.item.id);

    if (isValidElement(SubComponent)) {
      return React.cloneElement(SubComponent, {
        remove: removeCurrentToastrFunc
      });
    }

    return (
      <SubComponent remove={removeCurrentToastrFunc}/>
    );
  };

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
          options.icon,
          options.className
        )}
        onMouseEnter={this.mouseEnter.bind(this)}
        onMouseLeave={this.mouseLeave.bind(this)}
      >
        <div className="message-holder">
          {title && <div className="title">{title}</div>}
          {message && <div className="message">{message}</div>}
          {options.component &&
            <div className="message">
              {this._renderSubComponent(options.component)}
            </div>
          }
        </div>
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
    );
  }
}
