'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReduxToastr = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _reactRedux = require('react-redux');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ToastrBox = require('./ToastrBox');

var _ToastrBox2 = _interopRequireDefault(_ToastrBox);

var _ToastrConfirm = require('./ToastrConfirm');

var _ToastrConfirm2 = _interopRequireDefault(_ToastrConfirm);

var _actions = require('./actions');

var actions = _interopRequireWildcard(_actions);

var _toastrEmitter = require('./toastrEmitter');

var _utils = require('./utils');

var _constants = require('./constants');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var ReduxToastr = exports.ReduxToastr = function (_React$Component) {
  _inherits(ReduxToastr, _React$Component);

  function ReduxToastr(props) {
    _classCallCheck(this, ReduxToastr);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.toastrFired = {};
    _this.toastrPositions = ['top-left', 'top-right', 'top-center', 'bottom-left', 'bottom-right', 'bottom-center'];

    (0, _utils.updateConfig)(props);
    return _this;
  }

  ReduxToastr.prototype.componentDidMount = function componentDidMount() {
    var _props = this.props,
        add = _props.add,
        showConfirm = _props.showConfirm,
        clean = _props.clean,
        removeByType = _props.removeByType,
        remove = _props.remove;

    _toastrEmitter.EE.on('toastr/confirm', showConfirm);
    _toastrEmitter.EE.on('add/toastr', add);
    _toastrEmitter.EE.on('clean/toastr', clean);
    _toastrEmitter.EE.on('removeByType/toastr', removeByType);
    _toastrEmitter.EE.on('remove/toastr', remove);
  };

  ReduxToastr.prototype.componentWillUnmount = function componentWillUnmount() {
    _toastrEmitter.EE.removeListener('toastr/confirm');
    _toastrEmitter.EE.removeListener('add/toastr');
    _toastrEmitter.EE.removeListener('clean/toastr');
    _toastrEmitter.EE.removeListener('removeByType/toastr');
    _toastrEmitter.EE.removeListener('remove/toastr');
    this.toastrFired = {};
  };

  ReduxToastr.prototype._addToMemory = function _addToMemory(id) {
    this.toastrFired[id] = true;
  };

  ReduxToastr.prototype._renderToastrForPosition = function _renderToastrForPosition(position) {
    var _this2 = this;

    var toastrs = this.props.toastr.toastrs;


    if (toastrs) {
      return toastrs.filter(function (item) {
        return item.position === position;
      }).map(function (item) {
        var mergedItem = _extends({}, item, {
          options: _extends({
            progressBar: _this2.props.progressBar,
            transitionIn: _this2.props.transitionIn,
            transitionOut: _this2.props.transitionOut
          }, item.options)
        });

        return _react2.default.createElement(
          'span',
          { key: item.id },
          _react2.default.createElement(_ToastrBox2.default, _extends({
            inMemory: _this2.toastrFired,
            addToMemory: function addToMemory() {
              return _this2._addToMemory(item.id);
            },
            item: mergedItem
          }, _this2.props)),
          item.options && item.options.attention && _react2.default.createElement('div', {
            onClick: function onClick() {
              if (typeof item.options.onAttentionClick === 'function') {
                item.options.onAttentionClick(item.id);
              } else {
                _this2.props.remove(item.id);
              }
            },
            className: 'toastr-attention' })
        );
      });
    }
  };

  ReduxToastr.prototype._renderToastrs = function _renderToastrs() {
    var _this3 = this;

    var toastr = this.props.toastr;

    var width = toastr.toastrs && toastr.toastrs[0] && toastr.toastrs[0].options && toastr.toastrs[0].options.width;
    var style = width ? { width: width } : {};
    return _react2.default.createElement(
      'span',
      null,
      this.toastrPositions.map(function (position) {
        return _react2.default.createElement(
          'div',
          { key: position, className: position, style: style },
          _this3._renderToastrForPosition(position)
        );
      })
    );
  };

  ReduxToastr.prototype.render = function render() {
    var _props2 = this.props,
        className = _props2.className,
        toastr = _props2.toastr;

    return _react2.default.createElement(
      'span',
      { className: (0, _classnames2.default)('redux-toastr', className), 'aria-live': 'assertive' },
      toastr.confirm && _react2.default.createElement(_ToastrConfirm2.default, _extends({
        confirm: toastr.confirm
      }, this.props)),
      this._renderToastrs()
    );
  };

  return ReduxToastr;
}(_react2.default.Component);

ReduxToastr.displayName = 'ReduxToastr';
ReduxToastr.propTypes = {
  toastr: _propTypes2.default.object,
  position: _propTypes2.default.string,
  newestOnTop: _propTypes2.default.bool,
  timeOut: _propTypes2.default.number,
  confirmOptions: _propTypes2.default.object,
  progressBar: _propTypes2.default.bool,
  transitionIn: _propTypes2.default.oneOf(_constants.TRANSITIONS.in),
  transitionOut: _propTypes2.default.oneOf(_constants.TRANSITIONS.out),
  preventDuplicates: _propTypes2.default.bool
};
ReduxToastr.defaultProps = {
  position: 'top-right',
  newestOnTop: true,
  timeOut: 5000,
  progressBar: false,
  transitionIn: _constants.TRANSITIONS.in[0],
  transitionOut: _constants.TRANSITIONS.out[0],
  preventDuplicates: false,
  confirmOptions: {
    okText: 'ok',
    cancelText: 'cancel'
  }
};
exports.default = (0, _reactRedux.connect)(function (state) {
  return {
    toastr: state.toastr ? state.toastr : state.get('toastr')
  };
}, actions)(ReduxToastr);