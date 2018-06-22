'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (name) {
  switch (name) {
    case 'success':
      return _react2.default.createElement(
        'g',
        null,
        _react2.default.createElement('path', { d: 'M27 4l-15 15-7-7-5 5 12 12 20-20z' })
      );
    case 'info':
      return _react2.default.createElement(
        'g',
        null,
        _react2.default.createElement('path', { d: 'M14 9.5c0-0.825 0.675-1.5 1.5-1.5h1c0.825 0 1.5 0.675 1.5 1.5v1c0 0.825-0.675 1.5-1.5 1.5h-1c-0.825 0-1.5-0.675-1.5-1.5v-1z' }),
        _react2.default.createElement('path', { d: 'M20 24h-8v-2h2v-6h-2v-2h6v8h2z' }),
        _react2.default.createElement('path', { d: 'M16 0c-8.837 0-16 7.163-16 16s7.163 16 16 16 16-7.163 16-16-7.163-16-16-16zM16 29c-7.18 0-13-5.82-13-13s5.82-13 13-13 13 5.82 13 13-5.82 13-13 13z' })
      );
    case 'warning':
      return _react2.default.createElement(
        'g',
        null,
        _react2.default.createElement('path', { d: 'M16 2.899l13.409 26.726h-26.819l13.409-26.726zM16 0c-0.69 0-1.379 0.465-1.903 1.395l-13.659 27.222c-1.046 1.86-0.156 3.383 1.978 3.383h27.166c2.134 0 3.025-1.522 1.978-3.383h0l-13.659-27.222c-0.523-0.93-1.213-1.395-1.903-1.395v0z' }),
        _react2.default.createElement('path', { d: 'M18 26c0 1.105-0.895 2-2 2s-2-0.895-2-2c0-1.105 0.895-2 2-2s2 0.895 2 2z' }),
        _react2.default.createElement('path', { d: 'M16 22c-1.105 0-2-0.895-2-2v-6c0-1.105 0.895-2 2-2s2 0.895 2 2v6c0 1.105-0.895 2-2 2z' })
      );
    case 'error':
      return _react2.default.createElement(
        'g',
        null,
        _react2.default.createElement('path', { d: 'M12,0C5.373,0,0,5.373,0,12s5.373,12,12,12s12-5.373,12-12S18.627,0,12,0z M12,19.66 c-0.938,0-1.58-0.723-1.58-1.66c0-0.964,0.669-1.66,1.58-1.66c0.963,0,1.58,0.696,1.58,1.66C13.58,18.938,12.963,19.66,12,19.66z M12.622,13.321c-0.239,0.815-0.992,0.829-1.243,0c-0.289-0.956-1.316-4.585-1.316-6.942c0-3.11,3.891-3.125,3.891,0 C13.953,8.75,12.871,12.473,12.622,13.321z' })
      );
    default:
      return null;
  }
};

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }