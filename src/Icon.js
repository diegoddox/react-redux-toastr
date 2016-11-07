import React from 'react';
import classnames from 'classnames';
import icons from './icons';

class Icon extends React.Component {
    static displayName = 'Icon'

    static defaultProps = {
      width: 32,
      height: 32
    }

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

Icon.displayName = 'Icon';
Icon.defaultProps = {
  size: 32
};

export default Icon;
