'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _utils = require('./utils');

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var ENTER = 13;
var ESC = 27;

var ToastrConfirm = function (_React$Component) {
  _inherits(ToastrConfirm, _React$Component);

  function ToastrConfirm(props) {
    _classCallCheck(this, ToastrConfirm);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    var _this$props = _this.props,
        confirmOptions = _this$props.confirmOptions,
        confirm = _this$props.confirm;
    var _confirm$options = confirm.options,
        okText = _confirm$options.okText,
        cancelText = _confirm$options.cancelText,
        transitionIn = _confirm$options.transitionIn,
        transitionOut = _confirm$options.transitionOut,
        disableCancel = _confirm$options.disableCancel;


    _this.okText = okText || confirmOptions.okText;
    _this.cancelText = cancelText || confirmOptions.cancelText;
    _this.transitionIn = transitionIn || confirmOptions.transitionIn || props.transitionIn;
    _this.transitionOut = transitionOut || confirmOptions.transitionOut || props.transitionOut;
    _this.disableCancel = disableCancel || confirmOptions.disableCancel;
    (0, _utils._bind)('setTransition removeConfirm handleOnKeyUp handleOnKeyDown', _this);
    _this.isKeyDown = false;
    return _this;
  }

  ToastrConfirm.prototype.componentDidMount = function componentDidMount() {
    this.isHiding = false;
    this.hasClicked = false;
    this.confirmHolderElement.focus();

    if (this.props.confirm.show) {
      this.setTransition(true);
    }
  };

  ToastrConfirm.prototype.handleOnKeyDown = function handleOnKeyDown(e) {
    if ((0, _utils.keyCode)(e) == ENTER) {
      e.preventDefault();
    }
    this.isKeyDown = true;
  };

  ToastrConfirm.prototype.handleButtonClick = function handleButtonClick(callback) {
    var _this2 = this;

    if (this.hasClicked) return;
    this.hasClicked = true;

    var onAnimationEnd = function onAnimationEnd() {
      _this2.removeConfirm();
      if (callback) {
        callback();
      }
    };

    this.setTransition();
    (0, _utils.onCSSTransitionEnd)(this.confirmElement, onAnimationEnd);
  };

  ToastrConfirm.prototype.handleConfirmClick = function handleConfirmClick() {
    var callback = this.props.confirm.options ? this.props.confirm.options.onOk : null;
    this.handleButtonClick(callback);
  };

  ToastrConfirm.prototype.handleCancelClick = function handleCancelClick() {
    var callback = this.props.confirm.options ? this.props.confirm.options.onCancel : null;
    this.handleButtonClick(callback);
  };

  ToastrConfirm.prototype.setTransition = function setTransition(add) {
    if (add) {
      this.isHiding = false;
      this.confirmElement.classList.add(this.transitionIn);
      if ((0, _utils.isBrowser)()) return document.querySelector('body').classList.add('toastr-confirm-active');
    }

    this.isHiding = true;
    this.confirmElement.classList.remove(this.transitionIn);
    this.confirmElement.classList.add(this.transitionOut);
  };

  ToastrConfirm.prototype.removeConfirm = function removeConfirm() {
    this.isHiding = false;
    this.props.hideConfirm();
    if ((0, _utils.isBrowser)()) return document.querySelector('body').classList.remove('toastr-confirm-active');
  };

  ToastrConfirm.prototype.handleOnKeyUp = function handleOnKeyUp(e) {
    var code = (0, _utils.keyCode)(e);
    if (code == ESC && !this.disableCancel) {
      this.handleCancelClick();
    } else if (code == ESC && this.disableCancel) {
      this.handleConfirmClick();
    } else if (code == ENTER && this.isKeyDown) {
      this.isKeyDown = false;
      this.handleConfirmClick();
    }
  };

  ToastrConfirm.prototype.containsOkButton = function containsOkButton(buttons) {
    return buttons && buttons.filter(function (button) {
      return button.ok === true;
    }).length > 0;
  };

  ToastrConfirm.prototype.containsCancelButton = function containsCancelButton(buttons) {
    return buttons && buttons.filter(function (button) {
      return button.cancel === true;
    }).length > 0;
  };

  ToastrConfirm.prototype.getCustomButtonHandler = function getCustomButtonHandler(config) {
    var _this3 = this;

    if (config.ok === true) {
      return this.handleConfirmClick.bind(this);
    }
    if (config.cancel === true) {
      return this.handleCancelClick.bind(this);
    }
    return function () {
      return _this3.handleButtonClick(config.handler);
    };
  };

  ToastrConfirm.prototype.getCustomButtonText = function getCustomButtonText(config) {
    if (config.ok === true) {
      return this.okText;
    }
    if (config.cancel === true) {
      return this.cancelText;
    }
    return config.text;
  };

  ToastrConfirm.prototype.getCustomButtonClassName = function getCustomButtonClassName(config) {
    if (config.ok === true) {
      return 'rrt-ok-btn';
    }
    if (config.cancel === true) {
      return 'rrt-cancel-btn';
    }
    return config.className;
  };

  ToastrConfirm.prototype.render = function render() {
    var _this4 = this;

    var _props$confirm = this.props.confirm,
        options = _props$confirm.options,
        message = _props$confirm.message;


    return _react2.default.createElement(
      'div',
      {
        className: 'rrt-confirm-holder',
        tabIndex: '-1',
        ref: function ref(_ref2) {
          return _this4.confirmHolderElement = _ref2;
        },
        onKeyDown: this.handleOnKeyDown,
        onKeyUp: this.handleOnKeyUp,
        role: 'alert'
      },
      _react2.default.createElement(
        'div',
        { className: 'rrt-confirm animated', ref: function ref(_ref) {
            return _this4.confirmElement = _ref;
          } },
        message && _react2.default.createElement(
          'div',
          { className: 'rrt-message' },
          message
        ),
        options.component && _react2.default.createElement(options.component, null),
        _react2.default.createElement(
          'div',
          { className: 'rrt-buttons-holder' },
          !this.containsOkButton(options.buttons) && _react2.default.createElement(
            _Button2.default,
            { className: 'rrt-ok-btn', onClick: function onClick() {
                return _this4.handleConfirmClick();
              } },
            this.okText
          ),
          !this.disableCancel && !this.containsCancelButton(options.buttons) && _react2.default.createElement(
            _Button2.default,
            { className: 'rrt-cancel-btn', onClick: this.handleCancelClick.bind(this) },
            this.cancelText
          ),
          options.buttons && options.buttons.map(function (button, index) {
            if (button.cancel === true && _this4.disableCancel) {
              return null;
            }

            var handler = _this4.getCustomButtonHandler(button);
            var text = _this4.getCustomButtonText(button);
            var className = _this4.getCustomButtonClassName(button);

            return _react2.default.createElement(
              _Button2.default,
              { className: className, onClick: handler, key: index },
              text
            );
          })
        )
      ),
      _react2.default.createElement('div', { className: 'shadow' })
    );
  };

  return ToastrConfirm;
}(_react2.default.Component);

ToastrConfirm.displayName = 'ToastrConfirm';
ToastrConfirm.propTypes = {
  confirm: _propTypes2.default.shape({
    options: _propTypes2.default.shape({
      transitionIn: _propTypes2.default.string,
      transitionOut: _propTypes2.default.string
    })
  })
};
exports.default = ToastrConfirm;