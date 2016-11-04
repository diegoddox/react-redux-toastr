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
      return (
        <svg
            className={classnames(this.props.className, 'toastr-icon')}
            xmlns="http://www.w3.org/2000/svg"
            width={this.props.width}
            height={this.props.height}
            viewBox={`0 0 ${this.props.width} ${this.props.height}`}
        >
            {icons(this.props.name)}
        </svg>
      );
    }
}

Icon.displayName = 'Icon';
Icon.defaultProps = {
  width: 32,
  height: 32
};

export default Icon;
