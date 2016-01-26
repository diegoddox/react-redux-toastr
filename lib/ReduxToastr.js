'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _dec, _class;

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ToastrBox = require('./ToastrBox');

var _ToastrBox2 = _interopRequireDefault(_ToastrBox);

var _ToastrConfirm = require('./ToastrConfirm');

var _ToastrConfirm2 = _interopRequireDefault(_ToastrConfirm);

var _actions = require('./actions');

var tActions = _interopRequireWildcard(_actions);

var _toastrEmitter = require('./toastrEmitter');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

var _utils = require('./utils.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ReduxToastr = (_dec = (0, _reactRedux.connect)(function (state) {
  return {
    toastr: state.toastr
  };
}), _dec(_class = function (_Component) {
  _inherits(ReduxToastr, _Component);

  function ReduxToastr(props) {
    _classCallCheck(this, ReduxToastr);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ReduxToastr).call(this, props));

    _this.actions = (0, _redux.bindActionCreators)(tActions, _this.props.dispatch);

    _config2.default.set('timeOut', _this.props.timeOut);
    _config2.default.set('newestOnTop', _this.props.newestOnTop);

    (0, _utils._bind)(_this, 'handleRemoveToastr', 'handleHideConfirm');
    return _this;
  }

  _createClass(ReduxToastr, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      var onAddToastr = function onAddToastr(toastr) {
        _this2.actions.addToastrAction(toastr);
      };

      var onCleanToastr = function onCleanToastr() {
        if (_this2.props.toastr.toastrs.length) {
          _this2.actions.clean();
        }
      };
      var confirm = function confirm(obj) {
        // Fire if we don't have any active confirm
        if (!_this2.props.toastr.confirm.show) {
          _this2.actions.confirm(obj.message, obj.options);
        }
      };

      _toastrEmitter.EE.on('toastr/confirm', confirm);
      _toastrEmitter.EE.on('add/toastr', onAddToastr);
      _toastrEmitter.EE.on('clean/toastr', onCleanToastr);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _toastrEmitter.EE.removeListener('toastr/confirm');
      _toastrEmitter.EE.removeListener('add/toastr');
      _toastrEmitter.EE.removeListener('clean/toastr');
    }
  }, {
    key: 'handleRemoveToastr',
    value: function handleRemoveToastr(id) {
      this.actions.remove(id);
    }
  }, {
    key: 'handleHideConfirm',
    value: function handleHideConfirm() {
      this.actions.hideConfirm();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var toastrPosition = (0, _utils.checkPositionName)(this.props.position);
      var classes = (0, _classnames2.default)('redux-toastr', toastrPosition, { mobile: _utils.isMobile });
      var _props = this.props;
      var toastr = _props.toastr;
      var confirm = _props.confirm;

      var confirmOkText = (0, _utils.hasProperty)(confirm, 'okText') ? confirm.okText : 'ok';
      var confirmCancelText = (0, _utils.hasProperty)(confirm, 'cancelText') ? confirm.cancelText : 'cancel';

      var confirmProps = {
        hideConfirm: this.handleHideConfirm,
        confirm: toastr.confirm,
        okText: confirmOkText,
        cancelText: confirmCancelText
      };

      return _react2.default.createElement(
        'div',
        { className: classes },
        _react2.default.createElement(_ToastrConfirm2.default, confirmProps),
        toastr.toastrs.map(function (item) {
          var props = {
            key: item.id,
            toastr: item,
            timeOut: _this3.props.timeOut,
            remove: _this3.handleRemoveToastr
          };
          return _react2.default.createElement(_ToastrBox2.default, props);
        })
      );
    }
  }]);

  return ReduxToastr;
}(_react.Component)) || _class);
ReduxToastr.displayName = 'ReduxToastr';
ReduxToastr.propTypes = {
  toastr: _react.PropTypes.object,
  options: _react.PropTypes.object,
  position: _react.PropTypes.string,
  newestOnTop: _react.PropTypes.bool,
  timeOut: _react.PropTypes.number,
  confirm: _react.PropTypes.object
};
ReduxToastr.defaultProps = {
  position: 'top-right',
  newestOnTop: true,
  timeOut: 5000,
  confirm: {
    okText: 'ok',
    onCancelText: 'cancel'
  }
};
exports.default = ReduxToastr;