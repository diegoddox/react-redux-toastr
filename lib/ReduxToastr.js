'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ReduxToastr = undefined;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactRedux = require('react-redux');

var _redux = require('redux');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ToastrBox = require('./ToastrBox');

var _ToastrBox2 = _interopRequireDefault(_ToastrBox);

var _actions = require('./actions');

var toastrAction = _interopRequireWildcard(_actions);

var _toastrEmitter = require('./toastrEmitter');

var _utils = require('./utils.js');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var mapStateToProps = function mapStateToProps(state) {
  return {
    toastrs: state.toastr
  };
};

var ReduxToastr = exports.ReduxToastr = (function (_Component) {
  _inherits(ReduxToastr, _Component);

  function ReduxToastr(props) {
    _classCallCheck(this, ReduxToastr);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ReduxToastr).call(this, props));

    _this.actions = (0, _redux.bindActionCreators)(toastrAction, _this.props.dispatch);
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
        if (_this2.props.toastrs.length) {
          _this2.actions.clean();
        }
      };

      _toastrEmitter.EE.on('add/toastr', onAddToastr);
      _toastrEmitter.EE.on('clean/toastr', onCleanToastr);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      _toastrEmitter.EE.removeListener('add/toastr');
      _toastrEmitter.EE.removeListener('clean/toastr');
    }
  }, {
    key: 'render',
    value: function render() {
      var _this3 = this;

      var posName = (0, _utils.checkPositionName)(this.props.position);
      var classes = (0, _classnames2.default)(posName, 'redux-toastr');

      return _react2.default.createElement(
        'div',
        { className: classes },
        this.props.toastrs.map(function (toastr) {
          return _react2.default.createElement(_ToastrBox2.default, _extends({
            key: toastr.id,
            toastr: toastr
          }, _this3.actions));
        })
      );
    }
  }]);

  return ReduxToastr;
})(_react.Component);

ReduxToastr.displayName = 'ReduxToastr';
ReduxToastr.propTypes = {
  toastrs: _react.PropTypes.array,
  position: _react.PropTypes.string
};
ReduxToastr.defaultProps = {
  position: 'top-right'
};
exports.default = (0, _reactRedux.connect)(mapStateToProps)(ReduxToastr);