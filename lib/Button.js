'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Button = function Button(props) {
  return _react2.default.createElement(
    'button',
    { type: 'button', onClick: function onClick() {
        return props.onClick();
      }, className: 'rrt-button ' + props.className },
    props.children
  );
};

Button.displayName = 'ReduxConfirmButton';

exports.default = Button;