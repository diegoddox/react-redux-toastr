import React from 'react';


export default class Button extends React.PureComponent {
  static displayName = 'ReduxConfirmButton';

  static defaultProps = {
    disabled: false,
  };

  handleOnClick = () => this.props.onClick();

  render() {
    return (
      <button
        type="button"
        className={this.props.className}
        disabled={this.props.disabled}
        onClick={this.handleOnClick}
      >
        {this.props.children}
      </button>
    );
  }
}
