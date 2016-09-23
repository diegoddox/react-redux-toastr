import React from 'react';

const Button = props => (
  <button type="button" onClick={() => props.onClick()}>
    <p>{props.children}</p>
  </button>
);

Button.displayName = 'ReduxConfirmButton';

export default Button;
