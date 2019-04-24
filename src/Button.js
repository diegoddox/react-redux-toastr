import React from 'react';

const Button = props => (
  <button type="button" onClick={() => props.onClick()} className={'rrt-button ' + props.className} ref={props.innerRef}>
    {props.children}
  </button>
);

Button.displayName = 'ReduxConfirmButton';

export default Button;
