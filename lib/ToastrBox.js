'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

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

    _this.handleClick = function (e) {
      e.preventDefault();
      _this._removeToastr();
    };

    _this.mouseEnter = function () {
      if (_this.intervalId) {
        clearTimeout(_this.intervalId);
        _this._setIntervalId(null);
        if (_this.isHiding) {
          _this._setIsHiding(false);
        }
      }
    };

    _this.mouseLeave = function () {
      var toastr = _this.props.toastr;

      if (_this.isHiding || toastr.type == 'message') {
        return;
      }

      _this._setIntervalId(setTimeout(_this._removeToastr, 1000));
    };

    _this._onAnimationComplite = function () {
      var _this$props = _this.props;
      var remove = _this$props.remove;
      var toastr = _this$props.toastr;
      var options = toastr.options;

      if (_this.isHiding) {
        _this._setIsHiding(false);
        remove(toastr.id);
        if (options.onHideComplete) {
          options.onHideComplete();
        }
      } else if (!_this.isHiding) {
        if (options.onShowComplete) {
          options.onShowComplete();
        }
      }
    };

    _this._removeToastr = function () {
      if (_this.isHiding) {
        return;
      }
      _this._setIsHiding(true);
      _this._setTransition(true);
      (0, _utils.onCSSTransitionEnd)(_this.toastrBox, _this._onAnimationComplite);
    };

    _this._setTransition = function (hide) {
      var node = _this.toastrBox;
      var animationType = hide ? _this.props.transition.out : _this.props.transition.in;

      var onEndListener = function onEndListener(e) {
        if (e && e.target !== node) {
          return;
        }

        _CSSCore2.default.removeClass(node, animationType);
      };

      (0, _utils.onCSSTransitionEnd)(_this.toastrBox, onEndListener);
      _CSSCore2.default.addClass(node, animationType);
    };

    _this._clearTransition = function () {
      var node = _this.toastrBox;
      var transition = _this.props.transition;

      _CSSCore2.default.removeClass(node, transition.in);
      _CSSCore2.default.removeClass(node, transition.out);
    };

    _this._setIntervalId = function (intervalId) {
      _this.intervalId = intervalId;
    };

    _this._setIsHiding = function (val) {
      _this.isHiding = val;
    };

    _this.renderMessage = function () {
      var toastr = _this.props.toastr;

      if (toastr.type == 'message') {
        return _react2.default.createElement(
          'div',
          { className: 'message' },
          _react2.default.createElement('p', { dangerouslySetInnerHTML: { __html: toastr.message } })
        );
      }
      return _react2.default.createElement(
        'div',
        { className: 'message' },
        toastr.message
      );
    };

    return _this;
  }

  _createClass(ToastrBox, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      this.isHiding = false;
      this.intervalId = null;
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      var toastr = this.props.toastr;

      var timeOut = _config2.default.get('timeOut');
      var time = toastr.options.timeOut || timeOut;

      if (toastr.type !== 'message') {
        this._setIntervalId(setTimeout(this._removeToastr, time));
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

      var toastr = this.props.toastr;

      var classes = (0, _classnames2.default)('toastr', 'animated', toastr.type);
      var icons = (0, _classnames2.default)('icon-holder', toastr.options.icon);
      return _react2.default.createElement(
        'div',
        {
          className: classes,
          onMouseEnter: this.mouseEnter,
          onMouseLeave: this.mouseLeave,
          ref: function ref(_ref) {
            return _this2.toastrBox = _ref;
          } },
        _react2.default.createElement('div', { className: icons }),
        _react2.default.createElement(
          'div',
          { className: 'message-holder', onClick: this.handleClick },
          toastr.title && _react2.default.createElement(
            'div',
            { className: 'title' },
            toastr.title
          ),
          this.renderMessage()
        ),
        _react2.default.createElement('button', { onClick: this.handleClick, className: 'close icon-close-round' })
      );
    }
  }]);

  return ToastrBox;
}(_react.Component);

ToastrBox.displayName = 'ToastrBox';
ToastrBox.propTypes = {
  toastr: _react.PropTypes.object.isRequired,
  transition: _react.PropTypes.object
};
ToastrBox.defaultProps = {
  transition: {
    in: 'bounceIn',
    out: 'bounceOut'
  }
};
exports.default = ToastrBox;