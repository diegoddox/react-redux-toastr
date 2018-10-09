'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.toastrWarn = toastrWarn;
exports.createReducer = createReducer;
exports.isBrowser = isBrowser;
exports.keyCode = keyCode;
exports.mapToToastrMessage = mapToToastrMessage;
exports.guid = guid;
exports.onCSSTransitionEnd = onCSSTransitionEnd;
exports.preventDuplication = preventDuplication;
exports.updateConfig = updateConfig;
exports._bind = _bind;

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function whichAnimationEvent() {
  var t = void 0;
  var el = document.createElement('fakeelement');

  var transitions = {
    animation: 'animationend',
    oanimation: 'oanimationend',
    MSAnimation: 'MSAnimationEnd',
    webkitAnimation: 'webkitAnimationEnd'
  };

  for (t in transitions) {
    if (el.style[t] !== undefined) {
      return transitions[t];
    }
  }
}

function isString(obj) {
  if (typeof obj == 'string') {
    return true;
  }
  return false;
}

function toastrWarn(message) {
  if (process.env.NODE_ENV === 'production') {
    return null;
  }
  console.warn('[react-redux-toastr] ' + message);
}

function createReducer(initialState, fnMap) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var _ref = arguments[1];
    var type = _ref.type,
        payload = _ref.payload;

    var handle = fnMap[type];
    return handle ? handle(state, payload) : state;
  };
}

function isBrowser() {
  if (typeof window !== 'undefined') {
    return true;
  }
  return false;
}

function keyCode(e) {
  return e.which ? e.which : e.keyCode;
}

function mapToToastrMessage(type, array) {
  var obj = {};
  obj.type = type;
  obj.position = _config2.default.position;

  obj.options = array.filter(function (item) {
    return (typeof item === 'undefined' ? 'undefined' : _typeof(item)) == 'object';
  })[0] || {};

  if (obj.options.hasOwnProperty('position')) {
    obj.position = obj.options.position;
  }

  if (!obj.options.hasOwnProperty('removeOnHover')) {
    obj.options.removeOnHover = true;
    if (type === 'message') {
      obj.options.removeOnHover = false;
    }
  }

  if (!obj.options.hasOwnProperty('showCloseButton')) {
    obj.options.showCloseButton = true;
  }

  if (type === 'message' && !obj.options.hasOwnProperty('timeOut')) {
    obj.options.timeOut = 0;
  }

  if (isString(array[0]) && isString(array[1])) {
    obj.title = array[0];
    obj.message = array[1];
  } else if (isString(array[0]) && !isString(array[1])) {
    obj.title = array[0];
  } else {
    obj.message = array[0];
  }

  return obj;
}

function guid() {
  var r = function r() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  };
  return r() + r() + r() + '-' + r() + '_' + r() + '-' + r() + '_' + r() + r() + r();
}

function onCSSTransitionEnd(node, callback) {
  if (!node) {
    return;
  }
  // if css animation is failed - dispatch event manually
  var animationEnd = whichAnimationEvent();
  var timeoutId = setTimeout(function () {
    var e = new Event(animationEnd);
    toastrWarn('The toastr box was closed automatically, please check \'transitionOut\' prop value');
    node.dispatchEvent(e);
  }, _config2.default.maxAnimationDelay);

  var runOnce = function runOnce(e) {
    clearTimeout(timeoutId);
    // stopPropagation is not working in IE11 and Edge, the transitionend from the Button.js is waiting
    // on the confirm animation to end first and not the Button.js
    e.stopPropagation();
    node.removeEventListener(animationEnd, runOnce);
    callback && callback(e);
  };
  node.addEventListener(animationEnd, runOnce);
}

function preventDuplication(currentData, newObjec) {
  var hasDuplication = false;
  currentData.forEach(function (item) {
    // If the toastr options implicitly specify not to prevent duplicates then skip
    if (item.options.preventDuplicates === false) return;
    // Because the toastr has a unic id we will check by the title and message.
    if (item.title === newObjec.title && item.message === newObjec.message && item.type === newObjec.type) {
      hasDuplication = true;
    }
  });
  return hasDuplication;
}

function updateConfig(obj) {
  Object.keys(_config2.default).forEach(function (key) {
    if (obj.hasOwnProperty(key)) {
      _config2.default[key] = obj[key];
    }
  });
}

function _bind(strinOrAray, scope) {
  var array = strinOrAray;
  if (!Array.isArray(strinOrAray)) {
    array = strinOrAray.split(' ');
  }
  return array.map(function (item) {
    return scope[item] = scope[item].bind(scope);
  });
}