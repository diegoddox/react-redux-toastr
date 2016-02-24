'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _CSSCore = require('fbjs/lib/CSSCore');

var _CSSCore2 = _interopRequireDefault(_CSSCore);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _utils = require('./utils');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } //  eslint-disable-line no-unused-vars


var ToastrBox = function (_Component) {
  _inherits(ToastrBox, _Component);

  function ToastrBox(props) {
    _classCallCheck(this, ToastrBox);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ToastrBox).call(this, props));

    _this.handleClick = function () {
      _this._removeToastr();
    };

    _this.mouseEnter = function () {
      clearTimeout(_this.intervalId);
      _this._setIntervalId(null);
      _this._setIsHiding(false);
    };

    _this.mouseLeave = function () {
      if (_this.isHiding || _this.props.item.type !== 'message') {
        _this._setIntervalId(setTimeout(_this._removeToastr, 1000));
      }
    };

    _this._onAnimationComplite = function () {
      var _this$props = _this.props;
      var remove = _this$props.remove;
      var item = _this$props.item;
      var options = item.options;
      var id = item.id;


      if (_this.isHiding) {
        _this._setIsHiding(false);
        remove(id);
        if (options.onHideComplete) {
          options.onHideComplete();
        }
      } else if (!_this.isHiding && options.onShowComplete) {
        options.onShowComplete();
      }
    };

    _this._removeToastr = function () {
      if (!_this.isHiding) {
        _this._setIsHiding(true);
        _this._setTransition(true);
        (0, _utils.onCSSTransitionEnd)(_this.toastrBox, _this._onAnimationComplite);
      }
    };

    _this._setTransition = function (hide) {
      var node = _this.toastrBox;
      var animationType = hide ? _this.transitionOut : _this.transitionIn;

      var onEndListener = function onEndListener(e) {
        if (e && e.target == node) {
          _CSSCore2.default.removeClass(node, animationType);
        }
      };

      (0, _utils.onCSSTransitionEnd)(_this.toastrBox, onEndListener);
      _CSSCore2.default.addClass(node, animationType);
    };

    _this._clearTransition = function () {
      var node = _this.toastrBox;
      _CSSCore2.default.removeClass(node, _this.transitionIn);
      _CSSCore2.default.removeClass(node, _this.transitionOut);
    };

    _this._setIntervalId = function (intervalId) {
      _this.intervalId = intervalId;
    };

    _this._setIsHiding = function (val) {
      _this.isHiding = val;
    };

    _this.renderMessage = function () {
      var _this$props$item = _this.props.item;
      var message = _this$props$item.message;
      var type = _this$props$item.type;

      return type == 'message' ? _react2.default.createElement('p', { dangerouslySetInnerHTML: { __html: message } }) : message;
    };

    _this.isHiding = false;
    _this.intervalId = null;
    _this.transitionIn = 'bounceIn';
    _this.transitionOut = 'bounceOut';
    return _this;
  }

  _createClass(ToastrBox, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var item = this.props.item;
      var timeOut = item.options.timeOut;

      if (typeof timeOut === 'undefined' && item.type !== 'message') {
        timeOut = _config2.default.get('timeOut');
      }

      if (timeOut) {
        this._setIntervalId(setTimeout(this._removeToastr, timeOut));
      }

      this._setTransition();
      (0, _utils.onCSSTransitionEnd)(this.toastrBox, this._onAnimationComplite);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.intervalId) {
        clearTimeout(this.intervalId);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props$item = this.props.item;
      var title = _props$item.title;
      var type = _props$item.type;
      var options = _props$item.options;

      var classes = (0, _classnames2.default)('toastr', 'animated', type, options.icon);
      return _react2.default.createElement(
        'div',
        {
          className: classes,
          onMouseEnter: function onMouseEnter() {
            return _this2.mouseEnter();
          },
          onMouseLeave: function onMouseLeave() {
            return _this2.mouseLeave();
          },
          onClick: function onClick() {
            return _this2.handleClick();
          },
          ref: function ref(_ref) {
            return _this2.toastrBox = _ref;
          } },
        _react2.default.createElement(
          'div',
          { className: 'message-holder' },
          title && _react2.default.createElement(
            'div',
            { className: 'title' },
            title
          ),
          _react2.default.createElement(
            'div',
            { className: 'message' },
            this.renderMessage()
          )
        )
      );
    }
  }]);

  return ToastrBox;
}(_react.Component);

ToastrBox.displayName = 'ToastrBox';
ToastrBox.propTypes = {
  toastr: _react.PropTypes.object.isRequired
};
exports.default = ToastrBox;