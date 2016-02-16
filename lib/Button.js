'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _CSSCore = require('fbjs/lib/CSSCore');

var _CSSCore2 = _interopRequireDefault(_CSSCore);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = function (_Component) {
  _inherits(Button, _Component);

  function Button(props) {
    _classCallCheck(this, Button);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Button).call(this, props));

    _this.handleClick = function (e) {
      e.preventDefault();
      _CSSCore2.default.addClass(_this.toastrButton, 'active');
      /*
       * In order to avoid event bubbling we need to call the onClick callback
       * after we have remove the css class 'active' that contains the animation
       */
      var end = function end() {
        _CSSCore2.default.removeClass(_this.toastrButton, 'active');
        if (_this.props.onClick) {
          _this.props.onClick && _this.props.onClick();
        }
      };
      (0, _utils.onCSSTransitionEnd)(_this.toastrButton, end);
    };

    return _this;
  }

  _createClass(Button, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      return _react2.default.createElement(
        'button',
        {
          ref: function ref(_ref) {
            return _this2.toastrButton = _ref;
          },
          type: 'button',
          onClick: function onClick(e) {
            return _this2.handleClick(e);
          } },
        _react2.default.createElement(
          'p',
          null,
          this.props.children
        )
      );
    }
  }]);

  return Button;
}(_react.Component);

Button.displayName = 'ReduxConfirmButton';
exports.default = Button;