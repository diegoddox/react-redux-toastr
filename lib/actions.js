'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.addToastrAction = addToastrAction;
exports.clean = clean;
exports.remove = remove;
exports.success = success;
exports.info = info;
exports.warning = warning;
exports.error = error;
exports.showConfirm = showConfirm;
exports.hideConfirm = hideConfirm;

var _constants = require('./constants');

var _utils = require('./utils');

function addToastrAction(toastr) {
  return {
    type: _constants.ADD_TOASTR,
    payload: toastr
  };
}

function clean() {
  return {
    type: _constants.CLEAN_TOASTR
  };
}

function remove(id) {
  return {
    type: _constants.REMOVE_TOASTR,
    payload: {
      id: id
    }
  };
}

// In case the user wanna bind the actions
// we need to use the func 'mapToToastrMessage' here as well.
function success() {
  for (var _len = arguments.length, toastr = Array(_len), _key = 0; _key < _len; _key++) {
    toastr[_key] = arguments[_key];
  }

  return {
    type: _constants.ADD_TOASTR,
    payload: (0, _utils.mapToToastrMessage)('success', toastr)
  };
}

function info() {
  for (var _len2 = arguments.length, toastr = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    toastr[_key2] = arguments[_key2];
  }

  return {
    type: _constants.ADD_TOASTR,
    payload: (0, _utils.mapToToastrMessage)('info', toastr)
  };
}

function warning() {
  for (var _len3 = arguments.length, toastr = Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
    toastr[_key3] = arguments[_key3];
  }

  return {
    type: _constants.ADD_TOASTR,
    payload: (0, _utils.mapToToastrMessage)('warning', toastr)
  };
}

function error() {
  for (var _len4 = arguments.length, toastr = Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
    toastr[_key4] = arguments[_key4];
  }

  return {
    type: _constants.ADD_TOASTR,
    payload: (0, _utils.mapToToastrMessage)('error', toastr)
  };
}

function showConfirm(obj) {
  return {
    type: _constants.SHOW_CONFIRM,
    payload: obj
  };
}

function hideConfirm() {
  return {
    type: _constants.HIDE_CONFIRM
  };
}