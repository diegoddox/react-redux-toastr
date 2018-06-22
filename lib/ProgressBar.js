'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defaults(obj, defaults) { var keys = Object.getOwnPropertyNames(defaults); for (var i = 0; i < keys.length; i++) { var key = keys[i]; var value = Object.getOwnPropertyDescriptor(defaults, key); if (value && value.configurable && obj[key] === undefined) { Object.defineProperty(obj, key, value); } } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : _defaults(subClass, superClass); }

var ProgressBar = function (_React$Component) {
  _inherits(ProgressBar, _React$Component);

  function ProgressBar(props) {
    _classCallCheck(this, ProgressBar);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = { percent: 100 };
    _this.intervalId = null;
    return _this;
  }

  ProgressBar.prototype.componentDidMount = function componentDidMount() {
    var _this2 = this;

    var distance = 100 / (this.props.duration / 10);
    this.intervalId = setInterval(function () {
      var percent = _this2.state.percent - distance;

      _this2.setState({ percent: percent > 0 ? percent : 0 });
    }, 10);
  };

  ProgressBar.prototype.componentDidUpdate = function componentDidUpdate() {
    if (this.state.percent <= 0 && this.intervalId) {
      clearTimeout(this.intervalId);
    }
  };

  ProgressBar.prototype.componentWillUnmount = function componentWillUnmount() {
    if (this.intervalId) {
      clearTimeout(this.intervalId);
    }
  };

  ProgressBar.prototype.render = function render() {
    var percent = this.state.percent;


    return _react2.default.createElement(
      'div',
      { className: 'rrt-progress-container' },
      _react2.default.createElement('div', { className: 'rrt-progressbar', style: { width: percent + '%' } })
    );
  };

  return ProgressBar;
}(_react2.default.Component);

ProgressBar.displayName = 'ProgressBar';
ProgressBar.propTypes = {
  duration: _propTypes2.default.number.isRequired
};
exports.default = ProgressBar;