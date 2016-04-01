'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _CSSCore = require('fbjs/lib/CSSCore');

var _CSSCore2 = _interopRequireDefault(_CSSCore);

var _utils = require('./utils');

var _Button = require('./Button');

var _Button2 = _interopRequireDefault(_Button);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ToastrConfirm = function (_Component) {
  _inherits(ToastrConfirm, _Component);

  function ToastrConfirm(props) {
    _classCallCheck(this, ToastrConfirm);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ToastrConfirm).call(this, props));

    _this.handleConfirmClick = function () {
      var options = _this.props.confirm.options;

      (0, _utils.returnFuncFromObj)(options, 'onOk');
      _this._setTransition();
    };

    _this.handleCancelClick = function () {
      var options = _this.props.confirm.options;

      (0, _utils.returnFuncFromObj)(options, 'onCancel');
      _this._setTransition();
    };

    _this._setTransition = function (add) {
      var body = document.querySelector('body');

      if (add) {
        _CSSCore2.default.addClass(body, 'toastr-confirm-active');
        _CSSCore2.default.addClass(_this.confirm, 'bounceInDown');
        _this.isHiding = false;
      } else {
        _CSSCore2.default.addClass(_this.confirm, 'bounceOutUp');
        _this.isHiding = true;
      }

      (0, _utils.onCSSTransitionEnd)(_this.confirm, _this._onConfirmAnimationComplete);
    };

    _this._onConfirmAnimationComplete = function () {
      if (_this.isHiding) {
        _this._removeConfirm();
      }
    };

    _this._removeConfirm = function () {
      _this.isHiding = false;
      var body = document.querySelector('body');
      _CSSCore2.default.removeClass(_this.confirm, 'bounceOutUp');
      _CSSCore2.default.removeClass(_this.confirm, 'bounceInDown');
      _CSSCore2.default.removeClass(body, 'toastr-confirm-active');
      _this.props.hideConfirm();
    };

    return _this;
  }

  _createClass(ToastrConfirm, [{
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.isHiding = false;

      if (this.props.confirm.show) {
        this._setTransition(true);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props = this.props;
      var okText = _props.okText;
      var cancelText = _props.cancelText;

      var classes = (0, _classnames2.default)('confirm-holder', { active: this.props.confirm.show });
      return _react2.default.createElement(
        'div',
        { className: classes },
        _react2.default.createElement(
          'div',
          { className: 'confirm animated', ref: function ref(_ref) {
              return _this2.confirm = _ref;
            } },
          _react2.default.createElement(
            'div',
            { className: 'message' },
            this.props.confirm.message
          ),
          _react2.default.createElement(
            _Button2.default,
            {
              className: 'ok',
              onClick: function onClick(e) {
                return _this2.handleConfirmClick(e);
              } },
            okText
          ),
          _react2.default.createElement(
            _Button2.default,
            {
              className: 'cancel',
              onClick: function onClick(e) {
                return _this2.handleCancelClick(e);
              } },
            cancelText
          )
        ),
        _react2.default.createElement('div', { className: 'shadow animated', ref: function ref(_ref2) {
            return _this2.confirmShadow = _ref2;
          } })
      );
    }
  }]);

  return ToastrConfirm;
}(_react.Component);

ToastrConfirm.displayName = 'ToastrConfirm';
ToastrConfirm.propTypes = {
  confirm: _react.PropTypes.object.isRequired,
  okText: _react.PropTypes.string,
  cancelText: _react.PropTypes.string
};
exports.default = ToastrConfirm;