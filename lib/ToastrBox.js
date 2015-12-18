'use strict';

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CSSCore = require('fbjs/lib/CSSCore');

var _CSSCore2 = _interopRequireDefault(_CSSCore);

var _ReactTransitionEvents = require('react/lib/ReactTransitionEvents');

var _ReactTransitionEvents2 = _interopRequireDefault(_ReactTransitionEvents);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ToastrBox = (function (_Component) {
  _inherits(ToastrBox, _Component);

  function ToastrBox(props) {
    _classCallCheck(this, ToastrBox);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ToastrBox).call(this, props));

    (0, _utils._bind)(_this, 'mouseEnter', 'mouseLeave', 'handleClick', 'removeToastr', '_setTransition', '_clearTransition', '_setIntervalId', '_setIsHiding');
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
      var _this2 = this;

      this._setTransition();

      var node = this.toastrBox;
      var _props = this.props;
      var remove = _props.remove;
      var timeOut = _props.timeOut;
      var toastr = _props.toastr;

      var time = _lodash2.default.has(toastr.options, 'timeOut') ? toastr.options.timeOut : timeOut;

      var onRemoveComplite = function onRemoveComplite() {
        if (_this2.isHiding) {
          _this2._setIsHiding(false);
          _ReactTransitionEvents2.default.removeEndEventListener(node, onRemoveComplite);
          remove(toastr.id);
        }
      };

      _ReactTransitionEvents2.default.addEndEventListener(node, onRemoveComplite);
      this._setIntervalId(setTimeout(this.removeToastr, time));
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this.intervalId) {
        clearTimeout(this.intervalId);
      }
    }
  }, {
    key: 'handleClick',
    value: function handleClick(e) {
      e.preventDefault();
      this.removeToastr();
    }
  }, {
    key: 'mouseEnter',
    value: function mouseEnter() {
      if (this.intervalId) {
        clearTimeout(this.intervalId);
        this._setIntervalId(null);
        if (this.isHiding) {
          this._setIsHiding(false);
        }
      }
    }
  }, {
    key: 'mouseLeave',
    value: function mouseLeave() {
      if (!this.isHiding) {
        this._setIntervalId(setTimeout(this.removeToastr, 1000));
      }
    }
  }, {
    key: 'removeToastr',
    value: function removeToastr() {
      if (this.isHiding) {
        return;
      }
      this._setIsHiding(true);
      this._setTransition(true);
    }
  }, {
    key: '_setTransition',
    value: function _setTransition(hide) {
      var node = this.toastrBox;
      var animationType = hide ? this.props.transition.out : this.props.transition.in;

      var onEndListener = function onEndListener(e) {
        if (e && e.target !== node) {
          return;
        }

        _CSSCore2.default.removeClass(node, animationType);
        _ReactTransitionEvents2.default.removeEndEventListener(node, onEndListener);
      };

      _ReactTransitionEvents2.default.addEndEventListener(node, onEndListener);
      _CSSCore2.default.addClass(node, animationType);
    }
  }, {
    key: '_clearTransition',
    value: function _clearTransition() {
      var node = this.toastrBox;
      var transition = this.props.transition;

      _CSSCore2.default.removeClass(node, transition.in);
      _CSSCore2.default.removeClass(node, transition.out);
    }
  }, {
    key: '_setIntervalId',
    value: function _setIntervalId(intervalId) {
      this.intervalId = intervalId;
    }
  }, {
    key: '_setIsHiding',
    value: function _setIsHiding(val) {
      this.isHiding = val;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var toastr = this.props.toastr;

      var classIcon = null;
      var classes = (0, _classnames2.default)('redux-toastr-box', 'animated', toastr.type);

      if (_lodash2.default.has(toastr.options, 'icon')) {
        classIcon = toastr.options.icon;
      } else {
        classIcon = {
          'icon-information-circle': toastr.type == 'info',
          'icon-check-1': toastr.type == 'success',
          'icon-exclamation': toastr.type == 'warning',
          'icon-exclamation-alert': toastr.type == 'error'
        };
      }

      var iconClasses = (0, _classnames2.default)('icon', classIcon);

      return _react2.default.createElement(
        'div',
        {
          className: classes,
          onMouseEnter: this.mouseEnter,
          onMouseLeave: this.mouseLeave,
          ref: function ref(_ref) {
            return _this3.toastrBox = _ref;
          } },
        _react2.default.createElement(
          'div',
          { className: 'icon-holder' },
          _react2.default.createElement('div', { className: iconClasses })
        ),
        _react2.default.createElement(
          'div',
          { className: 'message-holder', onClick: this.handleClick },
          toastr.title && _react2.default.createElement(
            'div',
            { className: 'title' },
            toastr.title
          ),
          toastr.message && _react2.default.createElement(
            'div',
            { className: 'message' },
            toastr.message
          )
        ),
        _react2.default.createElement('button', { onClick: this.handleClick, className: 'close icon-close-round' })
      );
    }
  }]);

  return ToastrBox;
})(_react.Component);

ToastrBox.displayName = 'ToastrBox';
ToastrBox.propTypes = {
  toastr: _react.PropTypes.object.isRequired,
  timeOut: _react.PropTypes.number,
  transition: _react.PropTypes.object
};
ToastrBox.defaultProps = {
  timeOut: 4000,
  transition: {
    in: 'bounceIn',
    out: 'bounceOut'
  }
};
exports.default = ToastrBox;