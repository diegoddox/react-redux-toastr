import React from 'react';
import classnames from 'classnames';
import icons from './icons';

export default class Icon extends React.Component {
  static displayName = 'ReduxToastrIcon';

  static defaultProps = {
    size: 32
  };

  render() {
    const {size} = this.props;
    const styles = {
      width: size,
      height: size
    };

    return (
      <svg
        className={classnames(this.props.className, 'toastr-icon')}
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="xMidYMid meet"
        viewBox={`0 0 ${this.props.size} ${this.props.size}`}
        style={styles}
      >
        {icons(this.props.name)}
      </svg>
    );
  }
}
