'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeByType = exports.hideConfirm = exports.showConfirm = exports.remove = exports.clean = undefined;
exports.add = add;

var _constants = require('./constants');

var _utils = require('./utils');

var _reducer = require('./reducer');

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function add(toastr) {
  if (_config2.default.preventDuplicates && (0, _utils.preventDuplication)(_reducer.toastrsCache, toastr)) {
    return {
      type: _constants.ADD_TOASTR,
      payload: {
        ignoreToastr: true
      }
    };
  }
  return {
    type: _constants.ADD_TOASTR,
    payload: toastr
  };
}

var clean = exports.clean = function clean() {
  return { type: _constants.CLEAN_TOASTR };
};

var remove = exports.remove = function remove(payload) {
  return {
    type: _constants.REMOVE_TOASTR,
    payload: payload
  };
};

var showConfirm = exports.showConfirm = function showConfirm(payload) {
  return {
    type: _constants.SHOW_CONFIRM,
    payload: payload
  };
};

var hideConfirm = exports.hideConfirm = function hideConfirm() {
  return { type: _constants.HIDE_CONFIRM };
};

var removeByType = exports.removeByType = function removeByType(payload) {
  return {
    type: _constants.REMOVE_BY_TYPE,
    payload: payload
  };
};