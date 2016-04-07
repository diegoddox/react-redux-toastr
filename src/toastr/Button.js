import React, {Component} from 'react';
import CSSCore from 'fbjs/lib/CSSCore';

import {onCSSTransitionEnd} from './utils';

export default class Button extends Component {
  static displayName = 'ReduxConfirmButton';

  constructor(props) {
    super(props);
  }

  handleClick = (e) => {
    e.preventDefault();
    CSSCore.addClass(this.toastrButton, 'active');
    /*
     * In order to avoid event bubbling we need to call the onClick callback
     * after we have remove the css class 'active' that contains the animation
     */
    const end = () => {
      CSSCore.removeClass(this.toastrButton, 'active');
      if (this.props.onClick) {
        this.props.onClick && this.props.onClick();
      }
    };
    onCSSTransitionEnd(this.toastrButton, end);
  };

  render() {
    return (
      <button
        ref={(ref) => this.toastrButton = ref}
        type="button"
        onClick={e => this.handleClick(e)}>
          <p>{this.props.children}</p>
      </button>
    );
  }
}
