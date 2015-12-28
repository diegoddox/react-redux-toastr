import React, {Component} from 'react';
import ReactTransitionEvents from 'react/lib/ReactTransitionEvents';
import CSSCore from 'fbjs/lib/CSSCore';

import {_bind} from './utils';

export default class Button extends Component {
  static displayName = 'Button'

  constructor(props) {
    super(props);
    _bind(this, 'handleClick');
  }

  handleClick(e) {
    e.stopPropagation();
    e.preventDefault();

    const onComplete = (e) => {
      CSSCore.removeClass(this.toastrButton, 'active');
      ReactTransitionEvents.removeEndEventListener(this.toastrButton, onComplete);
    };

    CSSCore.addClass(this.toastrButton, 'active');
    ReactTransitionEvents.addEndEventListener(this.toastrButton, onComplete);

    if (this.props.onClick) {
      this.props.onClick && this.props.onClick()
    }
  }

  render() {
    return (
      <button
        ref={(ref) => this.toastrButton = ref}
        type="button"
        className={this.props.classname}
        onClick={e => this.handleClick(e)}>{this.props.children}</button>
    );
  }
}