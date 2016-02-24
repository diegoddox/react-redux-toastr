'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createReducer = createReducer;
exports.checkPositionName = checkPositionName;
exports.mapToToastrMessage = mapToToastrMessage;
exports.mapToIcon = mapToIcon;
exports.hasProperty = hasProperty;
exports.guid = guid;
exports.onCSSTransitionEnd = onCSSTransitionEnd;

var _ReactTransitionEvents = require('react/lib/ReactTransitionEvents');

var _ReactTransitionEvents2 = _interopRequireDefault(_ReactTransitionEvents);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createReducer(initialState, fnMap) {
  return function () {
    var state = arguments.length <= 0 || arguments[0] === undefined ? initialState : arguments[0];
    var _ref = arguments[1];
    var type = _ref.type;
    var payload = _ref.payload;

    var handle = fnMap[type];
    return handle ? handle(state, payload) : state;
  };
}

function checkPositionName(name) {
  var positions = ['top-left', 'top-right', 'bottom-left', 'bottom-right'];
  var isValidName = positions.indexOf(name);

  if (isValidName > -1) {
    return name;
  }
  return positions[1];
}

function mapToToastrMessage(type, array) {
  var obj = {};
  obj.type = type;
  obj.options = {};

  var options = array.filter(function (item) {
    return item.icon || item.timeOut || item.onShowComplete || item.onHideComplete || item.icon;
  })[0];

  if (options) {
    obj.options = options;
  }

  if (!obj.options.icon) {
    obj.options.icon = mapToIcon(type);
  }

  if (isString(array[0]) && isString(array[1])) {
    obj.title = array[0];
    obj.message = array[1];
  } else {
    obj.message = array[0];
  }

  return obj;
}

function mapToIcon(type) {
  switch (type) {
    case 'info':
      return 'icon-information-circle';
    case 'success':
      return 'icon-check-1';
    case 'warning':
      return 'icon-exclamation-triangle';
    case 'error':
      return 'icon-exclamation-alert';
    default:
      return type;
  }
}

function hasProperty(obj, property) {
  if (obj == null) {
    return false;
  }
  return typeof obj[property] !== 'undefined';
}

function guid() {
  function r() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  return r() + r() + r() + '-' + r() + '_' + r() + '-' + r() + '_' + r() + r() + r();
}

function onCSSTransitionEnd(node, callback) {
  var runOnce = function runOnce(e) {
    e.stopPropagation();
    callback && callback(e);
    _ReactTransitionEvents2.default.removeEndEventListener(node, runOnce);
  };
  _ReactTransitionEvents2.default.addEndEventListener(node, runOnce);
}

function isString(obj) {
  if (typeof obj == 'string') {
    return true;
  }
  return false;
}