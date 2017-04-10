import React from 'react';

const Button = props => (
  <button type="button" onClick={() => props.onClick()} className={props.className}>
    {props.children}
  </button>
);

Button.displayName = 'ReduxConfirmButton';

export default Button;
